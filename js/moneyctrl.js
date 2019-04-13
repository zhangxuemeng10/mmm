$(function () {

    //阻止a标签的默认行为
        mui('body').on('tap', 'a', function (e) {
            e.preventDefault()
            window.top.location.href = this.href;
        });
    // 定义一个全局变量 索引
    var index = 0
    // 索引从0开始
    setSiteNav(0)
    var totalpage;
    //    发起ajax请求数据
    function setSiteNav(index) {
        // console.log(index);
        $.ajax({
            type: 'get',
            url: "http://193.112.55.79:9090/api/getmoneyctrl",
            // 指定传入的参数 pageid   index为当前id号
            data: {
                'pageid': index
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                // 调用模板渲染
                // console.log(reslut.result.length);
                // 判断result索引大于0,大于0则渲染数据
                if (result.result.length >= 0) {
                    var html = template('ChineseType', result);
                    //    console.log(html);
                    $('.m_content').html(html)
                   totalpage=Math.floor(result.totalCount/result.pagesize) 
                }

            }
        })
    }
    // 下一页点击事件同步
    function init() {
        $('.below').on('tap', function () {
             if (index == totalpage) {
                 mui.toast('没有更多商品了')
                 return
             }
            index++
            // 同步渲染的页面
            setSiteNav(index)
            console.log(index);
        })
    }
    init()
    //上一页点击事件
    function upPage() {
        // 点击upPage 回到上一页商品页面
        $('.upPage').on('tap',function () {
            index--
            // 判断index 小于0的时候重置当前页面 
            // 阻止
            if(index<0){
                index=0
            }
             setSiteNav(index)
             console.log(index);
             
        })
    }
    upPage()





    // function init() {
    //     $('.below').on('tap', function () {
    //         if (index == 14) {
    //             return
    //         }
    //         index++
    //         setSiteNav(index)
    //         // var index = $(this).index()
    //         // index++
    //         console.log(index);
    //     })
    // }
    // init()


    // // 重置页面 当索引小于0的时候重置当前页面
    // function abc() {
    //     $('.upPage').on('tap', function () {
    //         index--
    //         //  判断index小于0的时候则重置页面为当前索引页面
    //         if (index < 0) {
    //             index = 0
    //         }
    //         setSiteNav(index)
    //         // var index = $(this).index()
    //         // index++
    //         console.log(index);

    //     })
    // }
    // abc()



})