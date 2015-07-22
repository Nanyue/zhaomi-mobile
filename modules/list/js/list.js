require('../../../common/pkgs/button/button');
require('../css/list');
require('../../../lib/unslider/unslider');
require('../../../lib/event-swipe/event-swipe');
var city = require('../../../lib/city/city');
var libUtil = require('../../../lib/common/util');
var common = require('../../../lib/common/common.js');

$(function() {

    var $list = $('.activity-lists');

    var main = {
        init: function() {
            var $banner = $('.banner');
            city.init();
            //this.initCateList()
            this.initBanner($banner);
            this.initCateList();
            this.initEvents();
        },
        initLinkUrl: function($obj) {

            $obj.on('click', '.tab-content-item a', function() {
                var typeName = $(this).closest('ul').data('type-name');
                var newParams = {};
                newParams[typeName] = $(this).data('type');

                common.goTo(newParams);
            })
        },
        initCateList: function() {
            var $cateList = $('#cateList');
            var isInitLink = false;
            var that = this;
            if ($cateList.length) {
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

                    if (hasActive) {
                        hideCateList();
                    } else {
                        $target.addClass('active');
                        $tabContentItems.removeClass('active');
                        $tabContentItems.eq(index).addClass('active');
                    }

                    e.stopImmediatePropagation();

                }).on('touchend', '.tab-content', function() {
                    hideCateList();
                });
                $(document).on('touchend', function() {
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
            $banner.height($(window).width() * 5 / 8);
            $banner.unslider({
                dots: true
            });
        },

        initEvents: function() {
            $list.on('tap', '.activity-list-item', function() {
                var detailUrl = $(this).data('detail');

                if (detailUrl) {
                    location.href = detailUrl;
                }
            })
        }

    };
    main.init();
});