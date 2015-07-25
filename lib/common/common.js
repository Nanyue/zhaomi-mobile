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
exports.postData = function(url, data, successCallback, errorCallback) {

    var csrfToken = $('input[name=csrfmiddlewaretoken]').val();
    return $.ajax({
        url: url,
        type: 'post',
        data: $.extend(data, {csrfmiddlewaretoken: csrfToken}), 
        success: successCallback || noop,
        error: errorCallback || noop
    })
}
exports.warn = function(msg) {
    window.alert(msg);
}

// 根据传入参数拼装url，并跳转到该url
exports.goTo = function(params, without) {
    var oldParams = without ? {} : this.getUrlParameter();
    var newParams = $.extend({}, oldParams, params);

    location.href = '/search?' + $.param(newParams);
}

exports.getUrlParameter = function() {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    var pairs;
    var ret = {};
    for (var i = 0; i < sURLVariables.length; i++) {
        var pairs = sURLVariables[i].split('=');
        if (pairs[0]) {
            ret[pairs[0]] = decodeURIComponent(pairs[1]);
        }
    }
    return ret;
}

exports.getJSONPUrl = function(from, size) {
            
    var params = this.getUrlParameter();
    var newParams = {
        from: from,
        size: size
    };
    var queryStr = $.param($.extend({}, params, newParams))
    
    var rPrefix = /(https?:\/\/[^?]+)/;
    var matches, prefix;

    if (matches = rPrefix.exec(location.href)) {
        prefix = matches[1];
    }

    return prefix + '?' + queryStr;
}