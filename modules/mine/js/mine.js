require('../../../common/pkgs/button/button');
require('../css/mine');

$(function() {

    ({
        init: function() {
            this.$pageMine = $('#pageMine');
            var $userCenterPage = this.$userCenterPage =  this.$pageMine.find('#userCenterPage');
            if ($userCenterPage.length) {
                this.isUserCenterPage = true;
            }
            this.initEvent()
        },
        initEvent: function(){
            if (this.isUserCenterPage) {
                this.$userCenterPage.on('click', '.btn-edit', function(e) {
                    var $target = $(e.currentTarget);
                    var $userMsg = $target.closest('.content');
                    $userMsg.addClass('editing');
                });
                this.$userCenterPage.on('click', '.btn-save', function(e) {
                    var $target = $(e.currentTarget);
                    var $userMsg = $target.closest('.content');
                    $userMsg.removeClass('editing');
                });

                this.$userCenterPage.on('input', '.edit-item input', function(e) {
                    var $target = $(e.currentTarget);
                    var value = $target.val();
                    var maxNumber = 10;
                    if (value.length > maxNumber ) {
                        $target.val(value.slice(0, maxNumber))
                    }
                    var $editItem = $target.closest('.edit-item');
                    $editItem.find('.display-text').html($target.val())
                });

                this.$userCenterPage.on('change', '.upload-image', function(e) {
                    var $target = $(e.currentTarget);
                    debugger;

                });
            }
        }
    }.init());
    $('#pageMine')

});