$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    var productid= getParameter(location.search).productid  || 1;
    var category = getParameter(decodeURI(location.search)).category 

    // console.log(productid);
    $.ajax({
        url: 'http://193.112.55.79:9090/api/getproduct',
        data: { "productid": productid},
        dataType:'json',
        success:function(result){
            result.result.category = category;
                console.log(result);
            var html = template('getproductTemp',result)      
            $('.product_bijia').html(html)
            var navhtml = template('navTemp', result) 
            $('.nav').html(navhtml)
        }
    })




    $.ajax({
        url: 'http://193.112.55.79:9090/api/getproductcom',
        data: { "productid": productid },
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = template('comTemp', result)
            $('.product_com_list').html(html)
        }
    })


    // 获取url地址栏的后面id函数
    function getParameter(url) {
        var obj = {}
        // location.search:url中?及?后面的内容
        url = url.substring(1) //cid=5&name=jack
        // 先按&拆分
        var arr = url.split('&') //['cid=5','name=jack']
        // 遍历进行第二次拆分
        for (var i = 0; i < arr.length; i++) {
            var temp = arr[i].split('=') //['cid',5]
            obj[temp[0]] = temp[1] // obj['cid'] = 5
        }
        return obj
    }
    getParameter(location.search)
    // decodeURI 当地址栏有中文的时候用
    // console.log(getParameter(decodeURI(location.search)).category);

})