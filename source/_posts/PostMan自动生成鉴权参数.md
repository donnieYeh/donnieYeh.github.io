---
title: PostMan自动生成鉴权参数
date: 2022-01-28 14:50
tags: 
- PostMan
- 测试
categories:
- 效率人生
---

## 前言
工具版本：
- PostMan: 8.0.7
- Crypto-js: 3.1.9

我们通常联调的时候，有可能会需要协商好密钥，用于在API调用时加签和验签。由于签名是基于请求体和请求头动态生成的，postman预置静态参数的方式根本不能满足我们对效率的追求，然后我就捣鼓了一下用postman为每个请求动态生成鉴权参数，以此文章来记录过程中的经验心得。

postman中有个选项页叫做`Pre-request script`，顾名思义，它可以在请求前执行该脚本。它本质上就是个js脚本，而我们主要就是要在这里编写脚本生成所需数据。

## 零、预研
调查了一下找到了JS里好评率较高的密钥库[Crypto-js](https://github.com/brix/crypto-js)，随便谷歌一个好用的CDN地址，我这里使用的是jsdelivr的源（jsdelivr真的太香了）。为了验证它好不好使，我习惯先用交互式编程研究下它的用法（使用ipython留下的习惯），最好的JS交互式界面当然就是Chrome了。

打开Chrome控制台，输入命令，引入密钥库。
```javascript
var script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/crypto-js@3.1.9-1/crypto-js.js"
document.getElementsByTagName("head")[0].appendChild(script);
```

简单找下，很容易找到它的主类是`CryptoJS`

我这里需要用到密钥库里的HmacSHA256、Base64两个工具，通过摸索它的API，很快了解了用法。
```javascript
var key = foo
var message = bar
var sign = CryptoJS.HmacSHA256("foo",'bar')
var signenc = CryptoJS.enc.Base64.stringify(sign)
```

	此处要注意一个大坑，由于CryptoJS生成的Sign是特别的数据结构，而不是纯粹的二进制，所以用chrome自带的base64工具（btoa、atob）是无法得到正确的编码的，总之别人工具库都给你准备好了那就直接用工具库里的Base64吧。
	
然后用得到的签名跟服务器生成的签名作比对，或者直接调用API验证，验证成功，至此前期工作已经准备好。

## 一、引入密钥库
打开PostMan的 `Pre-request script` 界面，编写脚本，在脚本初始化阶段引入密钥库。

```javascript
if(!pm.globals.has("cryptojs")){
 pm.sendRequest("https://cdn.jsdelivr.net/npm/crypto-js@3.1.9-1/crypto-js.js", (err, 	res) => {
 if (!err) {
 pm.globals.set("cryptojs", res.text())
 }
})}

eval(pm.globals.get("cryptojs"));
```


## 二、构造鉴权数据
先确定构造数据所需的关键元素，参考对接文档，用注释把步骤大致整理出来
```javascript
// plaintext = httpmethod + RequestURI + http body
// key=AppSecret + Nonce + timestamp
// token=BASE64(HMAC_SHA256(plaintext, key))
```

然后对着注释把代码补全

> 有条件的都建议使用新版客户端，不建议用chrome插件。客户端会在编写脚本的时候有智能代码提醒，很方便。

	1. 获取请求头使用 pm.request.headers
	2. 获取body使用 pm.request.url.getPath(true)，加true是指不按'/'切割路径

```javascript
// let plaintext = httpmethod+RequestURI+http body

let plaintext = 'POST'+pm.request.url.getPath(true)+pm.request.body.raw;

// key=AppSecret(主题服务器分配)+Nonce+timestamp

let appSecret = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let key = appSecret+pm.request.headers.get("nonce")+pm.request.headers.get("timestamp");

// token=BASE64(HMAC_SHA256(plaintext, key))

let sign = CryptoJS.HmacSHA256(plaintext,key);

let signenc = CryptoJS.enc.Base64.stringify(sign);

pm.collectionVariables.set("usertoken", signenc);
```

最后把构造好的`token`设置到环境变量中：`pm.collectionVariables.set("usertoken", signenc);`

## 三、引用鉴权参数
在请求用例的Header中，就可以用PostMan的匹配字符来引用上一步放置到环境变量中的数据了。
![[Pasted image 20220128154749.png]]

之后就可以点击请求按钮验证结果了，此时无论我怎样的修改请求体，修改timestamp，都可以自行动态生成token了，舒畅~。