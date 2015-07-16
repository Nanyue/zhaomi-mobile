require('../../../common/pkgs/button/button');
require('../css/detail');
require('../../../lib/jquery-form/jquery.form');
require('../../../lib/jquery-form/validform');
require('../../../lib/jquery-form/validform.less');

$(function() {
    var main = {
        init: function() {
            this.initForm();
        },
        initForm: function() {
            var $formCondition = this.$formCondition = $('#formCondition');
            //$formCondition.on('touchend', '.btn-submit', function() {
            //    debugger;
            //
            //});
            $formCondition.Validform({
                tiptype: function(msg, o, cssControl) {
                    //msg：提示信息;
                    //o:{
                    // obj:*,  // obj指向的是当前验证的表单元素（或表单对象）
                    // type:*, // type指示提示的状态，值为1、2、3、4，  1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态,
                    // curform:* //  curform为当前form对象;
                    // },

                    //cssControl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
                    if(!o.obj.is("form")) {//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
                        var objtip= o.obj.closest(".question").find(".Validform_checktip");
                        console.log( o.type);
                        cssControl(objtip, o.type);
                        if (o.tip != 2){
                            objtip.text(msg);
                        }
                    }

                },
                showAllError: true,
                datatype:{
                    "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/
                }

            });
            $formCondition.ajaxForm( {
                beforeSubmit: this.validateForm
            });
            //function validateForm() {
            //    console.log('abc');
            //}
        },
        validateForm: function(arr, $form, options) {
             var hasEmpty = false;
             $('.question-result').find('.zui-radio')
             return hasEmpty;
        }

    }
    main.init();

});

function abcd() {
    var voidValue = {//策略者
        Config : {},//默认配置规则
        Message : {//未通过验证时输出的信息
            isEmpty : 'EMPTY',
            isPhone : 'NOTPHONE',
            isBoolean : 'NOTBOOLEAN',
            isLength : 'BIGGER THAN MAX',
            isUndefined : 'UNDEFINED',
            isNumber : 'NOTNUMBER'
        },
        Rules : {//自定义规则，所有的规则在里面逐步添加
            isEmpty : function(v) {
                return v != '';
            },
            isUndefined :  function(v) {
                return typeof v === 'undefined';
            },
            isPhone : function(v) {
                return /^1[3|4|5|8]\d{9}$/.test(v);
            },
            isBoolean : function(v) {
                return Object.prototype.toString.call(v) === '[object Boolean]';
            },
            isNumber : function(v) {
                return Object.prototype.toString.call(v) === '[object Number]';
            },
            isName :  function(v) {
                return /^[\u4E00-\u9FFF]{1,6}$/.test(v);
            },
            isAdress : function(v) {
                return this.isEmpty(v) && v.length<200;
            }
        },
        vaild : function(data, callback) {//入口函数，传入数据源
            var ruleFun;
            var message;
            for (var i in data) {//循环传入的对象
                if (!this.Config[i]) continue;
                if (this.Config[i].ruleFun) {
                    //判断是否有用户自定义输出的字符串，这里其实是经常用到的，比如某个字段没有通过验证需要怎么样提示，
                    // 以及提示的文字，在验证表单是尤其重要！
                    ruleFun = this.Rules[this.Config[i]['ruleFun']] || this.Config[i]['ruleFun'];
                    message = this.Config[i]['tip'];
                } else {
                    ruleFun = this.Rules[this.Config[i]] || this.Config[i];
                    message = this.Message[this.Config[i]];
                }
                var t = Object.prototype.toString.call(ruleFun);//这里我们判断是需要执行验证函数还是比对数值大小
                if(t === '[object Function]') {
                    if(!ruleFun(data[i])) {
                        console.warn(message);
                        return false;
                    }
                }else if(t === '[object Number]') {
                    if(!/\d+/.test(data[i]) || parseInt(data[i]) >= ruleFun) {
                        console.warn(message);
                        return false;
                    }
                }
            }
            return data;//如果都匹配到了，可以输出完整的数据源对象。
        }
    };
}