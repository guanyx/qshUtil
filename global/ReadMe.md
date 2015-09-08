#企商汇工具集——全局变量

全局变量挂载于qsh_object，该变量声明在头部引入的top.js中

####activeType
点击类型

```js
//由于在某些机型上，即便设置了meta viewport，click事件也会延时300ms触发。故在支持touchstart的设备上，优先使用touchstart；
$(selector).on(qsh_object.activeType, function(){})
```