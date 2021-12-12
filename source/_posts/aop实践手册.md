---
title:  aop实践手册
date: 2021-11-26 19:59:13
tags:
---
### aspect语法
#### call和execution的区别
结合这篇[java - Difference between call and execution pointcuts in PHP? - Stack Overflow](https://stackoverflow.com/questions/28251596/difference-between-call-and-execution-pointcuts-in-php/28252742#28252742)食用
![](/images/Pasted%20image%2020210820103450.png)

重点：But wait a minute, it still makes a difference: `execution` is just woven in one place while `call` it woven into potentially many places, so the amount of code generated is smaller for `execution`.



搞清楚 @target、@withIn 的区别
参考[»Spring 之AOP AspectJ切入点语法详解（最全了，不需要再去其他地找了）_jinnianshilongnian的专栏-CSDN博客](https://blog.csdn.net/jinnianshilongnian/article/details/84156354?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control)


#### 语法表
execution(annotation scope return package.Class.method( params ) )

- 可省略：annotation、scope
- 任意 return、包、方法：*
- 任意参数：（..）
- 任意多个包：..
