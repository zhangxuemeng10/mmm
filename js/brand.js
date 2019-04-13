$(function () {
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

    //为了获取地址栏中的中文字符串，所以需要用decodeURI()函数对其进行转码
    var brandtitleid = getParameter(decodeURI(location.search)).brandtitleid
    // console.log(brandtitleid);

    var brandTitle = getParameter(decodeURI(location.search)).brandTitle
//    console.log(brandTitle);



    $.ajax({
        type: 'get',
        url: 'http://193.112.55.79:9090/api/getbrand',
        data: {
            'brandtitleid': brandtitleid
        },
        success: function (result) {
            console.log(result);
            var html = template('brandRankTemp',result)
            $('.allbrands').html(html)
            var htmltitle = template('brandtitleTemp', { 'brandTitle': brandTitle})
            $('.brandtitle').html(htmltitle)

        }

    })




})