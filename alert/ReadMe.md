#企商汇工具集——弹出框提示


###Usage
```js
qshUtil.alert({
    type: 'tip',    //支持 warn(警告), success(成功), fail(失败)， tip(提示)
    msg: '操作成功',    //提示内容（仅支持文字）
    cancel: function(){     //点击取消按钮的回调
        alert('hehe');
    },
    ok: function(){     //点击确定按钮的回调
        alert('ok)
    }
})
```

通过事件获取点击状态
```js
$(document.body).on('qsh.alert.ok', function(){
    alert('ok');
})
$(document.body).on('qsh.alert.cancel', function(){
    alert('cancel');
})
```

事件挂载于body元素
qsh.alert.ok:   点击确定按钮的事件，如在调用时未传入ok回调，则触发该事件
qsh.alert.cancel:   点击取消按钮的事件，如在调用时未传入cancel回调，则触发该事件