require('../../../common/pkgs/button/button');
require('../css/register');
var common = require('../../../lib/common/common.js');
var utils = common;
var zhaomi = common;

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
            var $appDate = $("#bday");

            if ($appDate.length) {
                var currYear = (new Date()).getFullYear();
                var opt = {};
                opt.date = {preset: 'date'};
                opt.datetime = {preset: 'datetime'};
                opt.time = {preset: 'time'};
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
            if ($pageRegister.length) {
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

    // 注册第一步
    $('#register-form').submit(function() {

        var username = $('#username').val();
        var pwd = $('#pwd').val();
        var confirmedPwd = $('#pwd-confirm').val();

        $(this).ajaxSubmit({
            beforeSubmit: function(formData, jqForm, options) {
                if (!username) {
                    utils.warn('请填写邮箱/用户名!');
                    return false;
                }

                if (!pwd) {
                    utils.warn('请填写密码!');
                    return false;
                }

                if (pwd !== confirmedPwd) {
                    utils.warn('两次密码输入不相同!');
                    return false;
                }
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
                        $('.input-wrapper').removeClass('error');
                        $('#' + key).closest('.input-wrapper').addClass('error');
                        utils.warn(data[key]);
                        break;
                    }
                }
            }
        });

        return false;
    });

    $('input').focus(function() {
        $(this).parent().removeClass('err').addClass('focus');
    }).blur(function() {
        $(this).parent().removeClass('focus');
    })
    
    // 第二步注册
    $('#sendcode').click(function() {
        var mobile = $('#mobile').val();

        if (!mobile) {
            utils.warn('请先填写电话号码！');
            return false;
        }

        zhaomi.postData('/sendcode', {
            mobile: mobile
        }, function() {
            utils.warn('已发送验证码!');
        })
    })

    // 注册第二步
    $('#register').submit(function() {
        var code = $('#verifycode').val();
        var name = $('#name').val();
        var gender = $('#gender').val();
        var bday = $('#bday').val();

        $(this).ajaxSubmit({
            beforeSubmit: function(formData, jqForm, options) {
                if (!code) {
                    utils.warn('请填写验证码!');
                    return false;
                }

                if (!name) {
                    utils.warn('请填写用户名/公司名!');
                    return false;
                }

                if (!gender) {
                    utils.warn('请选择性别!');
                    return false;
                }

                if (!bday) {
                    utils.warn('请选择生日!');
                    return false;
                }
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
                        $('.input-wrapper').removeClass('error');
                        $('#' + key).closest('.input-wrapper').addClass('error');
                        utils.warn(data[key]);
                        break;
                    }
                }
            }
        });

        return false;
    })
    
    // 重置密码
    $('#resetForm').submit(function() {
        
        var mobile = $('#mobile').val();
        var code = $('#verifycode').val();
        var pwd = $('#pwd').val();
        var pwdConfirmed = $('#pwd-confirm').val();

        $(this).ajaxSubmit({
            beforeSubmit: function(formData, jqForm, options) {
                if (!mobile) {
                    utils.warn('请填写手机号!');
                    return false;
                }

                if (!code) {
                    utils.warn('请填写验证码!');
                    return false;
                }

                if (!pwd) {
                    utils.warn('请填写密码!');
                    return false;
                }

                if (!pwdConfirmed) {
                    utils.warn('请填写确认密码!');
                    return false;
                }

                if (pwd !== pwdConfirmed) {
                    utils.warn('请确保两次填写的密码一致!');
                    return false;
                }
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
                        $('.input-wrapper').removeClass('error');
                        $('#' + key).closest('.input-wrapper').addClass('error');
                        utils.warn(data[key]);
                        break;
                    }
                }
            }
            
        }); 
        return false;
    })
});