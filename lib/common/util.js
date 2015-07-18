module.exports = {
    parseQuery: function() {
        var query = {};
        var searchStr = window.location.search;
        if (searchStr.length) {
            var qstr = searchStr.substring(1);

            if (qstr) {
                var a = qstr.split('&');
            }
            for (var i = 0; i < a.length; i++) {
                var b = a[i].split('=');
                query[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
            }
        }
        return query;
    },
    getUrlFromParams: function(params) {
        var urlParams = this.parseQuery();
        urlParams = $.extend(urlParams, params);
        return '/search?' + $.param(urlParams)

    },
    Validation: {
        isDigit: function(s) {
            var patrn = /^[0-9]{1,20}$/;
            if (!patrn.exec(s)) {
                return false
            }
            return true
        },
        isPwd: function(s) {
            var patrn = /^(\w){6,20}$/;
            if (!patrn.exec(s)) {
                return false
            }
            return true
        },
        isSamePwd: function(pwd1, pw2){
            return pwd1 === pw2;
        },
        isMobile: function(s) {
            //var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/;
            var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;

            var patrn = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if (!patrn.exec(s)) return false
            return true
        }
    }
}