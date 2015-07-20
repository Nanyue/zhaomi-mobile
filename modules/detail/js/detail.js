require('../../../common/pkgs/button/button');
require('../css/detail');
require('../../../lib/jquery-form/jquery.form');
require('../../../lib/jquery-form/validform');
require('../../../lib/jquery-form/validform.less');
var common = require('../../../lib/common/common.js');
var ValidateForm = require('../../../lib/common/validateform.js');
$(function() {
    var main = {
        init: function() {
            this.initForm();
        },
        initForm: function() {

            var $formCondition = this.$formCondition = $('#formCondition');

            $formCondition.on('blur', 'input, textarea', function(e) {
                var $this = $(e.currentTarget);
                ValidateForm.checkInput($this);
            });

            $formCondition.on('change', 'input[type=radio], input[type=checkbox]', function(e) {
                var $this = $(e.currentTarget);
                ValidateForm.checkInput($this);
            });
            $formCondition.ajaxForm({
                beforeSubmit: function() {
                    return ValidateForm.checkForm($formCondition);
                }
            });
        }
    }
    main.init();
});
