---
title:  guice
date: 2021-11-26 19:59:13
tags:
---


## 核心
主要由 `key` 和 `provider` 来构成容器，所以容器本质上是个map

##  使用方式
分两个步骤
1. 配置
2. 注入

### 配置
有两种方式
1. 注解
2. 用DSL（Domain specify language）

一个Module就是一个配置单元，bean的配置都在module里完成，类比Spring的@Configuration类

#### 注解
`@Provides`，用法如下：
```java
class DemoModule extends AbstractModule {
  @Provides
  @Count
  static Integer provideCount() {
    return 3;
  }

  @Provides
  @Message
  static String provideMessage() {
    return "hello world";
  }
}
```


#### DSL
Guice DSL syntax	| Mental model 
- |  - 
bind(key).toInstance(value) |	map.put(key, () -> value)(instance binding) 
bind(key).toProvider(provider) |	map.put(key, provider)(provider binding)
bind(key).to(anotherKey) |	map.put(key, map.get(anotherKey))(linked binding)
@Provides Foo provideFoo() {...} |	map.put(Key.get(Foo.class), module::provideFoo)(provider method binding)


### 注入

`@Inject`，用在构造方法、set方法、成员变量，可以对参数进行注入

示例1
```java
class Foo {
  private Database database;

  @Inject
  Foo(Database database) {  // We need a database, from somewhere
    this.database = database;
  }
}

```


### 整合
```java
public final class MyWebServer {
  public void start() {
    ...
  }

  public static void main(String[] args) {
    // Creates an injector that has all the necessary dependencies needed to
    // build a functional server.
    Injector injector = Guice.createInjector(
        new RequestLoggingModule(),
        new RequestHandlerModule(),
        new AuthenticationModule(),
        new DatabaseModule(),
        ...);
    // Bootstrap the application by creating an instance of the server then
    // start the server to handle incoming requests.
    injector.getInstance(MyWebServer.class)
        .start();
  }
}
```


## Multibindings
Multibindings属于绑定模式里的一种，适用于插件架构。说白了就是把多个同类型的bean注入到一个列表中。

### 使用
1. 通过 `Multibinder.newSetBinder` 生成一个指定接口类型的binder
2. 调用1里生成的 `binder.addBinding()` 来追加插件（不是覆盖）

```java
public class FlickrPluginModule extends AbstractModule {
  public void configure() {
    Multibinder<UriSummarizer> uriBinder = Multibinder.newSetBinder(binder(), UriSummarizer.class);
    uriBinder.addBinding().to(FlickrPhotoSummarizer.class);

    ... // bind plugin dependencies, such as our Flickr API key
  }
}

```
