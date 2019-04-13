$(function () {

    // 动态扩展zepto中的成员变量
    $.extend($, {
        getParameter:function(url) {
            var obj = {}
            url = url.substring(1)
            // 先按？进行拆分
            var arr = url.split('?')
            // 遍历进行第二次拆分
            for (var i = 0; i < arr.length; i++) {
                var temp = arr[i].split("=")

                obj[temp[0]] = temp[1];
            }
            return obj
        }
    })
})