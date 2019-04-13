$(function () {
    mui('body').on('tap', 'a', function () {
        window.top.location.href = this.href;
    });
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false, //是否显示滚动条
    })
    init()
    // 渲染国内折扣商品列表页
    function init(resut) {
        $.ajax({
            type: 'get',
            url: 'getinlanddiscount',
            dataType: 'json',
            success: function (result) {
                // 渲染折扣商品列表
                var html = template('mmm_gnzkitem', result)
                $('.nier ul').html(html)
                // 判断如果传入函数就进行调用
                if (resut) {
                    resut(result)
                }
                // 点击返回顶部  未完成,应该是mui文件有问题.报错:scrollTo函数不存在
                // $('.mmm_btndb').on('tap', function () {
                //     mui('.mui-scroll-wrapper').scroll({
                //         deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                //         indicators: false, //是否显示滚动条
                //     }).scrollTo(0, 0, 100);//100毫秒滚动到顶
                // })
            }

        })
    }
    // 初始化下拉更新  目前没用.因为总共就几条数据 而且不用传入页数和显示数量
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: false,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    console.log(11);
                    // init( function (result) {
                    //     console.log(result);
                    //     if (result.result.length > 0) {
                    //         var html = template('mmm_gnzkitem', result)
                    //         $('.nier ul').append(html)
                    //         mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                    //     } else {
                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                    //     }
                    // })

                }

            }
        }
    });



})