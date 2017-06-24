(function($){
    /**
     * 初始化
     */
    function TdFormSelect(target, options){
        var __target__ = target;
        var __selectdiv__ null;

        //绑定双击事件
        $(target).on("dblclick", function(e){
            this.createshowdiv();
        });

        return this;
    }


    TdFormSelect.prototype.createshowdiv = function () {
        var pageX = __target__.offsetLeft + 8 + "px";
        var pageY = (__target__.offsetTop + __target__.offsetHeight) + "px";
        var __selectdiv__ = $('<div class="testdiv"></div>');
        $(__selectdiv__).css({
            "position": "absolute",
            "left": pageX,
            "top": pageY,
            "width": "400px",
            "height": "600px",
            "background-color": "#ff7400"
        });
        $("body").append(__selectdiv__);
    };



    $.fn.testfun = function(options){
        var tdselect = new TdFormSelect(this, options);
        return tdselect;
    }
})(jQuery);
