#企商汇工具集——常用方法

###方法

####compileTpl
模板解析

```js
var temp = '<div>{{name}}</div>';
var data = {name: 'guanyx'};
qshUtil.compileTpl(temp, data); //'<div>guanyx</div>'
```

####resizeImg
图片大小自适应

```js
var img = '/group/data/xxxx.jpg';
var img2 = '';
var img_size = 900;
var img2_size = 125;
qshUtil.resizeImg(img_size, img);   //'http://img.8673h.com/group/data/xxxx_800x800.jpg';
qshUtil.resizeImg(img2_size, img2); //http://m.8673h.com/images/pro_pic_150x150.png
//根据手机像素比调整大小。以IPhone6为例，IPhone6的像素比为3
qshUtil.resizeImg(img2_size, img2); //http://m.8673h.com/images/pro_pic_400x400.png
```

####queryString
获取url参数

```js
//location.href = 'http://www.baidu.com/?name=abc'
qshUtil.queryString('name') //abc
```

####localStorage
操作localStorage

```js
qshUtil.localStorage(key, value)    //保存key数据到localStorage
qshUtil.localStorage(key)   //读取key的值
```

####uncertainImage
备选图片

```js
qshUtil.uncertainImage(image, src, replace) //image: 图片dom对象， src：图片地址， replace：图片备选地址
```

####absoluteImg
图片路径转换

```js
//input: /group****.jpg output: http://img.8673h.com/group****.jpg
//input: /images/****.jpg   output: http://m.8673h.com/images/****.jpg
qshUtil.absoluteImg(image) 
```

####back
页面返回

```js
//默认调用history.back()
//如在APP打开，则调用APP的返回接口
qshUtil.back();
```