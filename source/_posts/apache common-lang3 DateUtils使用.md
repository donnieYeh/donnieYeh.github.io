---
title: apache common-lang3 DateUtils使用
date: 2022-04-05 21:17:00
tags:
- apache
- 使用手册
category: apache生态
---

- isSameDay
- parseDate：传入多个模板，直到匹配其中一个就可以，若全不匹配则抛出异常
- addXXX
- setXXX
- toCalendar(date)
- round：其注释描述的[夏时制](https://zh.wikipedia.org/wiki/%E5%A4%8F%E6%97%B6%E5%88%B6)（daylight time），只针对特定timezone的国家，对我们没影响
- truncate：裁剪尾部
- ceiling：跟truncate一样，但是会向上对齐
- getFragmentInXXX：裁剪头部，跟truncate相反
- truncatedEquals：两日期裁剪后对比，可以达到和isSameDay一样的效果
- truncatedCompareTo：两日期裁剪后对比