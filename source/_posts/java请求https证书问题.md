
---
title:  java请求https证书问题，`unable to find valid certification path to requested target`
date: 2022-08-25 00:03
tags:
- https
- 证书
---

# 背景
使用okHttp请求某https服务（[https://api.github.com](https://api.github.com/)），然而却报证书相关的错误：`unable to find valid certification path to requested target`，问题是如果直接用浏览器访问该地址，却是安全的。

# 疑惑
在未跟进源码之前，个人理解JAVA默认使用的是系统自带的CA证书，那么浏览器访问该HTTPS没问题，说明该服务是能够被系统内置的CA证书认证的，按理说JAVA访问也应该没问题才对。重点就在于为什么JAVA的和浏览器的表现不一致。

搜索引擎出来的全部都是教你如何绕过安全校验、信任所有HTTPS网站，这固然能临时解决问题，但根本就是因噎废食，这种解决是建立在牺牲安全性之上的！

# 原因分析
断点跟进源码，发现okhttp底层使用的是JDK原生工具库`sun.security.ssl`。再跟了几层，发现ssl库使用的信任证书库是指定路径下的`..\jdk1.8.0_292\jre\lib\security\cacerts`文件。

> 读取配置代码：TrustStoreManager.TrustStoreDescriptor.createInstance()
> 信任库优先读取顺序：javax.net.ssl.trustStore（环境变量） > cacerts文件（默认）

通过`keytool`命令打印jdk的信任证书库。
```bash
keytool -list -keystore cacerts -rfc
```

再在浏览器下载验证通过的根证书，存为base64格式。

对比二者，发现jdk的信任证书库并不包含该根证书。可见jdk的信任证书库与系统证书库不一致，导致了上文提到的表现上的差异。

# 解决
cd到`\jre\lib\security`目录下，然后导入缺少的那个根证书
```bash
# 注意查看的时候不要求口令，但是修改的时候是要求口令的，而默认的口令就是 changeit
keytool -importcert -file target.cer -keystore cacerts -storepass changeit -storetype jks
```

然后再重新跑一遍程序，很好，能正常请求https获取响应了

相关关键词：
- unable to find valid certification path to requested target