$(function () {

    //阻止a标签的默认行为
    mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });
    leftCateList()
    rightCateList(0)
    mui('.left').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        scrollY: false, //是否竖向滚动
        scrollX: true, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });

    //  动态生成顶部导航项结构-一级分类
    function leftCateList() {
        //点击切换 Li的样式  
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        // 找到left元素，注册点击切换样式事件
        $('.left').on('tap', 'li', function (index) {
            // 拿到当前li索引值
            var index = $(this).index()
            console.log(index);
            // 切换同级元素的active
            $(this).addClass('active').siblings().removeClass('active')
            // 同步索引 , 点击导航栏的时候切换对应的商品
            rightCateList(index)
        })

        $.ajax({
            type: 'get',
            url: 'http://193.112.55.79:9090/api/getbaicaijiatitle',
            dataType: 'json',
            success: function (result) {
                console.log(result);
                // 调用模板
                var html = template('listTemp', result)
                // console.log(html);
                $('.list').html(html)

            }
        })
    }

    // 动态渲染商品信息
    function rightCateList(index) { //index
        $.ajax({
            type: 'get',
            url: 'http://193.112.55.79:9090/api/getbaicaijiaproduct',
            data: {
                'titleid': index
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                var html = template('rightTemp', result)
                // console.log(html);
                $('.rightList').html(html)

            }
        })
    }

    function init() {
        $.ajax({
            type: 'get',
            url: 'http://193.112.55.79:9090/api/getbaicaijiaproduct',
            data: {
                'titleid': 2
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                var html = template('rightTemp', result)
                // console.log(html);
                $('.rightList').html(html)

            }
        })
    }







})