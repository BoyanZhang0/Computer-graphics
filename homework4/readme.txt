src目录下存放.obj等资源文件
css目录下存放.css文件
js目录下存放.js文件

1.main.js 	主要负责与着色器的通讯（改动）		核心脚本
2.graph.js 	定义2D基本图元（无效）
3.graph3D.js 	定义图形类以及提供3D基本图元（改动）	核心脚本
4.content.js 	内容绘制代码（改动）			核心脚本
5.color.js	提供几种基本配色（无效）
6.canvas.js	负责与canvas有关的参数调整(未改动)
7.button.js	负责界面的交互响应(未改动)
8.objReader 	读取obj文件(已封装)


请用Chrome打开网页,在打开之前请右键chrome,选择属性,在目标栏末尾添加 --allow-file-access-from-files

改进
读取obj文件当前是使用XmlHttpRequest的方法,部分系统\浏览器不支持,最好换一种读取文件的方式。

	