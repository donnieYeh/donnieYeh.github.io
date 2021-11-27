---
title:  visual studio 2019
date: 2021-11-26 19:59:13
tags:
---
简介
c、c++([[cpp]])以及.net框架(c#、vb等)的通用开发ide

经验整理

找不到 Windows SDK 
在项目上右击选择重定目标解决方案，将windosSdk的版本号选择成合适的

为何c#不需要include头文件
c#中用using namespace完成了java中import packages的能力。前提是项目引用中需要指定了相应的dll，然后using就可以了。

MSB8040	此项目需要缓解了 Spectre 漏洞的库。
打开安装器，选择**修改** ->  **单个组件**，搜索MSVC查看版本（如：v14.28），然后安装相应的MSVC缓解库

E1696	cannot open source file
删掉依赖包重新nuget下载

LINK : fatal error LNK1104: cannot open file 'atls.lib' 问题
安装atl、mfc缓解库

powershell 执行 ps脚本，报 PSSecurityException
解除文件锁定，``Get-ChildItem -r|Unblock-File``

c++项目没有设置output directory
一般是通过以下配置设置了：
``<Import Project="$(VCTargetsPath)\Microsoft.cpp.Default.props" />``

/obj 是什么文件夹
c++的中间产物存放处


