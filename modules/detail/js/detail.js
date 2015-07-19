require('../../../common/pkgs/button/button');
require('../css/detail');
require('../../../lib/jquery-form/jquery.form');
var common = require('../../../lib/common/common.js');
$(function() {
    var main = {
        init: function() {
            // this.initForm();
            this.initEvents();
        },
        initEvents: function() {
            $('#apply-form').submit(function() {
                var data = collectData();

                $(this).ajaxSubmit({
                    beforeSubmit: function() {
                        if ($('.content .item').length !== data.length) {
                            common.warn('有题目未作答！')
                            return false;
                        }
                    },
                    dataType: 'json',
                    data: {
                        answer: JSON.stringify(data)
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
                                // $('#' + key).removeClass('focus').addClass('err');
                                common.warn(data[key]);
                                break;
                            }
                        }
                    }
                })

                return false;
            })
        }

    }
    main.init();

});
// window.collectData = collectData;
function collectData() {
    var data = [];
    var RADIO = 'radio';
    var CHECKBOX = 'checkbox';
    var QUESTION = 'question';
    var UPLOAD = 'upload';

    $('.content .item').each(function(idx, elem) {
        var q, type , opts = [];
        var $detailItem = $(elem);
        var singleRet;
        var arr = [];
        var question;

        type = $detailItem.data('type');
        
        if (type === RADIO || type === CHECKBOX) {
            $detailItem.find('.result-item')
                .each(function(idx, elem) {
                    if ($(elem).find('input:checked').length) {
                        arr.push(idx);
                    }
                })

            if (arr.length) {
                data.push({
                    type: type,
                    result: arr.length === 1? arr[0] : arr
                })
            }
            
        } else if (type === QUESTION) {
            question = $detailItem.find('textarea').val();

            if (question) {
                data.push({
                    type: type,
                    result: question
                })
            }
        } else if (type === UPLOAD) {
            if ($detailItem.find('input').val()) {
                data.push({
                    type: type,
                    name: $detailItem.find('input').attr('name'),
                    result: 'whatever'
                })
            }
        }
    })

    return data;
}