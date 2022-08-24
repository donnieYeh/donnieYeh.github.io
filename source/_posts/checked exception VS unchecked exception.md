---
title:  checked exception VS unchecked exception
date: 2022-08-24 23:57
tags:
- java
---

checked exception 即你在方法里某个逻辑抛出了这个异常，且在方法签名显式声明会抛出这个异常。
unchecked exception 即你在方法里某个逻辑抛出了这个异常，但是不会在方法签名显式声明抛出这个异常。

一个是抛了且要求调用层处理，一个是只抛不强制要求调用层处理。

其中一种声音是，是否声明checked异常取决于你判断caller是否关心这个异常。
>This is the philosophy used by many frameworks. Spring and hibernate, in particularly, come to mind - they convert known checked exception to unchecked exception precisely because checked exceptions are overused in Java. One example that I can think of is the JSONException from json.org, which is a checked exception and is mostly annoying - it should be unchecked, but the developer simply haven't thought it through.


异常可以从以下维度去理解，1、是否可预见的，2、是否可预防的，3、是否可恢复的（通过兜底、降级等手段）。针对以上维度，我们可以整理出如下的对策

- 不可预见的：我们没有任何手段去阻止，通常只能尝试（try）去监测（catch），然后打印下日志，等待开发来修改BUG代码
- 可预见的
	- 可预防的：直接就在代码里预判且处理妥当了，比如常见的`StringUtils.isEmpty()`
	- 不可预防的：
		- 可恢复的：不可预防可以理解为，我们知道这事可能发生，但是我们没法阻止异常的发生，比如在"检查文件是否存在"和"读取文件内容"两个操作之间，文件被人删除了。这种异常我们无法通过写代码来阻止另外一个用户把文件删除，但是也不能置之不理，所以此时就要在方法签名中明确声明一个异常，调用层被迫要对该异常进行处理，可以是兜底、降级，当然调用层可以继续往外抛。
		- 不可恢复的：如果预见一个不可预防的异常，且无法通过兜底、降级的手段解决，则提前声明checked exception也没意义，此时可采取的手段就跟“不可预见”异常一样了。

以一个表格来进行小结：

可预见|可预防|可恢复|所属异常类型|可采取手段
-|-|-|-|-
×|-|-|uncheck exception|try catch
√|√|-|not exception|代码规避
√|×|×|uncheck exception|try catch
√|×|√|checked exception|方法签名声明异常+调用方try catch

> Compiler will check that we have done one of the two things (catch, or declare). So these are called Checked exceptions.

> 当在方法签名显式声明了throws Exception，编译器会检查（check）调用者需要执行这两个动作之一：1、进行catch  2、“继续声明throws Exception 往外抛”，否则过不了编译，所以这种异常叫做checked exception

Checked Exceptions 应该用于可以合理恢复的可预测但不可预防的错误。



就像工作一样，处理Exception，理清责任很重要，如果一个checked exception由当前方法处理不当导致，则当前方法需要catch并做兜底处理，至少得打日志；反之如果判断它是由上层参数导致，则把异常外抛给调用层，而不是自己揽过来处理。



参考文章：
- [Checked vs Unchecked Exceptions in Java - GeeksforGeeks (googleusercontent.com)](https://webcache.googleusercontent.com/search?q=cache:zKMFajzvoiQJ:https://www.geeksforgeeks.org/checked-vs-unchecked-exceptions-in-java/+&cd=4&hl=zh-CN&ct=clnk)
- [java - When to choose checked and unchecked exceptions - Stack Overflow](https://stackoverflow.com/questions/27578/when-to-choose-checked-and-unchecked-exceptions)