---
title:  如何在一台机器管理两个github账号
date: 2022-03-23 22:14:00
tags: 
- github
- ssh
category: 日常经验
---
这个问题的背景比较特殊，不是每个人都会遇到

比如你和你的对象都有github账号，而且两人偶尔会用同一台电脑push东西，就会遇到这种问题

现假如我要在本机维护两套github账号，一个是donnie，一个是alpha

# 一. 创建密钥对
先用命令创建各自对应的密钥对，按着步骤走，密钥存储的文件名要各自命名
```bash
ssh-keygen
```

此时两个账号的密钥对存放到了`~/.ssh/`目录下了

# 二. 配置pubKey到GitHub账号下
在本例中，会把`~/.ssh/id_rsa_alpha.pub`里的公钥配到`alpha`的GitHub账号下；`~/.ssh/id_rsa_donnieyeh.pub`里的公钥配置到donnie的GitHub账号下

# 三. 配置ssh config
创建`~/.ssh/config`文件，为每个账号配置如下内容

```
# donnie 
Host donnieYeh
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_donnieyeh

# alpha
Host alpha
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_alpha
```

配置完后可以使用命令`ssh -T git@${Host}`验证效果，例：
```bash
ssh -T git@donnieYeh
ssh -T git@alpha
```

出现以下响应代表配置成功了
```
Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.
```

# 四. 修改提交人信息
由于一台机器有两个GitHub账号使用，所以不能配置全局提交人，不然提交信息就乱套了。

首先删除全局配置：
```bash
git config --global --unset 'user.name'
git config --global --unset 'user.email'
```

然后再在各自的git仓库设置本地配置：
```bash
git config user.email xxx@gmail.com
git config user.name xxx
```

# 五. 将远程仓库地址与账号配置进行关联
假如原仓库地址为：
`git@github.com:xr08255920/picCrawler.git`
或
`https://github.com/xr08255920/picCrawler.git`

则重新关联的远程仓库格式为：
`git@${Host}:xr08255920/picCrawler.git`

之后进行远程仓库操作，git会自动按照`config`文件中的配置把`${Host}`映射成`${HostName}`，而且会使用对应的私钥进行通信

## 实践：
若已经有现成的拉下来的远程仓库，则修改远程仓库的地址：
```bash
# 查看现有的关联
$ git remote -v
origin  https://github.com/xr08255920/picCrawler.git (fetch)
origin  https://github.com/xr08255920/picCrawler.git (push)
# 先删除原先绑定的地址
$ git remote remove origin
# 再重新添加 
$ git remote add origin git@donnieYeh:xr08255920/picCrawler.git
```

若是新clone的仓库，自行手动把clone地址的`github.com`改成自己的`${Host}`：
```bash
$ git clone git@donnieYeh:xr08255920/picCrawler.git
```

之后就能正常的进行仓库的各种管理操作啦