require('../../../common/pkgs/button/button');
require('../css/activity');

$(function() {

    var main = {
        init: function(){
            $('.look-detail').on('touchend', function(e) {
                var $target = $(e.currentTarget);
                $target.closest('.tr').toggleClass('open')
            })
        }

    }
    main.init();
});