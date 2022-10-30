/**
 * @file
 */

(function ($) {

  /**
   * Define Drupal behaviours
   */
  Drupal.behaviors.global_banners = {
    attach: function (context, settings) {

      // Ensure we run once
      if (context !== document) {
        return;
      }

      // On mobile, hide banner if burger menu clicked;
      // alsohandle close button click
      $("header #toggle-icon, #global-banner-close").click(function(e) {
        $("#global-banner-content").remove();
        $("body").removeClass("has-global-callout");
      });

      // On mobile, hide banner if burger menu clicked
      $("header #global-banner-close").click(function(e) {
        $("#global-banner-content").remove();
        $("body").removeClass("has-global-callout");
      });

      // Determine if banner should display or not
      $("#persistence-msg").click(function(e){
        var banner_persistence_days = drupalSettings.drupal_endeavour.global_banners.banner_persistence_days;
        if (banner_persistence_days === undefined || banner_persistence_days === null || isNaN(banner_persistence_days)) {
          var banner_persistence_days = 7;
        }
        var banner_persistence_days_date = new Date();
        banner_persistence_days_date.setTime(banner_persistence_days_date.getTime() + banner_persistence_days * 24 * 60 * 60 * 1000);
        $.cookie("global_banner_persistence_msg_clicked", 1, {expires: banner_persistence_days_date})
        $("#global-banner-content").hide();
        $("body").removeClass("has-global-callout");
      });

      // If permitted, show the banner
      if (!$.cookie("global_banner_persistence_msg_clicked") && !$('body.hide-global-callouts').length) {
        $("#global-banner-content").removeClass('hidden');
        if ($("#global-banner-content").is(":visible")) {
          $("body").addClass("has-global-callout");
        }
        else {
          $("body").removeClass("has-global-callout");
        }
      }
    }
  };

}(jQuery, Drupal));
