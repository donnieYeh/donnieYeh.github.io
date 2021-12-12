---
title:  linux系统目录层级标准——/bin、/usr/bin、/usr/local/bin、/opt的区别
date: 2021-11-26 19:59:13
tags:
---
## /bin VS /usr/bin/ VS /usr/local/bin VS /opt
### 当前标准
wiki上搜索 FileSystem hierarchy standard，有对这些目录用途的一个官方标准的解析，但是对于 /usr/local 的解析，依然是模棱两可，所以要完全了解它们的本质，还是得纵观一下发展历史。


### 历史趣闻
[Understanding the bin, sbin, usr/bin , usr/sbin split (busybox.net)](http://lists.busybox.net/pipermail/busybox/2010-December/074114.html)

据**Rob Landley**这位老哥的说法，/bin 和 /usr/bin 的分裂，属于历史产物，本质上没有区别。


参考**Rob Landley**的说法，再结合社区的讨论《[What is the difference between /opt and /usr/local?](https://unix.stackexchange.com/questions/11544/what-is-the-difference-between-opt-and-usr-local)》，可知，/usr/local 源于BSD，要不就是用于编译自己编写的源码，或者用于存放第三方包源码（未安装），其构建结果就放在 /usr/local/bin 。一些人认为已打包好的第三方binary包不适合放在 /usr/local ，于是 /opt 出现了。

> Rob Landley：
> and 
/usr/local was for your specific installation's files.  Then somebody decided
/usr/local wasn't a good place to install new packages, so let's add /opt!  
I'm still waiting for /opt/local to show up...

> 《What is the difference between /opt and /usr/local?》：
> `/usr/local` is a place to install files built by the administrator
> `/usr/local` is a legacy from the original BSD.


这一篇讨论 [Role of the /usr/local directory in FreeBSD](https://unix.stackexchange.com/questions/332764/role-of-the-usr-local-directory-in-freebsd) 可以进一步了解BSD的 /usr/local

### usr的含义
有两种说法
1. unix system resource
2. user 的缩写

根据上面的文章，[还有推特的讨论](https://twitter.com/linuxtoy/status/1228572721597964288)，个人更倾向于 usr 就是user的缩写。



