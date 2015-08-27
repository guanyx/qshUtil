(function (global) {
    'use strict';

    var id = 0;
    var template = '<div id="{{id}}" class="qsh-util-modal"> ' +
        '<div class="qsh-util-modal-inner"> ' +
        '</div> ' +
        '</div>';

    function modal(options){
        this.id = 'qsh-util-modal-' + (id++);
        this.content = $(options.mount);
        this.content.wrap(qshUtil.compileTpl(template, this)).show();
        this.dom = $('#' + this.id);

        if(options.style){
            this.dom.find('.qsh-util-modal-inner').css(options.style);
        }

        var _that = this;
        this.dom.on('click', function(e){
            if(e.target === this){
                _that.hide();
            }
        });
    }

    modal.prototype.show = function(){
        if(!$(document.body).hasClass('modal-open')){
            $(document.body).addClass('modal-open');
            this.boostrapModal = true;
        }
        this.dom.show();
        setTimeout(function(){
            console.log(this);
            this.dom.addClass('qsh-show');
        }.bind(this), 20);
    };

    modal.prototype.hide = function(){
        if(this.boostrapModal){
            $(document.body).removeClass('modal-open');
            this.boostrapModal = false;
        }
        this.dom.removeClass('qsh-show');
        setTimeout(function(){
            this.dom.hide();
        }.bind(this), 350)
    };

    qshRegister({
        name: 'modal',
        entry: function(options){
            return new modal(options);
        }
    })
})(window);