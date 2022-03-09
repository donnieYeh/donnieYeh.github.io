---
title: github actions checkout失败问题
date: 2022-03-09 10:33:00
tags: 
- CI
- github
---

# 背景：
最近github主页项目，提交代码后CI流程失败。提示
```
##[error]fatal: could not read Username for 'https://github.com': terminal prompts disabled
```
以前都是跟着教程搭的github page 的CI配置，也没有认真了解过其原理，正好借着这次机会学习下。

# github workflow工作流程：
1. 编写一个CI流程配置文件，里面包含了：
	1. 触发CI的条件
	2. CI流程每一步的操作
2. 接下来比如从本地仓push代码到github，触发CI条件，然后github Actions 下的workflow就会按照CI配置文件对应的步骤进行相应的部署操作。

# CI配置文件的结构：
- 触发条件
- 执行的任务（可有多个）
	- 任务的每一步具体做什么

	该配置通常为存放在项目根目录的 `.github/workflows/`下的yml文件
# 什么是actions？
通常 “任务的每一步具体动作”，由 run 命令来执行。而github的actions市场，则提供了一系列封装好的通用动作库。用法则是使用uses 命令来引入。

# checkout actions
其中一个最流行的actions就是 actions/checkout@v2，可以在github.com/actions 页找到它，然后点进去查看相应文档。
该actions中的token选项，是指定PAT（Personal access token）

# 什么是PAT
Personal access token，个人账号范围（可以是组织范围）的一个token，在`Setting/developer settings`里面创建，该token用于在命令行操作个人github资源时鉴权用。在创建的时候，会让你选择该token的授权范围，以及指定token的过期时间，通常不建议设置永久期限，定期更换能减少token暴露风险。

# 如何在actions中引入PAT
可以通过表达式`${{ secrets.PERSONAL_TOKEN }} `来引入，其中 secrets 是指**项目setting**中的secrets栏，PERSONAL_TOKEN是我们在secrets栏中创建的变量，创建的时候把上一步创建的PAT粘贴到变量值，之后即可以在Actions中通过表达式`${{ secrets.PERSONAL_TOKEN }}` 引入环境变量PAT


# 回归问题
造成该异常的主要原因就是PAT过期了，解决办法就是重新生成一个PAT，并重新设置到项目的"secrets.自定义变量名"中，只要跟CI配置文件的变量名匹配，就能重新成功跑通Actions/workflow构建流程了。


# 参考资料：
- [【CICD】_github_新功能_actions_全方位讲解！！](https://www.bilibili.com/video/BV1RE411R7Uy?from=search&seid=4861890920343690403&spm_id_from=333.337.0.0 "【CICD】github新功能actions全方位讲解！！")
- https://github.com/actions/checkout/issues/26
