/**
* @file
*/

(function ($) {

  /**
  * Define Drupal behaviours
  */
  Drupal.behaviors.youtube_player = {
    attach: function (context, settings) {

      // Ensure we run once
      if (context !== document) {
        return;
      }

      // Insert images.
      $('.youtube-container').each(function(i){
        var thisYtcId = $(this).attr('id');
        if (i.handled !== true) {
          $(this).attr('id', thisYtcId + '-' + i);
        }
        thisYtcId = $(this).attr('id');
        var yt_id = $(this).attr('rel');
        // Assign this ID to the `close` button.
        $(this).parents('.video-wrapper').siblings('button.close-overlay').attr('rel', thisYtcId);
        // Load the image asynchronously but only if
        // there is no field_media_image or thumbnail present.
        if ($('#' + thisYtcId + ' .yt-placeholder img').length === 0 && $('#' + thisYtcId + ' .yt-thumbnail img').length === 0) {
          if (i.handled !== true) {
            // thumbnail image source (as provided by YT).
            var source = "https://img.youtube.com/vi" + yt_id + "/sddefault.jpg";
            var image = new Image();
            image.src = source;
            image.className = 'default-thumbnail';
            image.id = thisYtcId + '-dtn';
            image.addEventListener( "load", function(e) {
              $('#' + thisYtcId + ' .yt-default-thumbnail').append( image );
            });
            i.handled = true;
          }
        }
      });

      // On click, insert iframe (with autoplay enabled).
      $('.yt-placeholder, .yt-thumbnail, .yt-default-thumbnail, .play-button').on('mouseup touchend keyup', function (e) {
        // Only do this if `space` or `enter` is hit or the mouse button is clicked.
        if ((e.type == 'keyup' && (e.which == 13 || e.which == 32)) || e.type == 'mouseup' || e.type == 'touchend') {
          var thisYtcId = $(this).parents('.youtube-container').attr('id');
          var thisYtcIdOrig = $(this).parents('.youtube-container').attr('rel2');
          var yt_id = $(this).parents('.youtube-container').attr('rel');
          yt_id = yt_id.substring(1);
          var playerId = thisYtcId + '-player';
          if (e.handled !== true) {
            // Only render a new player if there isn't already one there - FireFox quirk.
            if (!$('body #' + thisYtcId + '-player').length) {
              var iframe = document.createElement( "iframe" );
              iframe.setAttribute( "allowfullscreen", "" );
              iframe.setAttribute( "allow", "autoplay" );
              iframe.setAttribute( "title", $('#' + thisYtcId).attr('title') );
              iframe.setAttribute( "id", thisYtcId + '-player' );
              iframe.setAttribute( "class", 'ytplayer' );
              iframe.setAttribute( "src", "https://www.youtube.com/embed/" + yt_id + "?enablejsapi=1&version=3&playerapiid=ytplayer&rel=0&autoplay=1&origin=" + window.location);
              $('#' + thisYtcId).append( iframe );

              $('#' + thisYtcId + ' .yt-image-container, #' + thisYtcId + ' .play-button').css('visibility', 'hidden');

              e.handled = true;
            }

          }
        }
      });

      // Listen for clicks on `tabs__trigger`.
      $('[role="tablist"] [role="tab"]').on('mouseup touchend keyup', function(o) {
        // Ignore if it's `.active`.
        if (!$(this).hasClass('active')) {
          // Get the id of the active tab (with the playing video) before the
          // `active` class is applied elsewhere.
          var activeTab = $('[role="tab"].active').attr('id');
          var data_tab_trigger = $('#' + activeTab).attr('data-tab-trigger');
          // Look for any iframes in a tab (cleverly excluding the video in the hero banner).
          $('body [data-tab-target="' + data_tab_trigger + '"] iframe.ytplayer').each(function(e){
            var stopVideo = function(player) {
              // Very important to remove the autoplay.
              var vidSrc = player.prop('src').replace('autoplay=1','autoplay=0');
              player.prop('src', vidSrc);
            };
            stopVideo($(this));
          });
        }
      });

    }
  };

}(jQuery, Drupal));
;
/**
 * @file
 */

(function ($) {

  /**
   * Define Drupal behaviours
   */
  Drupal.behaviors.new_site_nav = {
    attach: function (context, settings) {

      // Ensure we run once
      if (context !== document) {
        return;
      }

      var $wind = $(window);

      $.fn.Make_MM_Menu = function() {

        //////////////////////////////
        ///  START mobile menu setup
        //////////////////////////////

        const mmenuId = '#off-canvas';
        const offCanvas = document.querySelector(mmenuId)

        // The instatiation of the mmenu must only happen once.
        if (offCanvas && !offCanvas.hasOwnProperty('mmApi') && typeof (Mmenu) !== 'undefined') {
          const settings = drupalSettings.responsive_menu;
          const position = settings.position,
            theme = settings.theme,
            pagedim = settings.pagedim;

          const options = {
            extensions: [
              theme,
              'fx-menu-slide',
              position === 'left' ? 'position-left' : 'position-right'
            ],
            keyboardNavigation: {
              enable: true,
              enhance: true,
            },
            drag: {
              open: settings.drag
            }
          };

          if (pagedim !== 'none') {
            options.extensions.push(pagedim);
          }

          const config = {
            classNames: {
              selected: 'menu-item--active-trail'
            }
          };

          // Allow the settings and options to be extended or overridden.
          if (typeof settings.custom !== 'undefined') {
            if (typeof settings.custom.options !== 'undefined') {
              extend(options, drupalSettings.responsive_menu.custom.options);
            }
            if (typeof drupalSettings.responsive_menu.custom.config !== 'undefined') {
              extend(config, drupalSettings.responsive_menu.custom.config);
            }
          }

          // Add mobile multiline option
          options.extensions.push("multiline")

          // Set up the off canvas menu.
          const mmenu = new Mmenu(mmenuId, options, config);

          // Due to a rendering issue with Chrome the page needs the viewport
          // metatag to have a value including initial-scale=1.0 otherwise it
          // won't render properly.
          // @see issue #3153145
          const mmenuApi = mmenu.API;
          const viewports = document.getElementsByName('viewport');

          if (viewports.length !== 0 && settings.modifyViewport) {
            const viewportMeta = viewports[0]
            const defaultViewport = viewports[0].content
            const staticViewport = "width=device-width, initial-scale=1.0, minimum-scale=1.0";

            mmenuApi.bind('open:start', function () {
              viewportMeta.setAttribute('content', staticViewport);
            });
            mmenuApi.bind('close:start', function () {
              viewportMeta.setAttribute('content', defaultViewport);
            });
          }

          // Create Home label link
          panel_1 = document.querySelector("#mm-1");
          listview_1 = panel_1.querySelector(".mm-listview");
          listitem_1 = document.createElement("li");
          listitem_1.innerHTML = '<a href="/" class="info-label home">Home</a>';
          listview_1.prepend(listitem_1);
          mmenuApi.initListview(listview_1);

          // Loop through all links with next button
          // and populate the header section of their
          // corresponding panel.
          // First get required info from link:
          $(".mm-panels .mm-btn_next").each(function () {
            this_text_elem = $(this).parent().find(".mm-listitem__text");
            this_text_elem_text = this_text_elem.text();
            this_text_elen_url = this_text_elem.attr('href');
            this_id = $(this).attr('href');
            this_info_label = $(this).closest('.mm-panel').find(".info-label").text();

            // Cater to info link (white text on blue background)
            header_info = document.createElement("li");
            header_info.classList.add('mm-listitem')
            header_info.innerHTML = '<a href="' + this_text_elen_url + '" class="info-label mm-listitem__text">' + this_text_elem_text + '</a>';
            $(this_id).find(".mm-listview").prepend(header_info);

            // Cater to back link
            back_link_elem = $(this_id).find(".mm-navbar_sticky");
            back_link_elem.find(".mm-navbar__title").text("Back to " + this_info_label);
            back_link_elem.addClass("mm-back-link-wrapper");
            back_link_elem.find(".mm-navbar__title").addClass("mm-back-link");
          });

        }

        ////////////////////////////
        ///  END mobile menu setup
        ////////////////////////////

      }

      $.fn.Merge_Cols = function($__this, $_index_val) {
        var $_counter = 0;
        var $_first_elem = $__this.find(".level-2-cell[data-col-index='" + $_index_val + "']").first();
        var $_other_elems = $__this.find(".level-2-cell[data-col-index='" + $_index_val + "']:not(:first)");
        $__this.find(".level-2-cell[data-col-index='" + $_index_val + "']").each(function () {
          var lev_2_col_index = $(this).attr('data-col-index');
          if ($_counter !== 0) {
            $_first_elem.append($(this).html())
          }
          $_counter++;
        });
        $_other_elems.remove();
      }
      $.fn.Fix_Desktop_Cols = function() {
        $(".new-site-nav-desktop-wrapper").each(function () {
          var $_this = $(this);
          $.fn.Merge_Cols($_this, 0);
          $.fn.Merge_Cols($_this, 1);
          $.fn.Merge_Cols($_this, 2);
        });
      }

      $.fn.hideAllMenuItems = function() {
        $(".new-site-nav-desktop-wrapper").addClass('hidden');
        $(".new-site-nav-desktop-wrapper").removeClass('active');
        $("#horizontal-menu li.menu-item a").removeClass('desktop-menu-hover');
        $("#horizontal-menu li.menu-item .menu-arrow-wrapper .menu-arrow").removeClass('active');
        $("#horizontal-menu li.menu-item").removeClass('lvl-1-active');
        $("#desktop-menu-overlay").hide();
        $.fn.HandleMegaMenuAriaClose();
      };

      $.fn.ShowMenuItem = function(_index) {
        if ($('nav #horizontal-menu.menu-loaded').length > 0) {
          $("#horizontal-menu li.menu-item:nth-child(" + parseInt(parseInt(_index) + 1) + ")").addClass('lvl-1-active');
          $("#horizontal-menu li.menu-item:nth-child(" + parseInt(parseInt(_index) + 1) + ") a").addClass('desktop-menu-hover');
          $(".new-site-nav-desktop-wrapper[data-menu-index='" + _index + "']").removeClass('hidden');
          $(".new-site-nav-desktop-wrapper[data-menu-index='" + _index + "']").addClass('active');
          $("#horizontal-menu li.menu-item:nth-child(" + parseInt(parseInt(_index) + 1) + ") .menu-arrow-wrapper .menu-arrow").addClass('active');
        }
        $("#desktop-menu-overlay").show();
        $.fn.HandleMegaMenuAriaOpen(_index);
      };

      $.fn.DisableLevel1Links = function(_index) {
        $("#horizontal-menu").children('li').each(function () {
          a_link = $(this).find('a');
          a_link.off("click").attr('href', "javascript: void(0);");
        });
      };

      $.fn.DeOrphanMenuArrows = function() {
        $(".new-site-nav-desktop-wrapper .menu-end-arrow").each(function () {
          a_text = $.trim($(this).parent().text());
          if (a_text.length > 0) {
            arrow_chars = a_text.substr(a_text.length - 2);
            a_text = $.trim(a_text.slice(0,-2));
            lastword = $.trim(a_text.split(/[\s-]+/).pop());
            // Dont bother for single word lines
            if (a_text.length != lastword.length) {
              new_arrow_text = lastword + arrow_chars;
              new_row_text = a_text.slice(0,-lastword.length);
              new_row_inner_html = new_row_text + '<span class="menu-end-arrow">' + new_arrow_text + '</span>';
              $(this).parent().html(new_row_inner_html);
            }
          }
        });
      };

      $.fn.Check2ndryNavExists = function() {
        // On desktop ensure no gap between mega menu and
        // level 1 links if no level 2 block bar
        if ($wind.width() > 1009 && $("#main-content .container.secondary-nav-container").length && !$("body.hide-sec-nav").length) {
          $("body").addClass('secondry-nav');
        }
        else {
          $("body").removeClass('secondry-nav');
        }
      };

      $.fn.CheckCalloutExists = function() {
        // On desktop ensure no vertical indent for
        // level 1 links if callout exists
        if ($wind.width() > 1009 && $("#main-content article section.call-out-banner").length && !$("#main-content .container.secondary-nav-container.block").length) {
          $("body").addClass('callout-exists');
        }
      };

      $.fn.CheckVerticalSpacing = function() {
        $.fn.Check2ndryNavExists();
        $.fn.CheckCalloutExists();
      };

      $.fn.MakeInitialChecks = function() {
        if ($("#main-content #block-mainnavigation #block-mainnavigation-menu").length) {
          $("body").addClass("lvl2-menu");
        }
        $.fn.CheckVerticalSpacing();
      };

      $.fn.HandleMegaMenuChildHoverStates = function() {
        if ($wind.width() > 1009) {
          $('.new-site-nav-desktop-wrapper a').mouseenter(function () {
            $(this).addClass('underline');
            $(this).find(".menu-end-arrow").addClass('underline');
          });
          $('.new-site-nav-desktop-wrapper .menu-end-arrow').mouseenter(function () {
            $(this).addClass('underline');
            $(this).closest("a").addClass('underline');
          });

          $('.new-site-nav-desktop-wrapper a').mouseleave(function () {
            $(this).removeClass('underline');
            $(this).find(".menu-end-arrow").removeClass('underline');
          });
          $('.new-site-nav-desktop-wrapper .menu-end-arrow').mouseleave(function () {
            $(this).removeClass('underline');
            $(this).closest("a").removeClass('underline');
          });
        }
      };

      $.fn.HandleMegaMenuAriaClose = function() {
        if ($wind.width() > 1009) {
          $("#horizontal-menu.horizontal-menu li a").each(function () {
            $(this).attr("aria-expanded","false");
          });
        }
      };

      $.fn.HandleMegaMenuAriaOpen = function(_index) {
        if ($wind.width() > 1009) {
          $("#horizontal-menu li.menu-item:nth-child(" + parseInt(parseInt(_index) + 1) + ") a").attr("aria-expanded","true");
        }
      };

      /*========== End of Functions ==========*/

      // Make menus
      $.fn.MakeInitialChecks();
      $.fn.DisableLevel1Links();
      $.fn.Make_MM_Menu();
      $.fn.Fix_Desktop_Cols();
      $.fn.DeOrphanMenuArrows();
      $.fn.HandleMegaMenuChildHoverStates();
      $.fn.HandleMegaMenuAriaClose();

      $("#horizontal-menu").children('li').on("click", function (e) {
        // Only consider the top Level 1 links here
        var li_index = $(this).index();
        $("nav #horizontal-menu").addClass('menu-loaded');

        // Check if class exists, if so close menu - but confirm if user is switching level 1
        // If so close this one and open the new level 1 just clicked
        if ($(".new-site-nav-desktop-wrapper.active")) {
          // if overlay is not visible then a new level 1 was clicked
          if ($(".new-site-nav-desktop-wrapper[data-menu-index='" + li_index + "'].active").length && $(".new-site-nav-desktop-wrapper").is(':visible')) {
            // Okay same li clicked so hide
            $.fn.hideAllMenuItems();
          }
          else {
            $.fn.hideAllMenuItems();
            $.fn.ShowMenuItem(li_index);
          }
        }
        else {
          $.fn.hideAllMenuItems();
        }
      });

      // Handle arrow hover colour
      $("#horizontal-menu li").on("mouseover", function (e) {
        $(this).find('.menu-arrow-wrapper .menu-arrow').addClass('is-hover');
      });
      $("#horizontal-menu li").on("mouseout", function (e) {
        $('#horizontal-menu li .menu-arrow-wrapper .menu-arrow').removeClass('is-hover');
      });

      // Close overlay if click outside
      // $(document).mouseup(function (e) {
      //   if ($wind.width() >= 1009 && $(e.target).closest("#horizontal-menu li").length === 0 && !$(event.target).hasClass('level-1-link') && !$(event.target).hasClass('level-2-link') && !$(event.target).hasClass('level-3-link')) {
      //     $.fn.hideAllMenuItems();
      //   }
      // });

      // Hide on resize to smaller device
      // Also ensure mobile menu is not visble on desktop
      // Also check for secondary nav to remove vertical gap
      // on mega menu if no secondary nav.
      $wind.resize(function() {
        $.fn.CheckVerticalSpacing();
        $.fn.HandleMegaMenuChildHoverStates();
        if ($wind.width() < 1009 && $(".new-site-nav-desktop-wrapper.active").length) {
          $.fn.hideAllMenuItems();
        }
        else {
          if ($("#off-canvas.mm-menu_opened").length) {
            // $(".main-header #toggle-icon .custom-icon").click();
            $("#off-canvas").removeClass("mm-menu_opened")
            $("#off-canvas").addClass("mm-menu_keyboardfocus")
          }
        }
      });

    }
  };

}(jQuery, Drupal));

/**
 * Similar to the jQuery extend but shallow.
 *
 * @param out
 * @returns {*|{}}
 */
const extend = function (out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;

    for (let key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key))
        out[key] = arguments[i][key];
    }
  }

  return out;
};
;
/*
 * jQuery Superfish Menu Plugin - v1.7.10
 * Copyright (c) 2018 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */

;!function(a,b){"use strict";var c=function(){var c={bcClass:"sf-breadcrumb",menuClass:"sf-js-enabled",anchorClass:"sf-with-ul",menuArrowClass:"sf-arrows"},d=function(){var b=/^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent);return b&&a("html").css("cursor","pointer").on("click",a.noop),b}(),e=function(){var a=document.documentElement.style;return"behavior"in a&&"fill"in a&&/iemobile/i.test(navigator.userAgent)}(),f=function(){return!!b.PointerEvent}(),g=function(a,b,d){var e,f=c.menuClass;b.cssArrows&&(f+=" "+c.menuArrowClass),e=d?"addClass":"removeClass",a[e](f)},h=function(b,d){return b.find("li."+d.pathClass).slice(0,d.pathLevels).addClass(d.hoverClass+" "+c.bcClass).filter(function(){return a(this).children(d.popUpSelector).hide().show().length}).removeClass(d.pathClass)},i=function(a,b){var d=b?"addClass":"removeClass";a.children("a")[d](c.anchorClass)},j=function(a){var b=a.css("ms-touch-action"),c=a.css("touch-action");c=c||b,c="pan-y"===c?"auto":"pan-y",a.css({"ms-touch-action":c,"touch-action":c})},k=function(a){return a.closest("."+c.menuClass)},l=function(a){return k(a).data("sfOptions")},m=function(){var b=a(this),c=l(b);clearTimeout(c.sfTimer),b.siblings().superfish("hide").end().superfish("show")},n=function(b){b.retainPath=a.inArray(this[0],b.$path)>-1,this.superfish("hide"),this.parents("."+b.hoverClass).length||(b.onIdle.call(k(this)),b.$path.length&&a.proxy(m,b.$path)())},o=function(){var b=a(this),c=l(b);d?a.proxy(n,b,c)():(clearTimeout(c.sfTimer),c.sfTimer=setTimeout(a.proxy(n,b,c),c.delay))},p=function(b){var c=a(this),d=l(c),e=c.siblings(b.data.popUpSelector);return d.onHandleTouch.call(e)===!1?this:void(e.length>0&&e.is(":hidden")&&(c.one("click.superfish",!1),"MSPointerDown"===b.type||"pointerdown"===b.type?c.trigger("focus"):a.proxy(m,c.parent("li"))()))},q=function(b,c){var g="li:has("+c.popUpSelector+")";a.fn.hoverIntent&&!c.disableHI?b.hoverIntent(m,o,g):b.on("mouseenter.superfish",g,m).on("mouseleave.superfish",g,o);var h="MSPointerDown.superfish";f&&(h="pointerdown.superfish"),d||(h+=" touchend.superfish"),e&&(h+=" mousedown.superfish"),b.on("focusin.superfish","li",m).on("focusout.superfish","li",o).on(h,"a",c,p)};return{hide:function(b){if(this.length){var c=this,d=l(c);if(!d)return this;var e=d.retainPath===!0?d.$path:"",f=c.find("li."+d.hoverClass).add(this).not(e).removeClass(d.hoverClass).children(d.popUpSelector),g=d.speedOut;if(b&&(f.show(),g=0),d.retainPath=!1,d.onBeforeHide.call(f)===!1)return this;f.stop(!0,!0).animate(d.animationOut,g,function(){var b=a(this);d.onHide.call(b)})}return this},show:function(){var a=l(this);if(!a)return this;var b=this.addClass(a.hoverClass),c=b.children(a.popUpSelector);return a.onBeforeShow.call(c)===!1?this:(c.stop(!0,!0).animate(a.animation,a.speed,function(){a.onShow.call(c)}),this)},destroy:function(){return this.each(function(){var b,d=a(this),e=d.data("sfOptions");return!!e&&(b=d.find(e.popUpSelector).parent("li"),clearTimeout(e.sfTimer),g(d,e),i(b),j(d),d.off(".superfish").off(".hoverIntent"),b.children(e.popUpSelector).attr("style",function(a,b){if("undefined"!=typeof b)return b.replace(/display[^;]+;?/g,"")}),e.$path.removeClass(e.hoverClass+" "+c.bcClass).addClass(e.pathClass),d.find("."+e.hoverClass).removeClass(e.hoverClass),e.onDestroy.call(d),void d.removeData("sfOptions"))})},init:function(b){return this.each(function(){var d=a(this);if(d.data("sfOptions"))return!1;var e=a.extend({},a.fn.superfish.defaults,b),f=d.find(e.popUpSelector).parent("li");e.$path=h(d,e),d.data("sfOptions",e),g(d,e,!0),i(f,!0),j(d),q(d,e),f.not("."+c.bcClass).superfish("hide",!0),e.onInit.call(this)})}}}();a.fn.superfish=function(b,d){return c[b]?c[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?a.error("Method "+b+" does not exist on jQuery.fn.superfish"):c.init.apply(this,arguments)},a.fn.superfish.defaults={popUpSelector:"ul,.sf-mega",hoverClass:"sfHover",pathClass:"overrideThisToUse",pathLevels:1,delay:800,animation:{opacity:"show"},animationOut:{opacity:"hide"},speed:"normal",speedOut:"fast",cssArrows:!0,disableHI:!1,onInit:a.noop,onBeforeShow:a.noop,onShow:a.noop,onBeforeHide:a.noop,onHide:a.noop,onIdle:a.noop,onDestroy:a.noop,onHandleTouch:a.noop}}(jQuery,window);;
(function ($) {

  'use strict';

  /**
   * Provides additional but optional functionality.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior for superfish.
   */
  Drupal.behaviors.responsive_menu_optional = {
    attach: function (context, settings) {

      $(context).find('body').once('responsive-menu-optional').each(function () {

        // Apply the superfish library to the menu.
        if ($.fn.superfish && drupalSettings.responsive_menu.superfish.active) {
          // Get the superfish settings.
          var superfishDelay = drupalSettings.responsive_menu.superfish.delay,
            superfishSpeed = drupalSettings.responsive_menu.superfish.speed,
            superfishSpeedOut = drupalSettings.responsive_menu.superfish.speedOut;
          // Attach superfish to the responsive menu.
          $('#horizontal-menu').superfish({
            delay: parseInt(superfishDelay, 10),
            speed: parseInt(superfishSpeed, 10),
            speedOut: parseInt(superfishSpeedOut, 10)
          }).addClass('sf-menu');
        }

      });
    }
  };

})(jQuery);
;
/**
 * hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2013 Brian Cherne
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 **/
(function($) {
    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {

        // default configuration values
        var cfg = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };

        if ( typeof handlerIn === "object" ) {
            cfg = $.extend(cfg, handlerIn );
        } else if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(ob).off("mousemove.hoverIntent",track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob,[ev]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob,[ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({},e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            // if e.type == "mouseenter"
            if (e.type == "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX; pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).on("mousemove.hoverIntent",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

                // else e.type == "mouseleave"
            } else {
                // unbind expensive mousemove event
                $(ob).off("mousemove.hoverIntent",track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
})(jQuery);;
/*! js-cookie v3.0.1 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function ($, Drupal, cookies) {
  var deprecatedMessageSuffix = "is deprecated in Drupal 9.0.0 and will be removed in Drupal 10.0.0. Use the core/js-cookie library instead. See https://www.drupal.org/node/3104677";

  var isFunction = function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  };

  var parseCookieValue = function parseCookieValue(value, parseJson) {
    if (value.indexOf('"') === 0) {
      value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      value = decodeURIComponent(value.replace(/\+/g, ' '));
      return parseJson ? JSON.parse(value) : value;
    } catch (e) {}
  };

  var reader = function reader(cookieValue, cookieName, converter, readUnsanitized, parseJson) {
    var value = readUnsanitized ? cookieValue : parseCookieValue(cookieValue, parseJson);

    if (converter !== undefined && isFunction(converter)) {
      return converter(value, cookieName);
    }

    return value;
  };

  $.cookie = function (key) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    Drupal.deprecationError({
      message: "jQuery.cookie() ".concat(deprecatedMessageSuffix)
    });

    if (value !== undefined && !isFunction(value)) {
      var attributes = _objectSpread(_objectSpread({}, $.cookie.defaults), options);

      if (typeof attributes.expires === 'string' && attributes.expires !== '') {
        attributes.expires = new Date(attributes.expires);
      }

      var cookieSetter = cookies.withConverter({
        write: function write(cookieValue) {
          return encodeURIComponent(cookieValue);
        }
      });
      value = $.cookie.json && !$.cookie.raw ? JSON.stringify(value) : String(value);
      return cookieSetter.set(key, value, attributes);
    }

    var userProvidedConverter = value;
    var cookiesShim = cookies.withConverter({
      read: function read(cookieValue, cookieName) {
        return reader(cookieValue, cookieName, userProvidedConverter, $.cookie.raw, $.cookie.json);
      }
    });

    if (key !== undefined) {
      return cookiesShim.get(key);
    }

    var results = cookiesShim.get();
    Object.keys(results).forEach(function (resultKey) {
      if (results[resultKey] === undefined) {
        delete results[resultKey];
      }
    });
    return results;
  };

  $.cookie.defaults = _objectSpread({
    path: ''
  }, cookies.defaults);
  $.cookie.json = false;
  $.cookie.raw = false;

  $.removeCookie = function (key, options) {
    Drupal.deprecationError({
      message: "jQuery.removeCookie() ".concat(deprecatedMessageSuffix)
    });
    cookies.remove(key, _objectSpread(_objectSpread({}, $.cookie.defaults), options));
    return !cookies.get(key);
  };
})(jQuery, Drupal, window.Cookies);;
