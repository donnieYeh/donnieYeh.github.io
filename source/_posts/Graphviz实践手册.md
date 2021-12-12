---
title:  Graphviz实践手册
date: 2021-11-26 19:59:13
tags:
---
# dot语言

## 语法
```
[ strict ] (graph | digraph) [ ID ] {

	rankdir =  //布局方向，只有一个生效 "TB", "LR", "BT", "RL"
	
	// 设置公共属性
	(graph | node | edge) [ID = ID, ID2 = ID2, ...];
	...
	
	// 声明节点
	NODEID [ port ] [ID = ID, ID2 = ID2, ...];
	...
	
	// 节点链
	(NODEID [ port ] | subgraph) edgeop (node_id | subgraph) [ID = ID, ID2 = ID2, ...];
	...
	
} 
```

##   编译命令
`dot -Tpng *.dot -o *.png`

## 画Label格子技巧
1. 先整理1级分类，如A|B|C
2. 整理某分类的二级分类，如B的二级分类：{B1|B2|B3}
3. 把二级分类挂到一级分类下边，得：A|{B|{B1|B2|B3}|C
4. 以此类推
5. 得到的结果方label里，如`nodeName [label="A|{B|{B1|B2|B3}|C"]`


## shape
![](/images/Pasted%20image%2020201218173054.png)

## 子图边框样式
```
subgraph{
	style = dotted;
}
```
可选样式：
![](/images/Pasted%20image%2020201222153845.png)

## 允许子图边界可以被指定
```
digraph {
	//设置该选项开启
	compound=true 
}
```

指定子图边界：
```
CacheUtil -> Ehcache [label="findCache()",ltail = cluster_CatcherManager]
```

## 中文乱码
指定 ``edge [fontname="MicroSoft YaHei"]``

## subgraphs 和 clusters 的区别
subgraph有以下几个作用：
- 负责抽象多个节点的公共属性
- 给组件分组（单纯是语义上的分组，不可见）

cluster继承subgraph的特性，并额外提供可视化的边界，cluster的定义方法就是给子图的名字加前缀`cluster_`
