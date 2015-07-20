var common = require('../../../lib/common/common.js');

exports.init = function() {

    var $personalInfo = $('#personal-info-origin');
    var $modifiedInfo = $('#personal-info-modify');
    var $form = $('#personal-info-form');
    
    $personalInfo.on('click', '.edit', function() {
        $personalInfo.hide();
        $modifiedInfo.show();
    });

    
}