(function($){
    /**
     * 初始化
     */
    function TdFormSelect(target, options){
        this.__target__ = target;
        this.__selectdiv__ = null;

        this.changeTdToInput();
        this.createshowdiv();
        this.bindClickEvent();
        this.bindCheckboxClick();

        return this;
    }

    TdFormSelect.prototype.createshowdiv = function () {
        var __this = this.__target__;
        //构建DIV
        var offset = $(__this).offset();
        var pageX = offset.left + 8 + "px";
        var pageY = (offset.top + __this.outerHeight()) + "px";
        var __selectdiv__ = $('<div class="td-select-form"></div>');
        $(__selectdiv__).css({
            "position": "absolute",
            "left": pageX,
            "top": pageY,
            "width": "300px",
            "height": "400px",
            "background-color": "#ff7400"
        });

        //添加数据
        var data = $(__this).attr("data-select");
        if(!data){
            return;
        }
        var datalist = data.split(",");
        for(var i=0;i<datalist.length;i++){
            var currval = datalist[i];
            var div = $('<div class="select-row"></div>')
            var checkbox = $('<input type="checkbox" select-val="'+currval+'" />');
            var span = $('<span>'+currval+'</span>');

            $(div).append(checkbox).append(span);
            $(__selectdiv__).append(div);
        }
        $("body").append(__selectdiv__);
        this.__selectdiv__ = __selectdiv__;
    };

    TdFormSelect.prototype.bindClickEvent = function(){
        var __td = this.__target__;
        var selectdiv = this.__selectdiv__;
        //事件绑定
        $(selectdiv).on('click', function(e){
            e.stopPropagation();
        });
        //添加全局事件，监听是否去掉窗口
        $(document).on('click', function(e){
            var input = $(__td).find("input");
            $(__td).html($(input).val());
            $(__td).attr("title", $(input).val());
            $(selectdiv).remove();
        });
    }

    TdFormSelect.prototype.bindCheckboxClick = function(){

        var __td = this.__target__;
        var selectdiv = this.__selectdiv__;

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
            var input = $(__td).find('input');
            $(input).val(value);
            $(input).attr("title", value);
        });
    }

    TdFormSelect.prototype.changeTdToInput = function(){
        var __this = this.__target__;
        var value = $(__this).html();
        var input = $('<input type="text" disabled value="'+value+'" />');
        $(__this).html(input);
    }

    $.fn.tdFormSelect = function(options){
        var tdselect = new TdFormSelect(this, options);
        return tdselect;
    }
})(jQuery);
