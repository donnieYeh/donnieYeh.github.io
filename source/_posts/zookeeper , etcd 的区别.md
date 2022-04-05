---
title: zookeeper / etcd 的区别
date: 2022-04-05 21:30:00
tags: 
- zookeeper
- etcd
category: 工具调研
---
# zookeeper / etcd 的区别

etcd，分布式一致性键值存储引擎，专门为分布式系统提供服务。它基于Raft共识算法，使用GOlang开发（这点很重要），由[CoreOS](https://zh.wikipedia.org/wiki/CoreOS "CoreOS")开发。在github release上可以跟踪到最早发布在2013年8月12号，最近更新是在3天前，可以说是相当活跃了。

zookeeper，官方介绍是一个高可靠分布式**协调**服务。它提供配置维护、命名、分布式同步、分组服务（group services）等等功能。它起源于雅虎研究院的一个研究小组，后来成为hadoop的子项目，主要**为Hadoop生态系统中一些列组件提供统一的分布式协作服务**，再后来在（Hadoop 1.0时代）**2011年1月**， ZooKeeper 脱离Hadoop，成为Apache顶级项目，并成为开源项目，一直发展至今。它在官网上可找到最早的发布版本是2008年10月27好，github上最近的提交是4天前，且仅有少量提交，活跃对相对etcd较低。它基于基于 ZAB （Zookeeper Atomic Broadcast）协议实现，由java语言编写。

|-|语言|能力|社区活跃度|其他|
|-|-|-|-|-|
|zookeeper|java|配置维护、命名、分布式同步、分组服务|良|老牌分布式同步工具，kafka、dubbo、hadoop等都在用|
|etcd|GO|分布式键值存储、共享配置、服务发现|优|因支撑k8s而火|


## Raft consensus algorithm
参考大神的动画： http://thesecretlivesofdata.com/raft/

raft其实是一个协议（protocol）。在这个协议当中，参与通信的结点有三种状态，leader、follower、candidate。在协议当中，有两种超时类型（timeout），election timeout，heartbeat timeout。leader 以 heartbeat timeout 为周期同步信息，follower 收到消息立即响应。同时存在多个节点进行leader选举时，先得到半数响应的节点成为leader。leader通过两阶段（预设、提交）同步数据，并且会记录log。


## ZAB（Zookeeper Atomic Broadcast）协议
选举通常是选zxid，sid（myid）最大的。新选举完毕会产生新的纪元，epoch，老leader恢复后其他节点也不听他管，毕竟前朝的剑不能斩本朝的官。

---

Zookeeper的ZAB，Viewstamped Replication（VR），raft，multi-paxos，这些都可以被称之为Leader-based一致性协议。总的来说raft相对来说比较亲民好理解。

参考文章：
- [[zookeeper] 00 - 初识：由来、版本、架构_神是念着倒-CSDN博客_zookeeper发展历史](https://blog.csdn.net/weixin_38256474/article/details/90636262)
- [Zookeeper理解_老史的足迹-CSDN博客](https://blog.csdn.net/qq_22115231/article/details/80784535)
- [raft算法与paxos算法相比有什么优势，使用场景有什么差异？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/36648084)
- https://dzone.com/articles/apache-zookeeper-vs-etcd3


