
module.exports = {
    parseQuery: function(){
        var query = {};
        var searchStr = window.location.search;
        if (searchStr.length){
            var qstr = searchStr.substring(1);

            if (qstr)
                var a = qstr.split('&');
            for (var i = 0; i < a.length; i++)
            {
                var b = a[i].split('=');
                query[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
            }
        }
        return query;
    },
    getUrlFormParams: function(params){
        var urlParams = this.parseQuery();
        urlParams = $.extend(urlParams, params);
        var host = window.location.host;
        var baseUrl = window.location.pathname;
        return   host + baseUrl +'?'+ $.param(urlParams)

    }
}