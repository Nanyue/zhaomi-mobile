var common = require('../../../lib/common/common.js');
var utils = common;
var zhaomi = common;

exports.init = function() {
    var btnMapper = {
        'approve': '<button class="z-btn btn-passed" data-optype="approve">通过</button>',
        'approve_cancel': '<button class="z-btn btn-passed" data-optype="approve_cancel">取消通过</button>',
        'deny': '<button class="z-btn btn-refuse" data-optype="deny">拒绝</button>',
        'deny_cancel': '<button class="z-btn btn-passed" data-optype="deny_cancel">取消拒绝</button>',
        'finish': '<button class="z-btn btn-passed" data-optype="finish">确认完成</button>',
        'finished': '<button class="z-btn btn-passed" data-optype="finished">已完成</button>',
        'denied': '<button class="z-btn btn-refuse">已谢绝</button>'
    }

    $('.mine-content').on('click', '.zui-btn', function() {
        var $applyItemCon = $(this).closest('.apply-item-content');
        var $applyItem = $applyItemCon.parent('.apply-item');
        var $container = $applyItem.closest('#mine-container');
        var opType = $(this).data('optype');
        var actionId = $container.data('action');
        var targetId = $applyItem.data('target');

        switch (opType) {
            case 'deny':
                post(opType, actionId, targetId, function() {
                    addBtns(['deny_cancel', 'denied']);
                });
                break;
            case 'deny_cancel':
                post(opType, actionId, targetId, function() {
                    addBtns(['approve', 'deny']);
                });
                break;
            case 'approve':
                post(opType, actionId, targetId, function() {
                    addBtns(['finish', 'approve_cancel']);
                });
                break;
            case 'approve_cancel':
                post(opType, actionId, targetId, function() {
                    addBtns(['approve', 'deny']);
                });
                break;
            case 'finish':
                post(opType, actionId, targetId, function() {
                    addBtns(['finished']);
                });
                break;
        }

        function removeBtns(opType) {
            if (btnMapper[opType]) {
                $applyItemCon.find('.zui-btn').remove();
            }
        }

        function addBtns(typeArr) {
            for (var i = 0, leni = typeArr.length; i < leni; i++) {
                $applyItemCon.append($(btnMapper[typeArr[i]]));
            }
        }

        function post(opType, actionId, target, callback) {
            zhaomi.postData('/mine/manage', {
                action: actionId,
                target: target,
                optype: opType,
            }, function(res) {
                var success = res && res.success;
                var data = res.data;

                if (res.success) {
                    removeBtns(opType);
                    callback();
                } else {
                    for (var i in data) {
                        utils.warn(data[i]);
                        break;
                    }
                    
                }
            });
        }
    })
}