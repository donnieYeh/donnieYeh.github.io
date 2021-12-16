---
title: mysql，GROUP_CONCAT，341长度疑案
date: 2021-12-16 07:33
tags: 
- mysql
categorys:
- mysql系列
---

### 背景
今天被同事找来讨论一个数据库问题，一个select语句带有聚合函数`GROUP_CONCAT(countryCode)`，countryCode是纯数字，所以这一列出来的结果应该是这样的：`24,25,1003,1004,1025,......`，但是实际上结果被截断了，把结果copy出来到notepad++，发现每一条记录的长度都是`341`。

经过一番查询，发现mysql对这个函数有个配置：`group_concat_max_len`，指的是对`GROUP_CONCAT()`函数的结果进行截断。比如`group_concat_max_len=1024`，那么mysql会对该函数的结果截取前1024个字节(Byte)。看起来就是它了。

通过以下命令，可以查看该库对应的配置：
```sql
show variables like 'group_concat_max_len'

>> 1024
```

可见我们的库也是1024，那为啥实际结果长度只有`341`呢。据回答的小哥说：当`GROUP_CONCAT()` 和 `Order By`一起使用的时候，结果就会进一步裁剪到1/3，如果去掉`Order By`条件，结果长度会是`1024`。但是这个规律是实践出来的，具体为啥会这样，官方手册里并没有说。

### 验证
为了验证思路，可参考以下sql进行配置
```sql
# SESSION 表示变动只影响当前会话
SET SESSION group_concat_max_len=102400;
```

配置后验证结果长度确实不会被截断了。

### 修复
由于我们只在某一个环境中才复现了这个问题，别的环境都没问题，所以思路就是参考别的环境的配置，经查询发现其他环境的值都是`group_concat_max_len=8192`，所以其他环境没有这个问题，遂对齐配置即可。

```sql
# GLOBAL 表示变动影响全局
SET GLOBAL group_concat_max_len=your_value_here;
```


如果严谨一点，应该需要排查项目里所有用到`GROUP_CONCAT()`的地方，然后结合业务评估一下合理的大小，再找DBA协商进行变更。所幸我们生产环境配的是`102400`，足够大了，也就没这种顾虑了。


---
参考:
- https://stackoverflow.com/questions/12001919/mysql-truncates-concatenated-result-of-a-group-concat-function
- https://stackoverflow.com/questions/4469474/mysql-truncating-of-result-when-using-group-concat-and-concat/37979180#37979180