---
title:  java探针技术
date: 2021-11-26 19:59:13
tags:
---
### vm参数
+ -javaagent:<pathname>[=<选项>]  
	加载本机代理库 <libname>, 例如 -agentlib:hprof
	
+ -agentlib:<libname>[=<选项>]  
	按完整路径名加载本机代理库
	
+ -agentpath:<pathname>[=<选项>]  
	加载 Java 编程语言代理, 请参阅 java.lang.instrument

### 相关基础包
 java.lang.instrument
	

### 参考链接
- https://www.cnblogs.com/CLAYJJ/p/7992064.html
