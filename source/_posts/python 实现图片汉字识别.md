---
title: python 实现图片汉字识别
date: 2022-04-05 21:19:00
tags:
- python
- ocr
---

# 核心库使用
相关库：tesseract-ocr
**[https://github.com/tesseract-ocr/](https://github.com/tesseract-ocr)**

核心库软件：tesseract
语言模块：tessdata，其中汉字的是 `chi_sim`

步骤：
1. 下载安装核心库，自己编译太麻烦了，直接下载安装包
2. 下载汉字模块：`chi_sim.traineddata`、`chi_sim_vert.traineddata`
	1. 放到 tresseract根目录/tessdata/下
3. 命令行测试：tesseract -v
4. 图片识别：`tesseract 输入文件 输出路径 -l 解析使用到的语言模块`
	1. 例：`tesseract E://figures/other/timg.jpg E://figures/other/timg.txt -l chi_sim`


核心库已经能正常使用，接下来安装python相关库。

# 安装python 依赖
1. 安装 tesseract api：`pip install pytesseract`
2. 安装图片处理模块：`pip install Pillow`
3. 测试实践：
```python
import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = 'C://Program Files (x86)/Tesseract-OCR/tesseract.exe'
text = pytesseract.image_to_string(Image.open('E://figures/other/poems.jpg'),lang='chi_sim')

print(text)
```

# 提升识别度（实践）
对于提升识别度，官方有一个较全面的指导，点击[链接](https://github.com/tesseract-ocr/tessdoc/blob/main/ImproveQuality.md)查看
经实践，想要提升识别度，提升图片的分辨率是最简单直接有效的方式。建议图片的分辨率转换到300以上，再走tesseract进行处理。

参考：
- [python 5行代码实现图片中文字识别_T_maker的博客-CSDN博客_文字识别python代码实现](https://blog.csdn.net/T_maker/article/details/82622447)
- [python ocr图片中汉字识别【图文】_gisoracleplus_51CTO博客](https://blog.51cto.com/u_12139363/3025427)


待参考：
- [python——识别图片中的文字 - 王耀的博客 (huawei.com)](http://3ms.huawei.com/km/blogs/details/11393875)
- [通过Tesseract OCR识别扫描件PDF - 高文光的博客 (huawei.com)](http://3ms.huawei.com/km/blogs/details/9519567)