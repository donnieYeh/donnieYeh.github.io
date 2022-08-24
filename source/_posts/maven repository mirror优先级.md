
---
title:  maven repository mirror优先级
date: 2022-08-25 00:03
tags:
- maven
---

- 依赖的下载只会从repository中挑选仓库下载
-   挑选仓库的顺序是从上到下
-   如果下载依赖过程中出现问题（比如https证书校验失败），则会报错最上面第一个仓库找不到依赖
-   mirror只会改变仓库地址的映射，不会影响加载顺序，通过 mirrorOf 与 repository的Id 绑定
-   中心仓在超级pom中有配置，默认id=central，由于加载太慢，可以覆写中心仓的地址
-   中心仓放在最后兜底查询
-   mirror的mirrorOf * 配置，可以充当repository，作为终极兜底
-   实践理解： mvn clean compile -X