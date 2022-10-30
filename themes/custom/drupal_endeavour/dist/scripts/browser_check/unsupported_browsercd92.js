/**
 * @file
 */

(function ($) {

  /**
   * Define Drupal behaviours
   */
  Drupal.behaviors.unsupported_Browser = {
    attach: function (context, settings) {

      if (!$.cookie("unsupoorted_browser_msg_shown")) {
        if ($(document.body).hasClass('ie11')) {
          if (!$("#unsupported-browser-modal").length) {
            $(document.body).addClass('unsupported-browser');
            $.cookie("unsupoorted_browser_msg_shown", 1, {expires: 1});

            var main_content = drupalSettings.drupal_endeavour.unsupportedBrowser.maincontent;

            var $makeModal = $('<div id="unsupported-browser-modal">' + main_content + '</div>').appendTo('body');
            Drupal.dialog($makeModal, {
              width: '700',
            }).showModal();
          }
          $(document).on("click", ".alt-modal-close, .alt-modal-close-link" , function(e) {
            e.preventDefault();
            $(this).closest('.ui-dialog').find('button.ui-dialog-titlebar-close').trigger("click");
          });
        }
      }

    }
  };

}(jQuery, Drupal));
