require('../../../common/pkgs/button/button');
require('../css/mine');
var common = require('../../../lib/common/common.js');

var zhaomi = common;

$(function() {

    var $list = $('.activity-lists');
    var $form = $('#personal-info-form');
    ({
        init: function() {
            this.$pageMine = $('#pageMine');
            var $userCenterPage = this.$userCenterPage = this.$pageMine.find('#userCenterPage');
            if ($userCenterPage.length) {
                this.isUserCenterPage = true;
            }
            this.initEvent();
            this.initDatePicker();

        },
        initDatePicker: function() {
            var $target = $('.age .edit-input');
            var opt={};
            opt.date = {preset : 'date'};
            opt.datetime = {preset : 'datetime'};
            opt.time = {preset : 'time'};
            opt.default = {
                theme: 'android-ics light', //皮肤样式
                display: 'modal', //显示方式
                mode: 'scroller', //日期选择模式
                lang: 'zh',
                showNow: true,
                nowText: "今天"
            };
            $target.mobiscroll($.extend(opt['date'], opt['default']));
        },
        initEvent: function() {
            var that = this;
            if (this.isUserCenterPage) {
                this.$userCenterPage.on('click', '.btn-edit', function(e) {
                    var $target = $(e.currentTarget);
                    var $userMsg = $target.closest('.content');
                    $userMsg.addClass('editing');
                });
                this.$userCenterPage.on('click', '.btn-save', function(e) {
                    // var $target = $(e.currentTarget);

                    
                });

                this.$userCenterPage.on('click', '.editing .age .edit-input', function(e) {
                    var $target = $(e.currentTarget);
                });

                this.$userCenterPage.on('input', '.edit-item input', function(e) {
                    var $target = $(e.currentTarget);
                    var value = $target.val();
                    var maxNumber = 10;
                    if (value.length > maxNumber) {
                        $target.val(value.slice(0, maxNumber))
                    }
                    var $editItem = $target.closest('.edit-item');
                    $editItem.find('.display-text').html($target.val())
                });

                this.$userCenterPage.on('change', '.upload-image', function(e) {
                    var $target = $(e.currentTarget);
                });
            }

            // 活动信息中的各种操作
            $list.on('click', '.activity-list-item .title', function() {
                var $actionCard = $(this).closest('.activity-list-item');
                var shareLink = $actionCard.data('link');
                var detailLink = $actionCard.data('detail');

                if (shareLink || detailLink) {
                    window.open(shareLink || detailLink, '_blank');
                }
            }).on('click', '.activity-list-item .edit', function() {
                var action = $(this).data('action');
                if (action) {
                    window.location.href = action;    
                }
            }).on('click', '.activity-list-item .duplicate, .activity-list-item .delete', function() {
                var action = $(this).data('action');
                if (action) {
                    zhaomi.postData(action, {}, function(res) {
                        var success = res && res.success;
                        var data = res && res.data;
                        
                        if (success) {
                            if (data.url) {
                                location.href = data.url;  
                            } 
                        }
                    });
                }
            }).on('click', '.activity-list-item .publish', function() {
                var $actionCard = $(this).closest('.activity-list-item');
                var actionId = $actionCard.data('id');

                if (actionId) {
                    zhaomi.postData('/action/' + actionId + '/publish', {
                        from: 'start'
                    }, function(res) {
                        var success = res && res.success;

                        if (success) {
                            location.href = '/mine/start';
                        }
                    });    
                }
                
            }).on('click', '.activity-list-item .apply-forbidden', function() {
                var $actionCard = $(this).closest('.activity-list-item');
                var actionId = $actionCard.data('id');

                if (actionId) {
                    zhaomi.postData('/action/' + actionId + '/stop', {
                        
                    }, function(res) {
                        var success = res && res.success;

                        if (success) {
                            location.href = '/mine/start';
                        }
                    });    
                }
            }).on('click', '.activity-list-item .apply-resume', function() {
                var $actionCard = $(this).closest('.activity-list-item');
                var actionId = $actionCard.data('id');

                if (actionId) {
                    zhaomi.postData('/action/' + actionId + '/start', {
                        
                    }, function(res) {
                        var success = res && res.success;

                        if (success) {
                            location.href = '/mine/start';
                        }
                    });    
                }
            }).on('click', '.activity-list-item .unapply', function() {
                var $actionCard = $(this).closest('.activity-list-item');
                var actionId = $actionCard.data('id');

                if (actionId) {
                    zhaomi.postData('/action/' + actionId + '/unapply', {
                        
                    }, function(res) {
                        var success = res && res.success;

                        if (success) {
                            location.href = '/mine/apply';
                        }
                    });    
                }
            });

            $form.submit(function() {

                var name = $('#info-name').val();
                var mobile = $('#info-mobile').val();
                var gender = $('#info-gender').val();
                var bday = $('#info-bday').val();

                $(this).ajaxSubmit({
                    beforeSubmit: function(formData, jqForm, options) {
                        
                        if (!name) {
                            utils.warn('请填写姓名!');
                            return false;
                        }

                        // if (!mobile) {
                        //     utils.warn('请填写手机号!');
                        //     return false;
                        // }

                        if (!gender || (gender !== '男' && gender !== '女')) {
                            utils.warn('请正确填写性别!');
                            return false;
                        }

                        if (!bday || !/\d{4}\-\d{2}-\d{2}/.test(bday)) {
                            utils.warn('请选择生日，格式为1990-01-01!');
                            return false;
                        }
                    },
                    dataType: 'json',
                    success: function(res) {
                        var success = res && res.success;
                        var data = res && res.data;
                        
                        if (success) {
                            
                            var $userMsg = $('.content');
                            $userMsg.removeClass('editing');

                            for (var key in data) {
                                if (key === 'portrait' && data[key]) {
                                    $personalInfo.find('#portrait-origin img')
                                        .attr('src', data[key]);
                                } else {
                                    $personalInfo.find('#' + key).text(data[key]);    
                                }
                            }
                        } else {
                            for (var key in data) {
                                utils.warn(data[key]);
                                break;
                            }
                        }
                    }
                });

                return false;
            });
        }
    }.init());

});