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