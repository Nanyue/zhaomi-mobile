require('../../../common/pkgs/button/button');
//require('../../../common/pkgs/progress/progress');
require('../../../lib/jquery-form/jquery.form');
require('../../../lib/jquery-form/validform');
require('../../../lib/jquery-form/validform.less');
require('../css/create');

var FastClick = require('../../../lib/fastclick/fastclick');
var common = require('../../../lib/common/common.js');
var ValidateForm = require('../../../lib/common/validateForm.js');

var city = require('../../../lib/city/city');
var utils = {
    warn: function(msg){
        alert(msg);
    }
}


$(function() {
    common.initNav();

    var $pageCreateAction = $('#pageCreateAction');

    var $createActionStep = $pageCreateAction.find('#createActionStep.step-01');

    var main = {
        init: function(){
            var that = this;
            this.initEvent();
            var $city = $('#city');
            city.init({
                targetBtn: $city,
                callback: function(value){
                    $city.val(value.join(" "));
                    ValidateForm.checkInput($city)
                }
            })
        },
        initEvent: function() {
            this.initCheckForm();
            this.initFormEvent();
            this.initDatePicker();
            this.initFastClick();
        },
        initFastClick: function(){
            var $selectWrapper = $('.select-wrapper')

            if ($selectWrapper.length) {
                FastClick.attach($selectWrapper[0]);
            }

        },
        initDatePicker: function() {
            var $appDate = $(".select-date-time");
            var that = this;

            $appDate.each(function(index, item) {
                var $item = $(item);
                var type = $item.data('time-type');
                initDatePicker($item, type);
            });

            function initDatePicker(obj, type){
                if (!type) {
                    type = 'datetime';
                }
                var obj = $(obj);
                if(!obj.length)return;
                var currYear = (new Date()).getFullYear();
                var opt={};
                opt.date = {
                    preset : 'date'
                };
                opt.datetime = {
                    preset : type
                };
                opt.time = {
                    preset : 'time'
                };
                opt.default = {
                    theme: 'android-ics light', //皮肤样式
                    display: 'bottom', //显示方式
                    mode: 'scroller', //日期选择模式
                    dateFormat: 'yyyy-mm-dd',
                    lang: 'zh',
                    showNow: true,
                    nowText: "今天",
                    startYear: currYear - 10, //开始年份
                    endYear: currYear + 10,//结束年份,
                    onSelect: function(e){
                        var endValue = $appDate.eq(1).val();
                        var startValue = $appDate.eq(0).val();
                        if (endValue && startValue>= endValue){
                            ValidateForm.showValidateResult($appDate.eq(1), '开始时间要大于结束时间');
                            return false;
                        } else {
                            ValidateForm.hideValidateResult($appDate.eq(1));
                        }
                        $('.select-date-time').removeClass('Validform_error');
                    }
                };
                var optDateTime = $.extend(opt['datetime'], opt['default']);
                obj.mobiscroll(optDateTime).datetime(optDateTime);
            }

        },

        initFormEvent: function(){
            var that = this;
            $createActionStep.on('blur', 'input, textarea', function(e) {
                var $this = $(e.currentTarget);
                ValidateForm.checkInput($this);
            });
            $createActionStep.submit(function() {

                $(this).ajaxSubmit({
                    beforeSubmit: function(formData, jqForm, options) {
                        return ValidateForm.checkForm($createActionStep);

                    },
                    dataType: 'json',
                    success: function(res) {
                        var success = res && res.success;
                        var data = res && res.data;

                        if (success) {
                            if (data.url) {
                                location.href = data.url;
                            }
                        } else {
                            for (var key in data) {
                                $('#' + key).removeClass('focus').addClass('err');
                                utils.warn(data[key]);
                                break;
                            }
                        }
                    },
                    error: function() {
                        console.error('擦了，创建活动提交失败~')
                    }
                });

                return false;
            })
        },
        initCheckForm: function() {
            var $selectWrapper =  $('.select-wrapper');
            $selectWrapper.on('click', '.select-activity-type', function(){
                $selectWrapper.find('.select-list-content').toggle();
            });

            $selectWrapper.on('click', '.select-list-content span', function(e){
                var $this = $(e.currentTarget);
                var text = $this.html();
                var value = $this.data('val');
                $selectWrapper.find('.select-activity-type').html(text);
                $('#action-type').val(value);
                $selectWrapper.find('.select-list-content').toggle();
            });
            //var $form=$("form#createActionStep").Validform({
            //    tiptype:3,
            //    label:".label",
            //    showAllError: false,
            //    datatype: {
            //        "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/,
            //        "image": function(gets,obj,curform,regxp){
            //            var reg1 = /\.jpg|png|git$/;
            //            if (reg1.test(gets)){
            //                return true;
            //            }
            //            return false;
            //        },
            //        'number': function(gets,obj,curform,regxp){
            //            var reg1 = /^\d+$/;
            //            if (reg1.test(gets)){
            //                return true;
            //            }
            //            return false;
            //        }
            //    }
            //});
            //
            ////$.Tipmsg.w["zh1-6"]="请输入1到6个中文字符！";
            //$form.tipmsg.w["zh1-6"]="请输入1到6个中文字符！";
            //
            //$form.addRule([
            //    {
            //        ele:"#name",
            //        datatype:"*2-20"
            //    },
            //    {
            //        ele:"#host",
            //        datatype:"*4-20"
            //    },
            //    {
            //        ele:"#city",
            //        datatype:"*1-50"
            //    },
            //
            //    {
            //        ele:"#other-local-msg",
            //        datatype:"*1-50"
            //    },
            //    {
            //        ele:"#desc",
            //        datatype:"*1-50000"
            //    },
            //    {
            //        ele:".select-date-time",
            //        nullmsg: "请选择日期",
            //        datatype:"*1-50000"
            //    },
            //    {
            //        ele:"#id_max_attend",
            //        nullmsg: "输入活动人数",
            //        errormsg: "活动人数非法",
            //        datatype:"number"
            //    },
            //    {
            //        ele:"#action-type",
            //        nullmsg: "请选择类型",
            //        datatype:"number"
            //    },
            //    {
            //        ele:"#id_reward",
            //        nullmsg: "请输入奖励金额",
            //        datatype:"number"
            //    },
            //    {
            //        ele:"#poster",
            //        nullmsg: "请选择一张图片",
            //        datatype:"image"
            //    }
            //]);

        }
    };

    main.init();


});