$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false, //是否显示滚动条
    })
    // 创建变量储存商品列表需要的值 也可以不要
    var areaid=0
    var shopid=0
    // 发送请求进行店铺栏的渲染
        $.ajax({
            type: 'get',
            url: 'getgsshoparea',
            dataType: 'json',
            success: function (result) {
                  // 获取数据进行循环，将里面的值取出来以联动可以读取的格式存到数组data中，
                var arr=result.result
                var data=[]
                for (var i = 0; i < arr.length; i++) {
                    var num={}
                    num.value=arr[i].areaId
                    num.text=arr[i].areaName
                    data.push(num)
                }
                 // 点击地址栏进行选择地址，地址栏的内容个进行变化
                $('#showUserPicker').on('tap', function () {
                     // 初始化，layer的值是多少就是几级联动，此方法依赖mui.picker.js/.css mui.poppicker.js/.css
                var picker = new mui.PopPicker({
                    layer:3
                });
                    picker.setData(data)
                picker.pickers[0].setSelectedIndex(1);
                picker.pickers[1].setSelectedIndex(1);
                picker.show(function (items) {
                     // 返回选择的值items
                    // 进行选择框赋值
                    $('#showUserPicker').text(items[0].text)
                    areaid = items[0].value
                    // 进行重新加载商品列表 传入 店铺的id和位置的id
                    mmmcd(areaid, shopid)
                })
                })
            }
    })
    // 发送请求进行地址栏的渲染
        $.ajax({
            type: 'get',
            url: 'getgsshop',
            dataType: 'json',
            success: function (result) {
                // 获取数据进行循环，将里面的值取出来以联动可以读取的格式存到数组data中，
                var arr=result.result
                var data=[]
                for (var i = 0; i < arr.length; i++) {
                    var num={}
                    num.value = arr[i].shopId
                    num.text = arr[i].shopName
                    data.push(num)
                }

                // 点击地址栏进行选择地址，地址栏的内容个进行变化
                $('#showUserPicker1').on('tap', function () {
                    // 初始化，layer的值是多少就是几级联动，此方法依赖mui.picker.js/.css mui.poppicker.js/.css
                var picker = new mui.PopPicker({
                    layer: 3
                });
                    // 联动中选择的数组内容
                picker.setData(data)
                picker.pickers[0].setSelectedIndex(1);
                picker.pickers[1].setSelectedIndex(1);
                picker.show(function (items) {
                    // 返回选择的值items
                    // 进行选择框赋值
                    $('#showUserPicker1').text(items[0].text)
                    shopid = items[0].value
                    // 进行重新加载商品列表 传入 店铺的id和位置的id
                    mmmcd(areaid, shopid)
                })
                })
            }
    })
    // 调用渲染商品列表内容
    mmmcd(shopid,areaid)
    // 封装渲染商品列表
    function mmmcd(shopid,areaid) {
        // 如果不传入值就使用默认值0
        shopid = shopid||0
        areaid = areaid||0
        $.ajax({
            type: 'get',
            url: 'getgsproduct',
            data: { shopid: shopid, areaid: areaid },
            dataType: 'json',
            success: function (result) {
                var html=template('mmm_cdspitem',result)
                $('.centemn').html(html)
            }
        })
    }
    

})