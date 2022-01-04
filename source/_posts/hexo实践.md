---
title:  hexo实践
categories:
- 效率人生
- 自建博客
tags: 
- hexo
- 工具
date: 2021-11-17 15:03:49
---


# scaffolds（模板）
可以在 根目录/scaffolds/ 下，创建一些文章模板，让新建文章变得更加高效。在该目录下，已经存在了一些现成的模板：draft.md、page.md、post.md，这些都是可以拿来做参考的。

## 使用模板
就跟使用其他layout一样，比如我现在已经在scaffolds下，创建了一个photo.md模板，则可以通过以下命令来基于该模板创建文章：
```
$ hexo new photo <title>
```

# 发布文章
把草稿发布到post下
```
$ hexo publish draft <title>
```

## 预览发布
若不想直接发布草稿，想要先预览一下效果，有两种方式：
1. 临时性：跑 ``hexo server``时带上``--draft``
2. 永久性：修改 ``_config.yml`` 文件，开启``render_drafts``

# 文章头部
文章头部提供以下几种属性：

Setting	|Description	|Default
-|-|-
layout	|Layout	
title	|Title	
date	|Published date	|File created date
updated	|Updated date	|File updated date
comments|	Enables comment feature for the post|	true
tags	|Tags (Not available for pages)	
categories|	Categories (Not available for pages)	
permalink|	Overrides the default permalink of the post	

## tags 与 categories 的区别
一篇文章中的多个tags，它们都是同一层级的，没有优先度之分 
而categories是带层级的，当设置了多个categories时，它表现出嵌套层级


值得一提的是一篇文章也可以指定同层级的categories，如下：

- 嵌套层级：
```
categories:
- sport
- football
```

- 平行层级：
```
categories:
- [sport]
- [games]
```

- 平行多层嵌套：
```
categories:
- [sport, football]
- [games, souls like]
```

# 读取数据文件
hexo提供了一个特性，可以读取 `source/_data`目录下的`yaml`或`json`文件。

比如，现在在`_data`目录下创建一个`menu.yml`数据文件，内容如下：
```
Home: /
Gallery: /gallery/
Archives: /archives/
```

里面有3个键值对，此时，我们可以通过以下(类似jsp)语法，遍历该数据文件的所有键值对。
```
<% for (var link in site.data.menu) { %>
  <a href="<%= site.data.menu[link] %>"> <%= link %> </a>
<% } %>
```

该代码写在模板里才生效，最终的效果如下：
```
<a href="/"> Home </a>
<a href="/gallery/"> Gallery </a>
<a href="/archives/"> Archives </a>
```


# 常见问题
## 语言配置不生效
语言配置位于站点配置文件的 language 一栏，若配置language = zh-Hans不生效，以next主题为例，观察 themes/next/language 下是否存在 zh-Hans.yml 文件，而我这边的目录下存在 zh-CN.yml，则要不修改 language = zh-CN，要不就修改其文件名为 zh-Hans.yml



