
module.exports = {
    postData: function(url, data, successCallback, errorCallback) {

        var csrfToken = $('#csrf_token').val();
        $.ajax({
            url: url,
            type: 'post',
            data: $.extend(data, {csrfToken: csrfToken}), 
            success: successCallback,
            error: errorCallback
        })
    },
    initNav: function(){
        //var $nav = $('.nav');
        //if($nav.length){
        //    $nav.on('touchend', '.active', function(e){
        //        e.preventDefault();
        //
        //        window.history.back();
        //        return false;
        //    })
        //}
    },
    
}