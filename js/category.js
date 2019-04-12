$(function(){


  render();

// 获取大标题
  var titleId
  function render (){
    $.ajax({
        type:'get',
      url:'http://193.112.55.79:9090/api/getcategorytitle',
        dataType:'json',
        success:function(result){
          console.log(result);
          var html = template('headerTemp',result)
          $('#category > .panel-group').html(html)

          // 点击a连接的时候，将商品详细信息 渲染到页面
          $('#category > .panel-group > .panel-default > .panel-heading > h4 > a').on('tap',function(e){
             titleId = $(this).attr('data-titleId');
            console.log(titleId);
            
            // 获取列表内容
            $.ajax({
              type: 'get',
              url: "http://193.112.55.79:9090/api/getcategory?titleid=" + titleId,
              data: titleId,
              dataType: 'json',
              success: function (result) {
                console.log(result);
                /* 寻找点击元素的panel-body的标签 */
                var panelBody = $(e.target).parent().parent().parent().find(".panel-collapse").find('.panel-body');
                var listHtml = template('listTemp',result)
                panelBody.html(listHtml)
                
                var categoryList = panelBody.find('.row > div');

               


                var count = categoryList.length % 3 || 3;
                panelBody.find(".row > div:nth-last-child(-n+" + count + ")").css("border-bottom", "0");
               
              }
            })
           
          })
        }
    })
    // 手动激活折叠
    //$('.collapse').collapse() 
    $('.collapse').collapse('toggle')
  } 
})
