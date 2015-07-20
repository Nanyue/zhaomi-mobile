$(function(){
    (function() {
        var $topTab = $('.tab-wrapper.top-tab');
        if ($topTab.length) {
            var $tab = $topTab.find('.tab');
            var topPosition = calcOuterWidth($tab);
            $tab.width(topPosition.sumWidth);
            $topTab.scrollLeft(topPosition.scrollLeftValue);
        }

        function calcOuterWidth($topTab) {
            var $tabItem = $topTab.find('.tab-item');
            var sumWidth = 0;
            var scrollLeftValue = 0;
            var indexActive = $tabItem.index($tabItem.filter('.active'));
            $tabItem.each(function(index, item) {
                var $item = $(item);
                var itemWidth = $item.width()  + (parseInt($item.css('margin-left')) +1) * 2 ;
                if (index < indexActive) {
                    scrollLeftValue += (itemWidth-20);
                }
                sumWidth += itemWidth;
            });
            return {
                sumWidth: sumWidth,
                scrollLeftValue: scrollLeftValue
            };
        }
    })();

    $('input').on('input', function() {
        $(this).closest('.input-wrapper').removeClass('error');
    })
});

var noop = function() {}
module.exports = {
    postData: function(url, data, successCallback, errorCallback) {

        var csrfToken = $('input[name=csrfmiddlewaretoken]').val();
        return $.ajax({
            url: url,
            type: 'post',
            data: $.extend(data, {csrfmiddlewaretoken: csrfToken}), 
            success: successCallback || noop,
            error: errorCallback || noop
        })
    },
    initTab: function() {


    },
    initNav: function() {
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

    warn: function(msg) {
        window.alert(msg);
    }
    
}