$(function () {

    $.ajax({
        type: 'get',
        url: 'http://193.112.55.79:9090/api/getcouponproduct',
        data: $.getParameter(location.search),
        dataType: 'json',
        success: function (result) {
            console.log(result);

            // 动态渲染肯德基优惠券列表
            var html = template('discountCouponTemp', result)
            $(".con_ul").html(html)

            // 动态渲染轮播图图片
            var html1 = template('bannnerTemp', result)
            $('.mmm_banner_box').html(html1)
        }
    })


    // 单击按钮为页面添加遮罩 和 出现轮播图 效果
    $('.con_ul').on('tap', '.mmm_icon', function () {
        console.log(234);
        // 切换body的样式
        $('body').toggleClass('SwitchStyle mui-backdrop')
    })

    // 轮播图初始化
    var swiper = new Swiper('.swiper-container', {
        // Enable lazy loading
        lazy: true,
        loop: true, // 循环模式选项
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

})