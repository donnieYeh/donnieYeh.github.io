---
title:  hexo美化
date: 2021-11-26 19:59:13
tags:
---
## 基础知识
[从 0 到 1 开发 Hexo 主题杂谈 | Liuyib's Blog](https://liuyib.github.io/2019/08/20/develop-hexo-theme-from-0-to-1/)

## theme
个人喜好：
- next
- beautiful-hexo（源于 beautiful-jekyll）


## 设置背景图
参考：
[State pattern (ducmanhphan.github.io)](https://ducmanhphan.github.io/2020-01-15-State-pattern/)

### 1. 准备好无缝背景图
可以从喜欢的博客上扒，也可以google关键字：seamless icon

### 2. 修改主题css
通过chrome，定位到 /source/css/main.css
- 修改body、导航栏、footer，添加如下两行
```css
body {
 background-image: url(/bgimg/bgimage.png);
 background-attachment: fixed;
}

.navbar-custom {
 background-image: url(/bgimg/bgimage.png);
 background-attachment: fixed;
}

footer {
 background-image: url(/bgimg/bgimage.png);
 background-attachment: fixed;
}
```

- 修改注释样式，添加下面两行
```css
blockquote {
 background-color: rgba(255, 255, 255, 0.2);
 border-left-color: #cccccc;
}
```


## 添加搜索框
参考[为Hexo blog博客创建本地搜索引擎 | 花子凡 (hzfans.github.io)](https://hzfans.github.io/2018/01/03/2018-1-3%20%E4%B8%BAHexo%20blog%E5%8D%9A%E5%AE%A2%E5%88%9B%E5%BB%BA%E6%9C%AC%E5%9C%B0%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E/)

> 备用方案
[从 0 到 1 开发 Hexo 主题杂谈 | Liuyib's Blog](https://liuyib.github.io/2019/08/20/develop-hexo-theme-from-0-to-1/)

样式:
![[Pasted image 20211126102721.png]]

使用框架：[GitHub - Liam0205/hexo-search-plugin-snippets: 一些辅助 `hexo-generator-search` 插件的代码片段，博客右上角看效果 ---->](https://github.com/Liam0205/hexo-search-plugin-snippets)

引入步骤（只关注定制化的部分）：
1. 做些基本的配置，引入搜索hexo的搜索引擎插件——产物：search.html
2. 拷贝search.js文件到主题下的js目录中


### hexo-renderer-stylus的用法


### .swig文件的用法



## 设置字体

## 个性化404页面

## 文章页面副标题显示发布日期

## 代码高亮

## 添加鼠标皮肤、特效

## 添加二次元挂件

## 添加滚动条皮肤
[Hexo系列（二）：修改hexo主题 | cv-programmer](https://cv-programmer.github.io/2021/03/15/Hexo%E7%B3%BB%E5%88%97%EF%BC%88%E4%BA%8C%EF%BC%89%EF%BC%9A%E4%BF%AE%E6%94%B9hexo%E4%B8%BB%E9%A2%98/)

## 添加访问日志数据统计

## 添加标签云

## 添加大纲
参考[从 0 到 1 开发 Hexo 主题杂谈 | Liuyib's Blog](https://liuyib.github.io/2019/08/20/develop-hexo-theme-from-0-to-1/)

## 添加文章字数、阅读时长等属性

## 离开页面展示个性标题
[为Hexo blog博客创建本地搜索引擎 | 花子凡 (hzfans.github.io)](https://hzfans.github.io/2018/01/03/2018-1-3%20%E4%B8%BAHexo%20blog%E5%8D%9A%E5%AE%A2%E5%88%9B%E5%BB%BA%E6%9C%AC%E5%9C%B0%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E/)

## 添加小火箭



# themes/_config.yml设置

## 设置banner图

```
header:
    title: "Xr's Blog"
    motto: Build a beautiful and simple website in minutes
    bigimgs:
      - src: /bigimgs/04.jpg
        desc: fukei
      - src: /bigimgs/05.jpg
        desc: fukei
      - src: /bigimgs/06.jpg
        desc: fukei
```

## 一些图标
```
avatar: /avatar.jfif
favicon: /avatar.jfif
```
