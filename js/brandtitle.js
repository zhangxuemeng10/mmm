
$(function() {

        $.ajax({
            url: "http://193.112.55.79:9090/api/getbrandtitle",
            success: function(result) {
                console.log(result);
                
                var html = template("brandTitleTmp", result);
                $('.allbrands').html(html);
            }
        })
   
});
