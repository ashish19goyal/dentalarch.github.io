$(document).ready(function () {
  $('#our-team').owlCarousel({
    autoPlay: 5000,
    slideSpeed: 500,
    items: 4,
    itemsDesktop: [
      1199,
      4
    ],
    itemsDesktopSmall: [
      979,
      3
    ],
    itemsTablet: [
      768,
      2
    ],
    itemsMobile: [
      479,
      1
    ],
    autoHeight: true,
    pagination: false,
    navigation: true,
    navigationText: [
      '<i class=\'fa fa-angle-left\'></i>',
      '<i class=\'fa fa-angle-right\'></i>'
    ],
  });
});
$(document).ready(function () {
  $('.nav').onePageNav({
    filter: ':not(.external)',
    begin: function () {
      console.log('start')
    },
    end: function () {
      console.log('stop')
    }
  });
});
$(window).load(function () {
  $('#navigation').sticky({
    topSpacing: 0
  });
});
(function ($) {
  $.fn.appear = function (fn, options) {
    var settings = $.extend({
      data: undefined,
      one: true,
      accX: 0,
      accY: 0
    }, options);
    return this.each(function () {
      var t = $(this);
      t.appeared = false;
      if (!fn) {
        t.trigger('appear', settings.data);
        return;
      }
      var w = $(window);
      var check = function () {
        if (!t.is(':visible')) {
          t.appeared = false;
          return;
        }
        var a = w.scrollLeft();
        var b = w.scrollTop();
        var o = t.offset();
        var x = o.left;
        var y = o.top;
        var ax = settings.accX;
        var ay = settings.accY;
        var th = t.height();
        var wh = w.height();
        var tw = t.width();
        var ww = w.width();
        if (y + th + ay >= b && y <= b + wh + ay && x + tw + ax >= a && x <= a + ww + ax) {
          if (!t.appeared) t.trigger('appear', settings.data);
        } else {
          t.appeared = false;
        }
      };
      var modifiedFn = function () {
        t.appeared = true;
        if (settings.one) {
          w.unbind('scroll', check);
          var i = $.inArray(check, $.fn.appear.checks);
          if (i >= 0) $.fn.appear.checks.splice(i, 1);
        }
        fn.apply(this, arguments);
      };
      if (settings.one) t.one('appear', settings.data, modifiedFn);
       else t.bind('appear', settings.data, modifiedFn);
      w.scroll(check);
      $.fn.appear.checks.push(check);
      (check) ();
    });
  };
  $.extend($.fn.appear, {
    checks: [
    ],
    timeout: null,
    checkAll: function () {
      var length = $.fn.appear.checks.length;
      if (length > 0) while (length--) ($.fn.appear.checks[length]) ();
    },
    run: function () {
      if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
      $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
    }
  });
  $.each(['append',
  'prepend',
  'after',
  'before',
  'attr',
  'removeAttr',
  'addClass',
  'removeClass',
  'toggleClass',
  'remove',
  'css',
  'show',
  'hide'], function (i, n) {
    var old = $.fn[n];
    if (old) {
      $.fn[n] = function () {
        var r = old.apply(this, arguments);
        $.fn.appear.run();
        return r;
      }
    }
  });
}) (jQuery);
jQuery(document).ready(function ($) {
  'use strict';
  $('.animated').appear(function () {
    var elem = $(this);
    var animation = elem.data('animation');
    if (!elem.hasClass('visible')) {
      var animationDelay = elem.data('animation-delay');
      if (animationDelay) {
        setTimeout(function () {
          elem.addClass(animation + ' visible');
        }, animationDelay);
      } else {
        elem.addClass(animation + ' visible');
      }
    }
  });
});
