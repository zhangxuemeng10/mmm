$(function () {
    mui('body').on('tap', 'a', function () {
        window.top.location.href = this.href;
    });
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false, //是否显示滚动条
    })

    init()
    // 渲染国内折扣商品详页
    function init() {
        var aa = location.search.substring(1)
        var temp = aa.split('=')[1]
        $.ajax({
            type: 'get',
            url: 'getdiscountproduct',
            data: { "productid": temp },
            dataType: 'json',
            success: function (result) {
                var html = template('mmm_xqitem', result)
                $('.conder').html(html)
            }
        })
    }
})