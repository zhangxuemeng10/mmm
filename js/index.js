$(function () {
    //获取首页菜单导航数据
    $.ajax({
        type: 'get',
        url: 'http://193.112.55.79:9090/api/getindexmenu',
        success: function (result) {
            // console.log(result);
            var html = template('indexnavTemp', result)
            $('.mmm_nav').html(html)

            $('.mmm_nav a:nth-of-type(8)').attr('href', '#')
            $('.mmm_nav a:nth-last-of-type(-n+4)').css('display', 'none')
            $('.mmm_nav a:nth-of-type(8)').on('tap', function () {

                $('.mmm_nav a:nth-last-of-type(-n+4)').toggle()

            })
        }


    })


    $.ajax({
        type: 'get',
        url: 'http://193.112.55.79:9090/api/getmoneyctrl',
        success: function (result) {
            console.log(result);

            var html = template('recommenlistTemp', result)
            $('.recommen-list').html(html)
        }


    })

})