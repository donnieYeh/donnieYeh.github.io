---
title:  经验
date: 2021-11-24 09:54
tags:
categories:
---
### 图片加载不出
- asset文件名不能有空格
- marked渲染器的appendRoot，是指给asset地址插入 root 值

### 批量修改文件名
rename 命令
```shell
rename oldstr newstr files
rename 's/oldstr/newstr/' files
```

### 替换文件内容
```shell
sed -i "s/原字符串/新字符串/g" `grep 原字符串 -rl 所在目录`
sed -选项 "行,行 动作命令 动作命令参数 显示命令(p)" 文件
```

> invalid reference \1 on \`s' command's RHS 错误：
> -n 和 -i 不能同时使用，要么打印，要么修改

#### 优秀实践
```shell
# 先通过grep找到想要的内容
$ grep "\!\[" *
> Graphviz.md:![[Pasted_image_20201218173054.png]]

# 使用sed -n 模式看下替换效果（-r表示使用正则）
# 先写个伪代码
$ sed -nr "s|![[.*?]]|test|gp" *

# 给特殊字符转义
$ sed -nr "s|\!\[\[.*?\]\]|test|gp" *
> test

# 获取关键属性
$ sed -nr "s|\!\[\[(.*?)\]\]|\1|gp" *
> Pasted_image_20201218173054.png

# 补全新串
$ sed -nr "s|\!\[\[(.*?)\]\]|\!\[\]\(\/images\/\1\)|gp" *
> ![](/images/Pasted_image_20201218173054.png)

# 改为 sed -i 替换模式（注意-i -r 要分开）
$ sed -i -r "s|\!\[\[(.*?)\]\]|\!\[\]\(\/images\/\1\)|g" *
```

### 什么是Permalink
Permalink是指部署网站时文章的url路径的展示方式。

### 好用的插件
- pangu：盘古空白，可以自动给中英文间插入空白

### 主题渲染原理
![[Pasted image 20211124145841.png]]


### 模板引擎
模板引擎分为两部分：语言，渲染器

常见语言有：
- jade，因为商标问题已经更名为pug，例：beautiful-hexo主题
- swig，例next主题

通过对应的渲染器（hexo-renderer-xxx）可以渲染成完整的html

#### 语法概要
模板引擎语法通常有以下几种操作组合而成，**本质上就是堆积木！**：
- extends：扩展
- include：引入
- block：类似于抽象方法，子孙可以覆写具体实现（模板方法模式）

>由于 `layout.pug` 只用于被其他页面继承，并不会单独渲染成页面，因此，可以将文件名改为 `_layout.pug`（以下划线开头）这样 Hexo 就不会解析这个文件，可以提高 Hexo 生成页面的速度。

##### pug 语法概要
- 子模块用缩进表示
- `header.someClass`表示`header`标签带`class=someClass`
- `.someClass`单独出现表示默认使用`div`标签
