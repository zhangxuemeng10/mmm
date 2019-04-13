$(function () {
   
    //  获取id号
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
     // location.search:url中?及?后面的内容
     var id =getParameter(location.search).productid
     console.log(id);
     
      function commodity() {
          $.ajax({
              type: 'get',
              url: "http://193.112.55.79:9090/api/getmoneyctrlproduct",
              data: {'productid': id },
              dataType: 'json',
              success: function (result) {
                  console.log(result);
                 var html = template('detailsTmpe', result)
                //  console.log(html);
                 $('.m_content').html(html)
                 
              }
          })
      }
        commodity()
})