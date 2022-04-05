---
title: what does "TCP segment of a reassembled PDU" mean?
date: 2022-04-05 21:06:00
tags:
- 网络
- 抓包
---

### what does "TCP segment of a reassembled PDU" mean?
wireshark抓TCP包抓到`"TCP segment of a reassembled PDU"`，表示该TCP包是被分片了的，被分片的理由是因为发送方的原数据太大，当原数据长度超过了双方协商的`MSS`值，就会将数据进行TCP分片。

	注意与IP层切片参数`MTU`区分。
	
当使用wireshark抓包时，有以下分辨方法
1. 若多个TCP包作为一个大段数据的分片进行传输，它们的ACK会是一样的，这很好分辨
2. 或者点开任意分片的数据包查看内容，里面会出现诸如`[Reassembled PDU in frame: 9]`的信息，表示这些分片将在9号记录中整合。此时跳到9号记录，可以看到`[3 Reassembled TCP Segments (2782 bytes): #6(1306), #7(1360), #9(116)]`这样的描述，表示这段完整的数据由6、7、9号记录整合而成。
	
参考文献：
- [TCP segment of a reassembled PDU - 小西红柿 - 博客园 (cnblogs.com)](https://www.cnblogs.com/tomato0906/articles/3991388.html)

### 拓展
MTU全程最大传输单元，相当于划了一条红线。TCP的MSS将基于MTU来计算获得。