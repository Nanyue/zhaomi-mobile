require('../../../common/pkgs/button/button');
require('../css/create');
var common = require('../../../lib/common/common.js');
var utils = common;

$(function() {

  var $form = $('#create-action-final');

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
})