#企商汇工具集——模块加载

###使用方法

```js
var module = qshUtil.module(options);
options 与 $.ajax的options一致
新增与不同
mount: 挂载点，即模块加载区域的节点
success: 数据成功返回的回调
```

###方法

```js
module.fail(text);  //text为失败信息，不传为"未知错误" 并附带一个刷新提示
module.hide();      //隐藏加载框
```