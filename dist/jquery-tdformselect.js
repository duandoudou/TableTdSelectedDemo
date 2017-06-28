//# sourceURL=jquery-tdformselect.js

(function($){
    /**
     * 初始化
     */
    function TdFormSelect(target, options){
        this.__target__ = target;
        this.__selectdiv__ = null;
        this.__options = {};

        this.__options.onclosefun = options.onclosefun ? options.onclosefun : null;
        this.__options.tdallownull = options.tdallownull ? options.onclosefun : false;
        this.__options.onitemcheck = options.onitemcheck ? options.onitemcheck : null;

        this.createshowdiv();
        this.bindClickEvent();
        this.bindCheckboxClick();

        return this;
    }

    TdFormSelect.prototype.createshowdiv = function () {
        var __this = this.__target__;
        //构建DIV
        var offset = $(__this).offset();
        var pageX = offset.left + "px";
        var pageY = (offset.top + __this.outerHeight()) + "px";
        var width = 300;
        if(__this.outerWidth() < width){
            width = __this.outerWidth();
        }
        var __selectdiv__ = $('<div class="td-select-form"></div>');
        $(__selectdiv__).css({
            "position": "absolute",
            "left": pageX,
            "top": pageY,
            "width": width+"px",
            "padding": "10px",
            "z-index": "1699",
            "background-color": "#fff",
            "border": "1px solid #e4eaec",
            "border": "1px solid rgba(204, 213, 219, .8)",
            "border-radius": "4px",
            "-webkit-box-shadow": "0 2px 6px rgba(0, 0, 0, .05)",
            "        box-shadow": "0 2px 6px rgba(0, 0, 0, .05)",
            "-webkit-background-clip": "padding-box",
            "        background-clip": "padding-box"
        });

        //添加数据
        var data = $(__this).attr("data-select");
        var value = $(__this).html();
        if(!data){
            return;
        }
        var datalist = data.split(",");
        for(var i=0;i<datalist.length;i++){
            var currval = datalist[i];
            var div = $('<div class="select-row"></div>');

            var select = "";
            if(value && value.indexOf(currval) != -1){
                select = "checked";
            }

            var checkbox_custom = $('<div class="checkbox-custom checkbox-primary control-label"></div>');
            var input_label = $('<input type="checkbox" select-val="'+currval+'" '+select+'/><label for="inputChecked">'+currval+'</label>');

            $(checkbox_custom).append(input_label);
            $(div).append(checkbox_custom);
            $(__selectdiv__).append(div);
        }
        $("body").append(__selectdiv__);
        this.__selectdiv__ = __selectdiv__;
    };

    TdFormSelect.prototype.bindClickEvent = function(){
        var __td = this.__target__;
        var __this = this;
        var selectdiv = this.__selectdiv__;
        //事件绑定
        $(selectdiv).on('click', function(e){
            e.stopPropagation();
        });
        //添加全局事件，监听是否去掉窗口
        $(document).on('click', function(){
            if(__this){
                var closefunction = __this.__options.onclosefun;
                if(closefunction){
                    closefunction(__td, __this);
                }
                $(selectdiv).remove();
                __this = null;
            }
        });
    };

    TdFormSelect.prototype.bindCheckboxClick = function(){

        var __td = this.__target__;
        var selectdiv = this.__selectdiv__;
        var __this = this;
        $(selectdiv).on("click", "input[type='checkbox']", function(){
            var checkboxlist = $(selectdiv).find('input[type="checkbox"]');
            var value = "";
            for(var i=0;i<checkboxlist.length;i++){
                var currbox = checkboxlist[i];
                if($(currbox).is(':checked')){
                    value += value ? "," : "";
                    value += $(currbox).attr("select-val");
                }
            }

            var returnFlag = true;

            //设置不能为空
            var allownull = __this.__options.tdallownull;
            if(!allownull && !value){
                value = $(this).attr("select-val");
                returnFlag = false;
            }

            //设置回调
            var itemclickfun = __this.__options.onitemcheck;

            if(itemclickfun){
                itemclickfun(value, __td, __this);
            }

            $(__td).html(value);
            $(__td).attr("title", value);

            return returnFlag;
        });
    };

    $.fn.tdFormSelect = function(options){
        var tdselect = new TdFormSelect(this, options);
        return tdselect;
    }
})(jQuery);
