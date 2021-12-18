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

### 样式
![](/images/Pasted%20image%2020211127182011.png)

### 使用框架
[GitHub - Liam0205/hexo-search-plugin-snippets: 一些辅助 `hexo-generator-search` 插件的代码片段，博客右上角看效果 ---->](https://github.com/Liam0205/hexo-search-plugin-snippets)

> 注意：和next主题用的插件`hexo-generator-searchdb` 有一定的差别

### 引入步骤（只关注定制化的部分）
1. 做些基本的配置，主工程引入`hexo-generator-search`插件——产物：search.xml。并按照[插件文档](https://github.com/wzpan/hexo-generator-search)进行一定配置
2. 拷贝search.js文件到主题下的js目录中
3. 拷贝search.stylus样式文件到主题下的css目录中
	1. 其最后会转换成css文件，需要在main.css、main.js或者模板文件中引入
4. 在导航栏模板文件中，插入搜索组件代码，监听键盘输入事件，调用search.js的函数
5. 添加搜索icon，[icon商城](https://fontawesome.com/v4.7/)


### hexo-renderer-stylus的用法
stylus文件直接放到source目录及其任何子目录下，都能被解析。



## 设置字体
[字体商城](https://fonts.google.com/)挑选

英语正文：Roboto Slab


## 个性化404页面
参考：http://yelog.org/2017/02/25/hexo-create-404-page/
对于github page来说，只要在根目录又404.html，当页面找不到时，就会被转发到/404.html页面，所以我们只要更改这个页面，就可以实现自定义404页面了。

但是我们通常会需要与本主题相符的404页面。那我们就需要以下操作
### 新建404页面

1.  进入 Hexo 所在文件夹，输入 `hexo new page 404` ;
2.  打开刚新建的页面文件，默认在 Hexo 文件夹根目录下 /source/404/index.md；
3.  在顶部插入一行，写上 `permalink: /404`，这表示指定该页固定链接为 `http://"主页"/404.html`

		注意：该操作在本地启动看不到效果，需要在github page上才能看到效果。

```
---
title:
permalink: /404
date: 2021-11-28 05:45:59
---
# Whoops, this page doesn't exist.
# Move along. (404 error)
![](/images/404-southpark.jpg)
```

### 效果
 [https://xr08255920.github.io/举个例子](https://xr08255920.github.io/举个例子)

## 代码高亮
要使用好代码高亮，甚至想要自己定制化，就首先需要了解清楚Hexo进行代码高亮的原理。对一个.md文件的代码片段进行高亮，会经过如下的处理过程：

1. 将.md文件的代码片段渲染成html语言
2. 对html语言中的代码片段进行语法解析，给各个关键词标记上相应的样式class
3. 引入高亮样式CSS文件，使高亮样式生效

>  注意：3阶段的css样式要与2阶段标记的class相匹配
>  另：第2点语法解析用到的是highlight.js，一个代码高亮库，关于其介绍不是本章的重点，感兴趣的同学可以自行了解

而在hexo中，对于这3步有两种渲染模式：服务器渲染 和 客户端渲染
- 服务器渲染：由服务器执行步骤 1 和 2
![](/images/highlight_01.png)

- 客户端渲染：由客户端执行步骤 2 和 3
![](/images/highlight_02.png)

### 说在前头
必须注意的一点是，任何关于高亮的改动，都需要执行`hexo clean`后再渲染才能生效。
```shell
hexo clean && hexo server
```

### 客户端渲染
#### 一、在项目配置中关闭高亮选项
```yml _config.yml 
highlight:  
 enable: false  
prismjs:  
 enable: false
```

此时插件 [Tag Plugin - Backtick Code Block](https://hexo.io/docs/tag-plugins#Backtick-Code-Block)会将.md文件的代码块，渲染到`<code>`标签下：

````
```yaml  
hello: hexo  
```
将被编译成：
<pre>  
 <code class="yaml">hello: hexo</code>  
</pre>
````

#### 二、配置语法解析库
参考hexo内置的highlight模块文档，在页面中引入相应的js文件，并调用解析函数：

```html readme.md \blog\node_modules\highlight.js\README.md
<!-- 引入样式 -->
<link rel="stylesheet" href="/path/to/styles/default.css">
<!-- 引入js -->
<script src="/path/to/highlight.min.js"></script>
<!-- 调用解析函数 -->
<script>hljs.highlightAll();</script>
```

> 注意：这个解析函数，不同版本的highlight.js会不一样，需要查看相应版本的readme确认。

这样配置以后，就会在浏览器端执行解析函数解析`<code>`中的代码。并将结果替换掉旧的dom节点。

#### 三、配置语法高亮css
代码在第二步中已经给出，引入之后就会对新的dom节点进行样式渲染，最终得到语法高亮效果。

### 服务器渲染
#### 一、在项目配置中开启高亮选项
```yml _config.yml 
highlight:  
 enable: true  
 auto_detect: true  
 line_number: false  
 tab_replace: '  '  
 wrap: false  
 hljs: true  
prismjs:  
 enable: false
```

参数解释：
 - auto_detect： 
 
 		自动检测语言，就是你的代码块不指定语言，插件会帮你检测，如果代码量不多的话建议打开，耗不了多少资源 
 - line_number
 
 		是否展示行号
 - tab_replace
 
 		替换缩进符为指定字符串
 - wrap
 
 		当line_number=true时，比起原先只有展示代码的<code>容器，还额外增加了展示代码行数的<gutter>容器，此时就要指定wrap=true，生成一个<figure>容器来包裹<code>和<gutter>。该参数建议无脑与line_number同步就是了，要么都是ture，要么都是false
 - hljs

		给高亮样式的元素加上class前缀`hljs-`，建议配true，生成的html直接就能匹配css

#### 二、配置语法高亮css
通过上一步的操作，客户端获取到的html已经是解析完语法的代码段，是使用服务器hexo内置的highlight.js解析的，只需要再引入css即可观察效果，这个在[[#客户端渲染]]中已经提及，此处不再赘述。
> hexo内置的highlight.js库，通过package-lock.json可以知道它是来自于 hexo->hexo-util 库的依赖

由于最后都是通过highlight.js生成带有样式class的HTML代码块，所以想要有不同的样式效果，引入替换各种第三方highlight-css文件就行了。

highlight官方高亮样式主题地址：https://github.com/highlightjs/highlight.js/tree/main/src/styles
[预览](https://highlightjs.org/static/demo/)

### 拓展
通过上面的实践，我们已经对代码高亮的原理有了一个感性的理解了。此时我们甚至可以放弃hexo原生指定的代码高亮库highlight，自定义改造使用一些第三方的代码高亮库及颜色主题。比如[google-code-prettify](https://github.com/jmblog/color-themes-for-google-code-prettify)

#### 为什么样式只覆盖到代码行？
![](/images/Pasted%20image%2020211128195458.png)
这么难看，不能忍啊，经过一番研究得出结论,`<code>`标签需要设置样式：`display:block`，不然有可能被bootstrap的样式影响到了，就会变成这样。修复之后好看多了
![](/images/Pasted%20image%2020211128195644.png)


## 添加访问日志数据统计
参考：
Copyright © xxx's Blog 2021  
Theme by Hux | Ported by Kaijun | Modified by xxx  
本站访问量75368次 | 本站访客数46404人 | 本文阅读量2183次

使用[不蒜子](http://busuanzi.ibruce.info/)计数

### 参考文章
https://chrischen0405.github.io/2018/09/11/post20180911/
https://github.com/JoeyBling/busuanzi.pure.js

### 核心思路
1. 监听页面，当路由发生变化时，触发函数，浏览器通过jsonp方式请求计数服务器进行计数（参数是网页路径）。
2. 计数服务器返回计数，并由脚本渲染到对应的元素节点


### 步骤
1. 引入`不蒜子`官网的计数库
```js footer-script.jade
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```

2. 主题配置中添加展示开关配置
```yml _config.jekyll.yml
site_counter:
	show: true
```

3. 在copyright下面一行插入展示元素即可
```jade footer.jade
if theme.site_counter.show
	<span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
	span.meta-devider |
	<span id="busuanzi_container_site_uv">本站访客数<span id="busuanzi_value_site_uv"></span>次</span>
span.theme-by.text-muted.
	Theme base on
		#[a(href="https://github.com/twoyao/beautiful-hexo") beautiful-hexo]
```

4. 在文章首部插入`本页访问量`元素
```jade post-meta.jade
mixin post_meta(date, tags, showviews)
    p.post-meta Posted on #{full_date(date, "MMM D YYYY")}
      if showviews
        if theme.site_counter.show
          span.post-meta-group
            span#busuanzi_container_page_pv 
              span.with-love 
                  i.fa.fa-eye 
              span 阅读次数：
              span#busuanzi_value_page_pv
      if tags && tags.length > 0
        span.post-meta-group
          span.with-love 
            i.fa.fa-tag
          - tags.each(function(tag) {
              = ' · '
              a.tag.post-meta(href=url_for(tag.path))= tag.name
          - })
```

### 效果
文章首部
![](/images/Pasted%20image%2020211129230131.png)

文章底部
![](/images/Pasted%20image%2020211129230106.png)



## 添加鼠标皮肤、特效

## 添加看板娘
参考 
- github搜索：hexo live2d
- https://cjjkkk.github.io/next_live2d/ 使用↓
- https://github.com/EYHN/hexo-helper-live2d 中文文档↓
- https://github.com/EYHN/hexo-helper-live2d/blob/master/README.zh-CN.md 使用核心库↓
- https://github.com/xiazeyu/live2d-widget.js 关联模型库↓
- https://github.com/xiazeyu/live2d-widget-models 模型预览↓
- https://huaji8.top/post/live2d-plugin-2.0/ 
- 然而live2d-widget核心库的大佬已经弃坑，新的社区阵地出现↓
- https://github.com/stevenjoezhang/live2d-widget 关联模型库↓
- https://github.com/luanshizhimei/live2d_models_collect
- https://github.com/summerscar/live2dDemo.git
  
### 工具介绍

Live2D Widget 是一款网页看板娘部件。它提供了一套框架把 对话框、人物模型、对话脚本（自动触发、互动触发）整合在一起。框架已经预置了一套完善的对话脚本。使用该框架时我们可以自由的定制化：对话事件、对话脚本、文本框样式、人物模型等等。

> 要注意的一点是该框架本身并不提供人物模型，预置的人物模型数据是从第三方（/fghrsh/live2d_api）引入的，这意味着我们可以从任意第三方模型库引入人物模型。

### 前置要求
font-awesome需要引入4.0以上版本

### 引入一键傻瓜库
```html
<script src="https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></script>
```

### 订制一键傻瓜库
需要自行学习前置知识：
- [Git - Tagging (git-scm.com)](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- [Managing releases in a repository - GitHub Docs](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)

首先fork以下项目
https://github.com/stevenjoezhang/live2d-widget.git

修改autoload.js进行自定义化
可以通过以下两种方式引入客制化的库
1. 引入本地库
2. 引入线上库：然后把傻瓜库的CDN地址引导到自己的地址，`username`改成自己的即可，CDN会引导到自己 github 项目的最新tag
```html
<script src="https://cdn.jsdelivr.net/gh/username/live2d-widget@latest/autoload.js"></script>
```

### 核心实现
整个工具最核心的部分就是调用live2d库的接口，重点为第二个参数，无论我们收集到的模型放哪里都好，只要该参数能准确匹配模型位置，就能加载出来。
```js
loadlive2d("live2d", `模型路径/index.json`);
```
> 当然，对话脚本的订制也是看板娘的精髓所在。
> TODO 有时间出篇文章讲解如何订制对话脚本

### 如何预览第三方模型
1. 首先要找到第三方模型库，github上一大堆，此处以[summerscar/live2dDemo](https://github.com/summerscar/live2dDemo)提供的库为例。
2. 找到库里的人物模型目录，本例使用的是板鸭的模型`summerscar/live2dDemo/assets/Bronya/Bronya.model.json`
3. 此时就要神器 jsDelivr 上场了，把`https://cdn.jsdelivr.net/gh/`拼接上刚刚找的模型地址，得到了完整的[模型信息地址](https://cdn.jsdelivr.net/gh/summerscar/live2dDemo/assets/Bronya/Bronya.model.json)，可以点开看看是否能正常访问
4. 打开博客页的控制台，输入以下命令，即可实时查看效果了！
```js
loadlive2d("live2d", `https://cdn.jsdelivr.net/gh/summerscar/live2dDemo/assets/Bronya/Bronya.model.json`);
```

### 如何实时刷新jsdeliver CDN
CDN本质上是分布式缓存，所以同一个地址，即便你服务端的文件产生了变化，CDN还是会优先使用缓存。

这里主要针对github，在实践中发现`username/repository@latest`的方式无法拿到最新的资源。改为使用具体的tag即可，如`username/repository@v1.1`


### 批量调整画布大小
看板娘的实现是先定义一个canvas，并指定好内联宽高（也就是画布大小），然后进行绘制，最后再对canvas进行css渲染。所以如果初始化的canvas宽高和css的宽高比例不一致的话，就会导致画布绘制好之后，被css样式拉扯，导致人物比例失调。

写死指定默认的画布大小，并不能灵活适应所有模型。有些模型太大，画布放不完，有些模型又太小，人物描绘出来后悬空，还有模型大小不好控制等问题。

所以需要实现便捷调整看板娘画布信息，并存储到json文件中，提供框架加载人物画布大小，人物偏移量的能力。

同时调整大小和偏移的方法
`matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY() )`



## 添加滚动条皮肤
[Hexo系列（二）：修改hexo主题 | cv-programmer](https://cv-programmer.github.io/2021/03/15/Hexo%E7%B3%BB%E5%88%97%EF%BC%88%E4%BA%8C%EF%BC%89%EF%BC%9A%E4%BF%AE%E6%94%B9hexo%E4%B8%BB%E9%A2%98/)

[chrome 自定义滚动条样式 | 从零开始的故事 (rem486.github.io)](https://rem486.github.io/web/css/chrome-scroll-bar.html)

[动态加载css | 冷云 (lengyun.github.io)](http://lengyun.github.io/js/3-2-2dynamicAddCSS.html#%E4%B8%8E%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BDjs%E7%9A%84%E5%8C%BA%E5%88%AB)

```css
/* 设置滚动条的样式 */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
    border-radius: 8px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #bbb;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.25);
}
/* 非激活窗口 */
::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0,255,0,0.4);
}
```

## 添加标签云

## 添加大纲
参考[从 0 到 1 开发 Hexo 主题杂谈 | Liuyib's Blog](https://liuyib.github.io/2019/08/20/develop-hexo-theme-from-0-to-1/)

参考next，知道了aside使用的是[affix库](https://getbootstrap.com/docs/3.4/javascript/?#affix)，我们可以拿来用用。

## 添加文章字数、阅读时长等属性

## 离开页面展示个性标题
[为Hexo blog博客创建本地搜索引擎 | 花子凡 (hzfans.github.io)](https://hzfans.github.io/2018/01/03/2018-1-3%20%E4%B8%BAHexo%20blog%E5%8D%9A%E5%AE%A2%E5%88%9B%E5%BB%BA%E6%9C%AC%E5%9C%B0%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E/)

参考以下代码，引入到页面中，改成自己的个性标题即可
```javascript crash_cheat.js
// <!--崩溃欺骗-->
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "/img/TEP.ico");
        document.title = '☀死鬼你去哪里了！';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/avatar.jpg");
        document.title = '☀欢迎回来';
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});
```

## 添加小火箭

## 修改个性代码框

## 导航分类提供下拉框

## 添加文章结束分割线
参考：https://cjjkkk.github.io/next_live2d/
`-------------本文结束<icon gift>感谢您的阅读-------------`



## 高级特性
### 添加到个人域名

#### 添加cdn

### SEO优化



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
