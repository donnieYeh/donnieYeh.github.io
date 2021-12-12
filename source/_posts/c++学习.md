---
title: c++学习
tags: c++
category: c++ 系列
date: 2021-11-18 22:34:58
---

# 学习资料
## 书籍
- <c++ primer plus>

## 视频
【零基础学C++】老九零基础学编程系列之C++
https://www.bilibili.com/video/BV12x411D7xr?p=102


# 入门
## windows环境
### hello world
1. 安装cygwin
2. cygwin安装g++
3. 编写hello world.cpp文件
4. 使用g++编译第一个 hello world 文件

## 关键知识点实践
- 编写 sizeof(struct) ，观察struct 的内存占用
	- sizeof(数组) ，输出的是数组占用内存
	- 输出数组长度
- 使用sort(arr)排序，需要引入 \<algroithm\> 包
- 指针需要习惯赋初值：0
- 指针动态分配内存：``int* num = new int[5]``
	- 记得手动释放：``delete[] num``
- 函数传递指针、引用作为参数
- 函数传递函数指针作为参数
- 数组作为函数入参，内容容易被修改，若不能被改，入参定义前可加`const`

### 自定义函数
1. 函数原型（可省略参数名，调用前必须先写原型
2. 函数定义（逻辑实现
3. 返回值类型不能是数组，参数可以


### 函数指针
声明:
```c++
//函数原型
double sum(double,double);
//函数指针类型声明
typedef double (*ptrSum)(double,double); //此时ptrSum表示类型
//函数指针变量声明
double (*ptrSum)(double,double); //此时ptrSum表示变量名
//函数指针赋值
ptrSum = sum;
//函数原型中，入参类型声明为：（函数指针类型，数1，数2)
void print_result(double (*)(double,double),double,double);
```
## 关键概念理清
- \# 开头的**都**是**预处理**指令，就是编译之前编译器的预操作
- 运算符重载，应用：迭代器 iterator++、指针++(与前面一回事)
- 数组名就是数组的首**地址**，所以定义指针时，数组名前不用加&
```c++
double score[] {1.1, 1.2, 22.3};
double * ptr_score = score;
//typeof score = double[]
//typeof ptr_score = 指针<T>
```
- 指针类型（地址）++，只会指向新地址，+的是类型长度
- 普通变量赋值：开辟新区域，变量重新指向，指针赋值：在指针区域直接赋值，引用变量的赋值：引用区域直接赋值（本质是指针）
- endl 和 \n 的区别：endl带flush
- 动态数组vector，使用：
	- 可见iterator是一个数组指针，arr.begin()是数组头地址，arr.end()同理
```c++
vector<int> arr {2,3,4};
vector<int>::iterator it;
it = arr.begin();
while(it != arr.end()){
	it++;
	cout << *it << endl;
}
```
- void* 指针，可以存任意对象地址，但无法赋值，只能作对比用
- 指针变量(*p++)的优先级是(*(p++))，先运算再寻址


## 与java的差异点
- 数组初始化不需要加 = 号
```c++
int array[] {1,2,3,6,7,8};
```


## 概念图
### 编译过程
![[img/Pasted image 20201114230333.png]]

