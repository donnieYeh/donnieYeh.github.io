---
title:  disruptor学习记录
date: 2021-11-26 19:59:13
tags:
---
## 术语概念
[参考地址](https://github.com/LMAX-Exchange/disruptor/wiki/Introduction#core-concepts)

RingBuffer——Disruptor底层数据结构实现，核心类，是线程间交换数据的中转地；

Sequencer——序号管理器，生产同步的实现者，负责消费者/生产者各自序号、序号栅栏的管理和协调,Sequencer有单生产者,多生产者两种不同的模式,里面实现了各种同步的算法；

Sequence——序号，声明一个序号，用于跟踪ringbuffer中任务的变化和消费者的消费情况，disruptor里面大部分的并发代码都是通过对Sequence的值同步修改实现的,而非锁,这是disruptor高性能的一个主要原因；

SequenceBarrier——序号栅栏，管理和协调生产者的游标序号和各个消费者的序号，确保生产者不会覆盖消费者未来得及处理的消息，确保存在依赖的消费者之间能够按照正确的顺序处理

EventProcessor——事件处理器，监听RingBuffer的事件，并消费可用事件，从RingBuffer读取的事件会交由实际的生产者实现类来消费；它会一直侦听下一个可用的序号，直到该序号对应的事件已经准备好。

EventHandler——业务处理器，是实际消费者的接口，完成具体的业务逻辑实现，第三方实现该接口；代表着消费者。

Producer——生产者接口，第三方线程充当该角色，producer向RingBuffer写入事件。

Wait Strategy：Wait Strategy决定了一个消费者怎么等待生产者将事件（Event）放入Disruptor中。
## 基本用法
```java
public class MsgEventMain {  
    public static void main(String[] args) throws InterruptedException {  
        Disruptor disruptor = new Disruptor(new MsgEventFactory(), 1024, Executors.defaultThreadFactory()  
                , ProducerType.SINGLE, new BlockingWaitStrategy());  // ①
        disruptor.handleEventsWith(new MsgEventHandler());  //②
        disruptor.start();  //③
        RingBuffer ringBuffer = disruptor.getRingBuffer();  //④
        for (int i = 0; i < 10; i++) {  
            int finalI = i;  
            EventTranslator<MsgEvent> eventTranslator = (event, sequence) -> {  
                event.setMsg("business msg:" + finalI);  
            };  
            ringBuffer.publishEvent(eventTranslator);  //⑤
            Thread.sleep(300);  
        }  
        disruptor.shutdown();  
    }  
}
```

核心分为五步：
1. 创建一个disruptor
>（构造涉及 1. Event工厂；	2. 线程工厂;	3. 生产策略：多线程、单线程	4. 消费等待策略）
3. 指定消费者
4. 启动disruptor
5. 从disruptor中获取 ringbuffer
6. 生产者调用 `ringBuffer.publishEvent` 发消息
> 此处需要一个eventTranslator，来填充消息内容）

### 官方实践
1. 每个productor维护自己的 translator 的静态实例作为成员变量，且注入ringBuffer，用于生产消息


### 可调优项
核心5步可以覆盖大多数生产场景使用，但是有些可调参数可以用于促进性能，分别是
1. 生产策略：多线程、单线程
2. 消费等待策略

#### 等待策略
**「BlockingWaitStrategy」**

Disruptor的默认策略是BlockingWaitStrategy。在BlockingWaitStrategy内部是使用锁和condition来控制线程的唤醒。BlockingWaitStrategy是最低效的策略，但其对CPU的消耗最小并且在各种不同部署环境中能提供更加一致的性能表现。

**「SleepingWaitStrategy」**

SleepingWaitStrategy 的性能表现跟 BlockingWaitStrategy 差不多，对 CPU 的消耗也类似，但其对生产者线程的影响最小，通过使用`LockSupport.parkNanos(1)`来实现循环等待。

**「YieldingWaitStrategy」**

YieldingWaitStrategy是可以使用在低延迟系统的策略之一。YieldingWaitStrategy将自旋以等待序列增加到适当的值。在循环体内，将调用`Thread.yield()`以允许其他排队的线程运行。在要求极高性能且事件处理线数小于 CPU 逻辑核心数的场景中，推荐使用此策略；例如，CPU开启超线程的特性。

**「BusySpinWaitStrategy」**

性能最好，适合用于低延迟的系统。在要求极高性能且事件处理线程数小于CPU逻辑核心数的场景中，推荐使用此策略；例如，CPU开启超线程的特性。

**「PhasedBackoffWaitStrategy」**

自旋 + yield + 自定义策略，CPU资源紧缺，吞吐量和延迟并不重要的场景。





