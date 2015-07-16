require('../../../common/pkgs/button/button');
require('../css/register');

$(function() {
    var $pageRegister = $('#pageRegister');
    var $pageLogin = $('#pageLogin');
    $pageRegister.show();
    var main = {
        init: function() {
            this.initEvent();
            this.initDatePicker()
        },
        initDatePicker: function() {
            var $appDate = $("#appDate");

            if ($appDate.length){
                var currYear = (new Date()).getFullYear();
                var opt={};
                opt.date = {preset : 'date'};
                opt.datetime = {preset : 'datetime'};
                opt.time = {preset : 'time'};
                opt.default = {
                    theme: 'android-ics light', //皮肤样式
                    display: 'modal', //显示方式
                    mode: 'scroller', //日期选择模式
                    dateFormat: 'yyyy-mm-dd',
                    lang: 'zh',
                    showNow: true,
                    nowText: "",
                    startYear: currYear - 70, //开始年份
                    endYear: currYear - 10 //结束年份
                };

                $appDate.mobiscroll($.extend(opt['date'], opt['default']));
            }

        },
        initEvent: function() {
            if ($pageRegister.length){
                this.initInputEvent($pageRegister);

            } else if ($pageLogin.length) {
                this.initInputEvent($pageLogin);

            }
        },
        initInputEvent: function(obj) {
            obj.on('focus', '.input-wrapper input', function(e) {
                var $target = $(e.currentTarget);
                var $inputWrapper = $target.closest('.input-wrapper');
                $inputWrapper.addClass('focus');
            }).on('blur', '.input-wrapper input', function(e) {
                var $target = $(e.currentTarget);
                var $inputWrapper = $target.closest('.input-wrapper');
                $inputWrapper.removeClass('focus');
            });
        }
    };
    main.init();


});