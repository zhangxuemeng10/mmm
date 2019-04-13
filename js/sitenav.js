
$(function () {
    console.log(32423);
    
        $.ajax({
            type: 'get',
            url: "http://193.112.55.79:9090/api/getsitenav",
            dataType: "json",
            success: function (reslut) {
                console.log(reslut);

                var html = template('mallWebsiteTemp', reslut);
                $('.mallWebsite').html(html);
            }
        })
  
})