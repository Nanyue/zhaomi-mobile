require('../../../common/pkgs/button/button');
//require('../../../common/pkgs/progress/progress');
require('../../../lib/jquery-form/jquery.form');
require('../../../lib/jquery-form/validform');
require('../../../lib/jquery-form/validform.less');
require('../css/create');

var FastClick = require('../../../lib/fastclick/fastclick');
var common = require('../../../lib/common/common.js');
var ValidateForm = require('../../../lib/common/validateform.js');

var city = require('../../../lib/city/city');
var utils = common;

$(function() {
    //common.initNav();
    var $pageCreateAction = $('#pageCreateAction');

    var $createActionStep = $pageCreateAction.find('#createActionStep.step-01');

    var main = {
        init: function() {
            var that = this;
            this.initEvent();
            var $city = $('#prov_city');
            city.init({
                targetBtn: $city,
                callback: function(value) {
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
        initFastClick: function() {
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

            function initDatePicker(obj, type) {
                if (!type) {
                    type = 'datetime';
                }
                var obj = $(obj);
                if (!obj.length) {
                    return;
                }
                var currYear = (new Date()).getFullYear();
                var opt = {};
                opt.date = {
                    preset: 'date'
                };
                opt.datetime = {
                    preset: type
                };
                opt.time = {
                    preset: 'time'
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
                    onSelect: function(e) {
                        var endValue = $appDate.eq(1).val();
                        var startValue = $appDate.eq(0).val();
                        if (endValue && startValue >= endValue) {
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

        initFormEvent: function() {
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
                                // $('#' + key).removeClass('focus').addClass('err');
                                common.warn(data[key]);
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

            $('#publish').click(function() {
                $form.ajaxForm({
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
                                // $('#' + key).removeClass('focus').addClass('err');
                                common.warn(data[key]);
                                break;
                            }
                        }
                    }
                })

                $form.submit();
            });

            $('#save').click(function() {
                var actionUrl = $(this).data('action');

                $form.ajaxForm({
                    url: actionUrl,
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
                                // $('#' + key).removeClass('focus').addClass('err');
                                common.warn(data[key]);
                                break;
                            }
                        }
                    }
                })

                $form.submit();
            });
        },
        initCheckForm: function() {
            var $selectWrapper = $('.select-wrapper');
            $selectWrapper.on('click', '.select-activity-type', function() {
                $selectWrapper.find('.select-list-content').toggle();
            });

            $selectWrapper.on('click', '.select-list-content span', function(e) {
                var $this = $(e.currentTarget);
                var text = $this.html();
                var value = $this.data('val');
                $selectWrapper.find('.select-activity-type').html(text);
                $('#action-type').val(value);
                $selectWrapper.find('.select-list-content').toggle();
            });
        }
    };

    main.init();

    var $form = $('#create-action-final');
    $('#create-action-first').submit(function() {
        var name = $('#name').val();
        var host = $('#host').val();
        var prov_city = $('#prov_city').val();
        var prov = prov_city.split(' ')[0];
        var city = prov_city.split(' ')[1];
        var addr = $('#other-local-msg').val();
        var durationDay = $('#id_day').val();
        var durationHour = $('#id_hour').val();
        var durationMin = $('#id_minute').val();
        var maxAttendee = $('#id_max_attend').val();
        var bonus = $('#id_reward').val();
        var desc = $('#desc').val();
        var actionType = $('#action-type').val();
        var poster = $('#poster').val();

        $(this).ajaxSubmit({
            beforeSubmit: function(formData, jqForm, options) {
                if (!name) {
                    utils.warn('请填写活动名称!');
                    return false;
                }

                if (!host) {
                    utils.warn('请填写主办方!');
                    return false;
                }

                if (!prov_city) {
                    utils.warn('请选择省份和城市!');
                    return false;
                }

                

                if (!addr) {
                    utils.warn('请填写具体的地址!');
                    return false;
                }

                if (durationDay === '') {
                    utils.warn('请填写持续天数!');
                    return false;
                }

                if (+durationDay < 0) {
                    utils.warn('天数应该大于等于0天!');
                    return false;
                }

                if (durationHour === '') {
                    utils.warn('请填写持续小时数!');
                    return false;
                }

                if (+durationHour < 0 || +durationHour > 23) {
                    utils.warn('小时数不合法!');
                    return false;
                }

                if (durationMin === '') {
                    utils.warn('请填写持续分钟数!');
                    return false;
                }

                if (+durationMin < 0 || +durationMin > 59) {
                    utils.warn('分钟数不合法!');
                    return false;
                }

                if (maxAttendee === '') {
                    utils.warn('请填写持续分钟数!');
                    return false;
                }

                if (maxAttendee <= 0) {
                    utils.warn('参与人数应该大于0!');
                    return false;
                }

                if (bonus < 0) {
                    utils.warn('奖励金额值不合法!');
                    return false;
                }

                if (!desc) {
                    utils.warn('请填写活动简介!');
                    return false;
                }

                if (actionType === '') {
                    utils.warn('请选择活动类型!');
                    return false;
                }

                if (/create/.test(location.href)) {
                    if (!poster) {
                        utils.warn('请选择活动海报!');
                        return false;
                    }

                    if (!/\.(jpg|png)$/.test(poster)) {
                        utils.warn('活动海报海报仅支持png/jpg格式的文件!');
                        return false;
                    }
                }
            },
            dataType: 'json',
            data: {
                province: prov,
                city: city
            },
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

    $('#publish').click(function() {
        $form.ajaxForm({
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
                        // $('#' + key).removeClass('focus').addClass('err');
                        utils.warn(data[key]);
                        break;
                    }
                }
            }
        })

        $form.submit();
    });

    $('#save').click(function() {
        var actionUrl = $(this).data('action');

        $form.ajaxForm({
            url: actionUrl,
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
                        // $('#' + key).removeClass('focus').addClass('err');
                        utils.warn(data[key]);
                        break;
                    }
                }
            }
        })

        $form.submit();
    });
});