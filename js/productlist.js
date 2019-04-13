$(function(){
    $('.dropdown-toggle').dropdown()

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    var categoryid = getParameter((location.search)).categoryid ||0;
    var pageid = getParameter((location.search)).pageid ||1;
     // console.log(pageid);


    var category = getParameter(decodeURI(location.search)).category;
    console.log(category);
    // 获取商品分类名称函数  比如电视
    function getCategory(){
        $.ajax({
            type: 'get',
            url: 'http://193.112.55.79:9090/api/getcategorybyid?categoryid=' + categoryid,
            dataType: 'json',
            success: function (result) {
                console.log(result);
                var html = template('categoryTemp',result)
                $('.nav').html(html)
            }
        }) 

    }
    getCategory()
    function categoryList(categoryid, pageid){
            $.ajax({
                url: 'http://193.112.55.79:9090/api/getproductlist',
                data:{
                    'categoryid':categoryid,
                    'pageid':pageid,
                },
                dataType: 'json',
                success: function (result) {
                    // console.log(result);
                    result.result.category = category
                    console.log(result);
                    console.log({ list: result.result});
                    var html = template('categoryListTemp',  {list:result.result});
                    $('.productList').html(html)


                     // 修改下拉菜单栏，使得下拉菜单栏的样式也跟随变化。pagenum是总页数
                    var pagenum = result.totalCount / result.pagesize;
                    // console.log(pagenum);
                    var va = $('.dropdown>ul>li>a').text()
                    console.log(va);
                    // 循环生成第？页/？页
                    for (var  i = 0; i < pagenum; i++) {
                                // 循环生成第几页的li标签
                        var li = '<li><a href="productlist.html?categoryid=' + categoryid + '&amp;pageid=' + (i+1) + '">第' + (i+1) + '/' + Math.ceil(pagenum) + '页</a></li>'
                        console.log(li);  //  得到一个标签   
                       // 并将li追加到ul中
                        $('.dropdown>ul').append(li)
                    }
                    $('#dLabel ').text('第' + pageid +'页')

                    //  设置上一页 下一页的逻辑
                       /*  if(pageid =1 ){
                            pageid=2;
                            pageid++;
                            $('.page-prev').attr('href','productlist.html?categoryid='+
                                categoryid + '&amp;pageid=' + (pageid - 1))
                        }else if(pageid>=pagenum){
                                pageid = pagenum-1;
                            $('.page-next').attr('href', 'productlist.html?categoryid=' +
                                categoryid + '&amp;pageid=' + (parseInt(pageid)+1) )
                        } */

                    $('.page-prev').on('tap',function(){
                        pageid--;
                        $('.page-prev').attr('href', 'productlist.html?categoryid=' +
                            categoryid + '&amp;pageid=' + pageid)
                        // 第一页的时候
                        if (pageid <= 1) {
                            pageid = 1;
                            $('.page-prev').attr('href', 'productlist.html?categoryid=' +
                                categoryid + '&amp;pageid=' + (pageid - 1))
                        }
                       
                    })
                    $('.page-next').on('tap',function(){
                            pageid++;
                        if (pageid >= pagenum) {
                            pageid = pagenum - 1; 
                            $('.page-next').attr('href', 'productlist.html?categoryid=' +
                                categoryid + '&amp;pageid=' + (parseInt(pageid) + 1)) 
                        }
                        $('.page-next').attr('href', 'productlist.html?categoryid=' +
                            categoryid + '&amp;pageid=' + (parseInt(pageid)))
                    })





                    
                         
                





                }

            })
    }
    categoryList(categoryid, pageid)
        








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