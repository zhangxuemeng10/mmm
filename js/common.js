$(function () {
  // 默认情况下，mui不响应click事件。
  mui('body').on('tap', 'a', function (e) {
    e.preventDefault();
    /* 最外层页面跳转 */
    window.top.location.href = this.href;
  })

  // 解决a标签无法跳转问题
  mui('body').on('tap', 'a', function () {
    window.top.location.href = this.href;
  });
  // 进行路径拼接
  const baseURL = 'http://193.112.55.79:9090/api/'
  // 添加zepto拦截器：它的作用是可以让每个ajax请求都经过这个函数进行处理
  // beforeSend：每次发送ajax请求都必须经过的处理函数
  $.ajaxSettings.beforeSend = function (xhr, obj) {
    $('body').addClass('loadding')
    // 在这边我们想拼接url
    // console.log(obj)
    // obj.url:就是当前发送请求的url
    obj.url = baseURL + obj.url
    
  }

  // complete：请求完成时触发
  $.ajaxSettings.complete = function () {
    // 在这边我们想拼接url
    // console.log(456)
    $('body').removeClass('loadding')
  }


  // 动态扩展zepto。比如goodlist与goodsdetail页面需要用到url地址栏的参数。
  //  extend的作用是，如果相同的属性，覆盖。如果是不同的属性，就追加
  $.extend($, {
    getParameter: function (url) {
      var obj = {};
      url = url.substring(1); //获取地址栏问号，后面的内容
      //  &符号 拆分
      var arr = url.split('&') // ['cid=5', 'name=jack']
      //进行第二次拆分
      for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].split('=')  //['cid',5] ['name','jack']
        obj[temp[0]] = temp[1] //obj[cid] = 5
      }
      return obj;



    }
  })




})