---
title: js模块化简述
date: 2021-12-09 10:05
tags: 
- javascript
- modular
- 模块化
categories: js系列
---

本文是阅读《mastering-modular-javascript》的心得笔记，该书成书于2018年，对当前JS技术的描述有较新的时效性。同时其模块化思想比较实用，可以应用到任何语言

## 历史简述
### scriptTag和闭包
原生js提供使用`<script>`tag的方式引入，这样一个页面会看到一大坨的第三方库以`<script>`的方式引入。但是这种引入天生是有缺陷的，引入的函数和变量都会挂载到window下成为全局对象。这样导致一个长期存在的毛病就是各个包之间定义的变量会相互覆盖，稍有差池就会让页面渲染失败。

之后官方推出了IIFE的特性（也就是闭包），各个库的代码以闭包的方式包裹，这样它们各自定义的变量的作用域都是在闭包范围之内的，也就解决了全部暴露到全局的问题。

但是这种方式弊病在于它不会显式的声明依赖的库，这样就需要手动精细调整各个`<script>`的顺序，以达到被依赖的库优先被引入的问题，

闭包的几种写法：
```javascript
(function() {
  console.log('IIFE using parenthesis')
})()

~function() {
  console.log('IIFE using a bitwise operator')
}()

void function() {
  console.log('IIFE using the void operator')
}()
```

> \<mastering-modular-javascript\> chapter1

### RequireJs，AngularJs，和依赖注入
上节描述的问题一直都是让前端开发人员头疼的问题，直到模块化框架RequireJs以及AngularJS中依赖注入机制的降临。

#### RequireJs
通过如下方式暴露接口，define()是RequireJs框架暴露到全局的函数
第一个参数的数组元素声明了该模块的路径，第二个参数意思是通过把函数传入回调接口，返回该路径对应的接口
```javascript
define(['mathlib/sum'], function(sum) {
  return { sum }
})
```

通过如下方式调用依赖项，require()跟define()一样，
第一个参数声明了需要引入的依赖路径，可以引入多个依赖
这些依赖会按顺序放到第二个回调函数的参数中，提供使用。
```javascript
require(['mathlib'], function(mathlib) {
  mathlib.sum(1, 2, 3)
  // <- 6
})
```

requireJS也有它的问题，首先整个模式围绕着它的异步请求能力，这导致了每个引用点都要发起网络请求获取对应的模块，这会导致一个页面发起瀑布式的上百个加载模块的网络请求，这无疑是性能很差的一件事。为此，需要引入一个构建工具，把所有模块整合成一个脚本，包含冗长的依赖链、require函数、和回调参数

### AngularJS
AngularJS中的依赖注入系统也遇到了许多相同的问题。它通过解析参数名来解决依赖问题。但是这导致了进行代码混淆时，参数名被改变而依赖失败的问题。在AngularJS v1后期，引入了一个构建任务来解决这个问题，它会进行如下的代码转换：
```javascript
//转换前
module.factory('calculator', function(mathlib【<-通过该参数名来引入依赖】) {
  // …
})
```

```javascript
//转换后
module.factory('calculator', ['mathlib'【<-显式的指明了依赖的模块名称，像RequireJs一样】, function(mathlib) {
  // …
}])
```

> 不用说，引入这个鲜为人知的构建工具的延迟，加上过度设计的方面，有一个额外的构建步骤来解开不应该被破坏的东西，我无论如何都不鼓励使用一种能带来如此微不足道的好处的模式。开发人员大多选择坚持使用熟悉的类似RequireJS的硬编码依赖数组格式。——\<mastering-modular-javascript\>

### Node.js和CommonJS的降临和Browserify
在Node.js被称赞的众多创新中，一个是CommonJS模块系统——简称CJS。利用Node.js程序可以访问文件系统的能力，CommonJS标准更符合传统的模块加载机制。在CommonJS中，每个文件都是一个具有自己作用域和上下文的模块。依赖关系是使用同步`require`函数加载的，该函数可以在模块生命周期中的任何时候动态调用，如下一个代码段所示。
```javascript
const mathlib = require('./mathlib')
```

可见，与RequireJs、AngularJS一样，都是使用路径来指定模块，而不同之处在于曾经的样板函数、依赖数组已经不复存在。像前两者，它们可以在一个文件里定义多个模块的接口，但是CJS相对比较严格，它约定一个模块就是一个文件，通过`module.exports`就能暴露该模块的接口。其实这样的好处也显而易见，这样可以让开发者更加清晰的了解CJS模块的层次结构，也便于IDE去解析。

由于CJS是提供给NodeJs用的，浏览器引擎并没有能力去引入依赖，这个时候就要靠`Browserify`，来把所有的依赖打包到供浏览器使用的捆绑包中。


### ES6, `import`, Babel, and Webpack
#### Babel
ECMA标准组织一直都在持续的采纳和计划新的语法标准。很多时候一些很实用的语法已经提上议程，但是待各大浏览器对标准进行实现，开发者还是得苦苦的等待一段漫长的事间。Babel的出现就是为了解决这个问题，它是一个语法转换工具，能够把ES6语法的代码，转换成当前浏览器都能兼容的ES5语法，解决了很多开发想要尝试新的语法特性的燃眉之急

随着ES6在2015年6月标准化，以及Babel在那之前很久就一直有将ES6转换为ES5，一场新的革命正在迅速临近。ES6规范包括JavaScript原生的模块语法，通常被称为ECMAScript模块（ESM）。

#### ES6
ESM在很大程度上受到CJS及其前身的影响，提供了静态声明性API以及基于承诺的动态可编程API，如下所示。

```javascript
import mathlib from './mathlib'
import('./mathlib').then(mathlib => {
  // …
})
```

同CJS一样，ESM约定一个文件就是第一个模块。而优秀于CJS的地方是ESM能引用静态依赖，静态依赖意味着可以无需运行代码就能被工具检测出相关的依赖，我猜应该是能够便于编辑工具进行依赖解析吧，对书本原文说的“内省”不是很理解。（参考：[javascript - what is the meaning of static import in ES6? - Stack Overflow](https://stackoverflow.com/questions/52965907/what-is-the-meaning-of-static-import-in-es6)）。

> Static imports vastly improve the introspection capabilities of module systems, given they can be analyzed statically and lexically extracted from the abstract syntax tree (AST) of each module in the system.	——\<mastering-modular-javascript\>

另外ESM比CJS更强的一个地方在于它可以指定加载模块的异步完成事件（`.then()`）。这让模块加载的动作变得更加灵活和更多可能性。


#### Webpack
Webpack是browserify的接班人。


___
综上所述，由于ESM纯正血统以及优异表现，毫无疑问ESM将在未来的几年内，将会接管整个JS模块化生态。

参考文献：[GitHub - mjavascript/mastering-modular-javascript: 📦 Module thinking, principles, design patterns and best practices.](https://github.com/mjavascript/mastering-modular-javascript)



## 模块化原则
### 模块化精要
1. 单一职责原则
2. API优先原则
3. 不暴露非必要的方法或变量（public 要有度，能private的尽量private）
	1. 从使用者角度去考虑暴露的粒度
4. 找到合适的抽象（最好就是在第二次出现重复的时候进行重构）
5. 状态管理
	1. 模块化设计的一个目标就是让状态最小化，不要让功能内部存在太多可能性
	2. 把状态树砍成更好管理的状态树分支，每个分支都是状态树的一个子集
	3. 纯粹的函数不应该对其它地方有影响，下面是例子
		```javascript
		// 纯粹函数
		function sum(numbers) {
  			return numbers.reduce((a, b) => a + b, 0)
		}
		
		// 非纯粹函数，每次调用的结果可能被其他调用影响
		let count = 0
		const increment = () => count++
		export default increment
		```
	4. 可以通过工厂来封装可能暴露给外部的状态，来减少状态的熵值
		```javascript
		const factory = () => {
		  let count = 0
		  const increment = () => count++
		  return increment
		}
		export default factory
		```

### CRUST: Consistent, Resilient, Unambiguous, Simple and Tiny
1. Consistent：一个接口只要输入一样，无论执行多少次，输出都应该一样
2. Resilient：接口应能够灵活的指定参数，包括可选参数和重载
3. Unambiguous：接口应该是明确的，不存在多种用法、多套不同业务意义的入参、多套不同解释的返回值
4. Simple：接口应该保持简单，它可以以少配置甚至无配置，执行常规的用例，同时也能允许用户通过传递自定义配置执行更高级的用例
5. Tiny：它应该是精简的，保持高扩展性

