(function (global) {
    'use strict';
    var root_class = 'qsh-module-load';
    var text_class = 'qsh-module-load-text';
    var spinner_class = 'qsh-module-load-spinner';
    var refresh_class = 'qsh-module-load-refresh';

    /**
     * dependent JQuery
     * options 参照$.ajax的options
     * success为模块加载的回调
     */
    function moduleLoad(options){
        if(!options){
            return;
        }

        if(!options.mount){
            console.error('No Mount');
            return;
        }

        this.element = $(options.mount);

        if(this.element.css('position') === 'static'){
            this.element.css('position', 'relative');
        }
        this.success = options.success;
        delete options.success;
        this.options = options;
        this.ajax(options);
    }

    moduleLoad.prototype.ajax = function(){
        this.spinner();
        $.ajax(this.options)
            .done(function(data){
                this.hide();
                this.success && this.success(data);
            }.bind(this))
            .fail(function( jqXHR, textStatus, errorThrown){
                if(textStatus == '404'){
                    this.fail('网络异常');
                }
                else {
                    this.fail('数据获取失败');
                }
            }.bind(this));
    };

    moduleLoad.prototype.fail = function(text){
        text = text || '未知错误';

        this.refresh(text);
    };

    moduleLoad.prototype.create = function(){
        if(this.element.children('.'+root_class).length){
            return;
        }
        var wrapper = document.createElement('div');
        wrapper.classList.add(root_class);

        var span = document.createElement('span');
        span.classList.add(text_class);

        var spinner = document.createElement('div');
        spinner.classList.add(spinner_class);

        var refresh = document.createElement('a');
        refresh.textContent = '重试';
        refresh.classList.add(refresh_class);

        refresh.addEventListener('click', function(){
            this.ajax();
        }.bind(this), false);

        wrapper.appendChild(span);
        wrapper.appendChild(spinner);
        wrapper.appendChild(refresh);

        this.element.append(wrapper);
    };

    moduleLoad.prototype.position = function(){
        this.create();
        var spinner = this.element.children('.'+root_class);
        if(this.element.height() > 40){
            spinner.css({
                top: '50%',
                marginTop: '-20px'
            })
        }
        else {
            spinner.css({
                top: '0px',
                marginTop: '0px'
            })
        }
    };

    moduleLoad.prototype.spinner = function(){
        this.position();
        var spinner = this.element.children('.'+root_class);

        spinner.find('.'+text_class).hide();
        spinner.find('.'+refresh_class).hide();
        spinner.find('.'+spinner_class).empty().show();
        this.mdSpinner = qshUtil.spinner(spinner.find('.'+spinner_class).get(0));
        spinner.show();
    };

    moduleLoad.prototype.refresh = function(text){
        this.position();
        var spinner = this.element.children('.'+root_class);

        spinner.find('.'+text_class).show().text(text);
        spinner.find('.'+spinner_class).hide();
        spinner.find('.'+refresh_class).show();
        spinner.show();
    };

    moduleLoad.prototype.hide = function(){
        var spinner = this.element.children('.'+root_class);
        spinner.hide();
    };

    function moduleEntry(options){
        return new moduleLoad(options);
    }

    qshRegister({
        name: 'module',
        entry: moduleEntry
    })
})(window);