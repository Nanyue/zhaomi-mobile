require('../../../common/pkgs/button/button');
require('../css/list');
require('../../../lib/unslider/unslider');
require('../../../lib/event-swipe/event-swipe');
var city = require('../../../lib/city/city');
var libUtil = require('../../../lib/common/util');
$(function() {

    var main = {
        init: function(){
            var $banner = $('.banner');
            city.init();
            //this.initCateList()
            this.initBanner($banner);
            this.initCateList();


        },
        initLinkUrl: function($obj){
            var urlParams = libUtil.parseQuery()
            $obj.find('.tab-content-item').each(function(index, item){
                var typeName = $(item).find('ul').data('type-name');
                var aLinks = $(item).find('a');
                var type = urlParams[type];

                aLinks.each(function(index, linkItem) {
                    var $linkItem = $(linkItem);
                    urlParams[typeName] =  $linkItem.data('type');;
                    $linkItem.attr('href', window.location.href.split('?')[0]+'?'+$.param(urlParams))
                })
            });
        },
        initCateList: function() {
            var $cateList = $('#cateList');
            var isInitLink = false;
            var that = this;
            if ($cateList.length){
                $cateList.on('touchend', '.tab .tab-item', function(e) {
                    if (!isInitLink) {
                        that.initLinkUrl($cateList);
                    }

                    var $target = $(e.currentTarget);
                    var index = $cateList.find('.tab .tab-item').index($target);
                    var $tabContentItems = $cateList.find('.tab-content-item');
                    var hasActive = $target.hasClass('active');

                    $cateList.addClass('open');
                    $cateList.find('.active').removeClass('active');

                    if (hasActive){
                        hideCateList();
                    } else{
                        $target.addClass('active');
                        $tabContentItems.removeClass('active');
                        $tabContentItems.eq(index).addClass('active');
                    }

                    e.stopImmediatePropagation();

                }).on('touchend', '.tab-content', function() {
                    hideCateList();
                });
                $(document).on('touchend', function(){
                    hideCateList();
                });
                function hideCateList() {
                    setTimeout(function() {
                        $cateList.find('.active').removeClass('active');
                        $cateList.removeClass('open');
                    }, 50)
                }

            }

        },

        initBanner: function($banner) {
            $banner.unslider({
                dots: true
            });
        }

    };
    main.init();
});