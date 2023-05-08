/*
 * jPreloader
*/
 
(function(a){var b=new Array,c=new Array,d=function(){},e=0;var f={splashVPos:"35%",loaderVPos:"75%",splashID:"#jpreContent",showSplash:true,showPercentage:true,autoClose:true,closeBtnText:"Start!",onetimeLoad:false,debugMode:false,splashFunction:function(){}};var g=function(){if(f.onetimeLoad){var a=document.cookie.split("; ");for(var b=0,c;c=a[b]&&a[b].split("=");b++){if(c.shift()==="jpreLoader"){return c.join("=")}}return false}else{return false}};var h=function(a){if(f.onetimeLoad){var b=new Date;b.setDate(b.getDate()+a);var c=a==null?"":"expires="+b.toUTCString();document.cookie="jpreLoader=loaded; "+c}};var i=function(){jOverlay=a("<div></div>").attr("id","jpreOverlay").css({position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:9999999}).appendTo("body");if(f.showSplash){jContent=a("<div></div>").attr("id","jpreSlide").appendTo(jOverlay);var b=a(window).width()-a(jContent).width();a(jContent).css({position:"absolute",top:f.splashVPos,left:Math.round(50/a(window).width()*b)+"%"});a(jContent).html(a(f.splashID).wrap("<div/>").parent().html());a(f.splashID).remove();f.splashFunction()}jLoader=a("<div></div>").attr("id","jpreLoader").appendTo(jOverlay);var c=a(window).width()-a(jLoader).width();a(jLoader).css({position:"absolute",top:f.loaderVPos,left:Math.round(50/a(window).width()*c)+"%"});jBar=a("<div></div>").attr("id","jpreBar").css({width:"0%",height:"100%"}).appendTo(jLoader);if(f.showPercentage){jPer=a("<div></div>").attr("id","jprePercentage").css({position:"relative",height:"100%"}).appendTo(jLoader).html("")}if(!f.autoclose){jButton=a("<div></div>").attr("id","jpreButton").on("click",function(){n()}).css({position:"relative",height:"100%"}).appendTo(jLoader).text(f.closeBtnText).hide()}};var j=function(c){a(c).find("*:not(script)").each(function(){var c="";if(a(this).css("background-image").indexOf("none")==-1&&a(this).css("background-image").indexOf("-gradient")==-1){c=a(this).css("background-image");if(c.indexOf("url")!=-1){var d=c.match(/url\((.*?)\)/);c=d[1].replace(/\"/g,"")}}else if(a(this).get(0).nodeName.toLowerCase()=="img"&&typeof a(this).attr("src")!="undefined"){c=a(this).attr("src")}if(c.length>0){b.push(c)}})};var k=function(){for(var a=0;a<b.length;a++){if(l(b[a]));}};var l=function(b){var d=new Image;a(d).load(function(){m()}).error(function(){c.push(a(this).attr("src"));m()}).attr("src",b)};var m=function(){e++;var c=Math.round(e/b.length*100);a(jBar).stop().animate({width:c+"%"},500,"linear");if(f.showPercentage){a(jPer).text(c)}if(e>=b.length){e=b.length;h();if(f.showPercentage){a(jPer).text("100")}if(f.debugMode){var d=o()}a(jBar).stop().animate({width:"100%"},500,"linear",function(){if(f.autoClose)n();else a(jButton).fadeIn(1e3)})}};var n=function(){a(jOverlay).fadeOut(800,function(){a(jOverlay).remove();d()})};var o=function(){if(c.length>0){var a="ERROR - IMAGE FILES MISSING!!!\n\r";a+=c.length+" image files cound not be found. \n\r";a+="Please check your image paths and filenames:\n\r";for(var b=0;b<c.length;b++){a+="- "+c[b]+"\n\r"}return true}else{return false}};a.fn.jpreLoader=function(b,c){if(b){a.extend(f,b)}if(typeof c=="function"){d=c}a("body").css({display:"block"});return this.each(function(){if(!g()){i();j(this);k()}else{a(f.splashID).remove();d()}})}})(jQuery);
// JavaScript Document
 /* COLLAPSE 
  * ================================ */
!function ($) {
  "use strict"; // jshint ;_;
 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */
  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)
    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }
    this.options.toggle && this.toggle()
  }
  Collapse.prototype = {
    constructor: Collapse
  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }
  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData
      if (this.transitioning || this.$element.hasClass('in')) return
      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')
      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }
      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }
  , hide: function () {
      var dimension
      if (this.transitioning || !this.$element.hasClass('in')) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }
  , reset: function (size) {
      var dimension = this.dimension()
      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth
      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')
      return this
    }
  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }
      this.$element.trigger(startEvent)
      if (startEvent.isDefaultPrevented()) return
      this.transitioning = 1
      this.$element[method]('in')
      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }
  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }
  }

 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */
  var old = $.fn.collapse
  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }
  $.fn.collapse.defaults = {
    toggle: true
  }
  $.fn.collapse.Constructor = Collapse

 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }

 /* COLLAPSE DATA-API
  * ================= */
  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })
  
  /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */
  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }
  Tooltip.prototype = {
    constructor: Tooltip
  , init: function (type, element, options) {
      var eventIn
        , eventOut
        , triggers
        , trigger
        , i
      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true
      triggers = this.options.trigger.split(' ')
      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
        }
      }
      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }
  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options)
      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }
      return options
    }
  , enter: function (e) {
      var defaults = $.fn[this.type].defaults
        , options = {}
        , self
      this._options && $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      }, this)
      self = $(e.currentTarget)[this.type](options).data(this.type)
      if (!self.options.delay || !self.options.delay.show) return self.show()
      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }
  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)
      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }
  , show: function () {
      var $tip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = $.Event('show')
      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip = this.tip()
        this.setContent()
        if (this.options.animation) {
          $tip.addClass('fade')
        }
        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement
        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })
        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
        pos = this.getPosition()
        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }
        this.applyPlacement(tp, placement)
        this.$element.trigger('shown')
      }
    }
  , applyPlacement: function(offset, placement){
      var $tip = this.tip()
        , width = $tip[0].offsetWidth
        , height = $tip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace
      $tip
        .offset(offset)
        .addClass(placement)
        .addClass('in')
      actualWidth = $tip[0].offsetWidth
      actualHeight = $tip[0].offsetHeight
      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }
      if (placement == 'bottom' || placement == 'top') {
        delta = 0
        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          $tip.offset(offset)
          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight
        }
        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }
      if (replace) $tip.offset(offset)
    }
  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }
  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }
  , hide: function () {
      var that = this
        , $tip = this.tip()
        , e = $.Event('hide')
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $tip.removeClass('in')
      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)
        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }
      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()
      this.$element.trigger('hidden')
      return this
    }
  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
    }
  , hasContent: function () {
      return this.getTitle()
    }
  , getPosition: function () {
      var el = this.$element[0]
      return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.$element.offset())
    }
  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options
      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)
      return title
    }
  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }
  , arrow: function(){
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }
  , enable: function () {
      this.enabled = true
    }
  , disable: function () {
      this.enabled = false
    }
  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }
  , toggle: function (e) {
      var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }
  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }
  }
 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */
  var old = $.fn.tooltip
  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }
  $.fn.tooltip.Constructor = Tooltip
  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }
}(window.jQuery);

/* * jQuery dropdown: A simple dropdown plugin*/
if (jQuery) (function ($) {
    $.extend($.fn, {
        dropdown: function (method, data) {

            switch (method) {
                case 'show':
                    show(null, $(this));
                    return $(this);
                case 'hide':
                    hide();
                    return $(this);
                case 'attach':
                    return $(this).attr('data-dropdown', data);
                case 'detach':
                    hide();
                    return $(this).removeAttr('data-dropdown');
                case 'disable':
                    return $(this).addClass('dropdown-disabled');
                case 'enable':
                    hide();
                    return $(this).removeClass('dropdown-disabled');
            }
        }
    });
    function show(event, object) {

        var trigger = event ? $(this) : object,
			dropdown = $(trigger.attr('data-dropdown')),
			isOpen = trigger.hasClass('dropdown-open');

        // In some cases we don't want to show it
        if (event) {
            if ($(event.target).hasClass('dropdown-ignore')) return;

            event.preventDefault();
            event.stopPropagation();
        } else {
            if (trigger !== object.target && $(object.target).hasClass('dropdown-ignore')) return;
        }
        hide();

        if (isOpen || trigger.hasClass('dropdown-disabled')) return;

        // Show it
        trigger.addClass('dropdown-open');
        dropdown
			.data('dropdown-trigger', trigger)
			.show();

        // Position it
        position();

        // Trigger the show callback
        dropdown
			.trigger('show', {
				dropdown: dropdown,
				trigger: trigger
			});
    }
    function hide(event) {
        // In some cases we don't hide them
        var targetGroup = event ? $(event.target).parents().addBack() : null;
        // Are we clicking anywhere in a dropdown?
        if (targetGroup && targetGroup.is('.dropdown')) {
            // Is it a dropdown menu?
            if (targetGroup.is('.dropdown-menu')) {
                // Did we click on an option? If so close it.
                if (!targetGroup.is('A')) return;
            } else {
                // Nope, it's a panel. Leave it open.
                return;
            }
        }
        // Hide any dropdown that may be showing
        $(document).find('.dropdown:visible').each(function () {
            var dropdown = $(this);
            dropdown
				.hide()
				.removeData('dropdown-trigger')
				.trigger('hide', { dropdown: dropdown });
        });
        // Remove all dropdown-open classes
        $(document).find('.dropdown-open').removeClass('dropdown-open');
    }
    function position() {
        var dropdown = $('.dropdown:visible').eq(0),
			trigger = dropdown.data('dropdown-trigger'),
			hOffset = trigger ? parseInt(trigger.attr('data-horizontal-offset') || 0, 10) : null,
			vOffset = trigger ? parseInt(trigger.attr('data-vertical-offset') || 0, 10) : null;
        if (dropdown.length === 0 || !trigger) return;
        // Position the dropdown relative-to-parent...
        if (dropdown.hasClass('dropdown-relative')) {
            dropdown.css({
                left: dropdown.hasClass('dropdown-anchor-right') ?
					trigger.position().left - (dropdown.outerWidth(true) - trigger.outerWidth(true)) - parseInt(trigger.css('margin-right'), 10) + hOffset :
					trigger.position().left + parseInt(trigger.css('margin-left'), 10) + hOffset,
                top: trigger.position().top + trigger.outerHeight(true) - parseInt(trigger.css('margin-top'), 10) + vOffset
            });
        } else {
            // ...or relative to document
            dropdown.css({
                left: dropdown.hasClass('dropdown-anchor-right') ?
					trigger.offset().left - (dropdown.outerWidth() - trigger.outerWidth()) + hOffset : trigger.offset().left + hOffset,
                top: trigger.offset().top + trigger.outerHeight() + vOffset
            });
        }
    }
    $(document).on('click.dropdown', '[data-dropdown]', show);
    $(document).on('click.dropdown', hide);
    $(window).on('resize', position);
})(jQuery);

/*! iCheck v1.0.2 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
(function(f){function A(a,b,d){var c=a[0],g=/er/.test(d)?_indeterminate:/bl/.test(d)?n:k,e=d==_update?{checked:c[k],disabled:c[n],indeterminate:"true"==a.attr(_indeterminate)||"false"==a.attr(_determinate)}:c[g];if(/^(ch|di|in)/.test(d)&&!e)x(a,g);else if(/^(un|en|de)/.test(d)&&e)q(a,g);else if(d==_update)for(var f in e)e[f]?x(a,f,!0):q(a,f,!0);else if(!b||"toggle"==d){if(!b)a[_callback]("ifClicked");e?c[_type]!==r&&q(a,g):x(a,g)}}function x(a,b,d){var c=a[0],g=a.parent(),e=b==k,u=b==_indeterminate,
v=b==n,s=u?_determinate:e?y:"enabled",F=l(a,s+t(c[_type])),B=l(a,b+t(c[_type]));if(!0!==c[b]){if(!d&&b==k&&c[_type]==r&&c.name){var w=a.closest("form"),p='input[name="'+c.name+'"]',p=w.length?w.find(p):f(p);p.each(function(){this!==c&&f(this).data(m)&&q(f(this),b)})}u?(c[b]=!0,c[k]&&q(a,k,"force")):(d||(c[b]=!0),e&&c[_indeterminate]&&q(a,_indeterminate,!1));D(a,e,b,d)}c[n]&&l(a,_cursor,!0)&&g.find("."+C).css(_cursor,"default");g[_add](B||l(a,b)||"");g.attr("role")&&!u&&g.attr("aria-"+(v?n:k),"true");
g[_remove](F||l(a,s)||"")}function q(a,b,d){var c=a[0],g=a.parent(),e=b==k,f=b==_indeterminate,m=b==n,s=f?_determinate:e?y:"enabled",q=l(a,s+t(c[_type])),r=l(a,b+t(c[_type]));if(!1!==c[b]){if(f||!d||"force"==d)c[b]=!1;D(a,e,s,d)}!c[n]&&l(a,_cursor,!0)&&g.find("."+C).css(_cursor,"pointer");g[_remove](r||l(a,b)||"");g.attr("role")&&!f&&g.attr("aria-"+(m?n:k),"false");g[_add](q||l(a,s)||"")}function E(a,b){if(a.data(m)){a.parent().html(a.attr("style",a.data(m).s||""));if(b)a[_callback](b);a.off(".i").unwrap();
f(_label+'[for="'+a[0].id+'"]').add(a.closest(_label)).off(".i")}}function l(a,b,f){if(a.data(m))return a.data(m).o[b+(f?"":"Class")]}function t(a){return a.charAt(0).toUpperCase()+a.slice(1)}function D(a,b,f,c){if(!c){if(b)a[_callback]("ifToggled");a[_callback]("ifChanged")[_callback]("if"+t(f))}}var m="iCheck",C=m+"-helper",r="radio",k="checked",y="un"+k,n="disabled";_determinate="determinate";_indeterminate="in"+_determinate;_update="update";_type="type";_click="click";_touch="touchbegin.i touchend.i";
_add="addClass";_remove="removeClass";_callback="trigger";_label="label";_cursor="cursor";_mobile=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);f.fn[m]=function(a,b){var d='input[type="checkbox"], input[type="'+r+'"]',c=f(),g=function(a){a.each(function(){var a=f(this);c=a.is(d)?c.add(a):c.add(a.find(d))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(a))return a=a.toLowerCase(),g(this),c.each(function(){var c=
f(this);"destroy"==a?E(c,"ifDestroyed"):A(c,!0,a);f.isFunction(b)&&b()});if("object"!=typeof a&&a)return this;var e=f.extend({checkedClass:k,disabledClass:n,indeterminateClass:_indeterminate,labelHover:!0},a),l=e.handle,v=e.hoverClass||"hover",s=e.focusClass||"focus",t=e.activeClass||"active",B=!!e.labelHover,w=e.labelHoverClass||"hover",p=(""+e.increaseArea).replace("%","")|0;if("checkbox"==l||l==r)d='input[type="'+l+'"]';-50>p&&(p=-50);g(this);return c.each(function(){var a=f(this);E(a);var c=this,
b=c.id,g=-p+"%",d=100+2*p+"%",d={position:"absolute",top:g,left:g,display:"block",width:d,height:d,margin:0,padding:0,background:"#fff",border:0,opacity:0},g=_mobile?{position:"absolute",visibility:"hidden"}:p?d:{position:"absolute",opacity:0},l="checkbox"==c[_type]?e.checkboxClass||"icheckbox":e.radioClass||"i"+r,z=f(_label+'[for="'+b+'"]').add(a.closest(_label)),u=!!e.aria,y=m+"-"+Math.random().toString(36).substr(2,6),h='<div class="'+l+'" '+(u?'role="'+c[_type]+'" ':"");u&&z.each(function(){h+=
'aria-labelledby="';this.id?h+=this.id:(this.id=y,h+=y);h+='"'});h=a.wrap(h+"/>")[_callback]("ifCreated").parent().append(e.insert);d=f('<ins class="'+C+'"/>').css(d).appendTo(h);a.data(m,{o:e,s:a.attr("style")}).css(g);e.inheritClass&&h[_add](c.className||"");e.inheritID&&b&&h.attr("id",m+"-"+b);"static"==h.css("position")&&h.css("position","relative");A(a,!0,_update);if(z.length)z.on(_click+".i mouseover.i mouseout.i "+_touch,function(b){var d=b[_type],e=f(this);if(!c[n]){if(d==_click){if(f(b.target).is("a"))return;
A(a,!1,!0)}else B&&(/ut|nd/.test(d)?(h[_remove](v),e[_remove](w)):(h[_add](v),e[_add](w)));if(_mobile)b.stopPropagation();else return!1}});a.on(_click+".i focus.i blur.i keyup.i keydown.i keypress.i",function(b){var d=b[_type];b=b.keyCode;if(d==_click)return!1;if("keydown"==d&&32==b)return c[_type]==r&&c[k]||(c[k]?q(a,k):x(a,k)),!1;if("keyup"==d&&c[_type]==r)!c[k]&&x(a,k);else if(/us|ur/.test(d))h["blur"==d?_remove:_add](s)});d.on(_click+" mousedown mouseup mouseover mouseout "+_touch,function(b){var d=
b[_type],e=/wn|up/.test(d)?t:v;if(!c[n]){if(d==_click)A(a,!1,!0);else{if(/wn|er|in/.test(d))h[_add](e);else h[_remove](e+" "+t);if(z.length&&B&&e==v)z[/ut|nd/.test(d)?_remove:_add](w)}if(_mobile)b.stopPropagation();else return!1}})})}})(window.jQuery||window.Zepto);




//Fix footer
function resizeApplication(){
   var winheight = $(window).height();
   var appheight = $('.navbar').height()+$('#main').height()+$('footer').height();
   if(appheight<winheight){
    var minheight = winheight - ($('.navbar').height()+$('footer').height()+175);
    $('#main').css('min-height',minheight+'px');
   }
   return false;
  }
  $(document).ready(function() {
   resizeApplication();
   $(window).resize(function() {
    resizeApplication();
   });
   
});

// fade in #top_button
jQuery(function () {
	jQuery(window).scroll(function () {
		if (jQuery(this).scrollTop() > 100) {
			jQuery('#backtotop').addClass("showme");
		} else {
			jQuery('#backtotop').removeClass("showme");
		}
	});
	// scroll body to 0px on click
	jQuery('#backtotop').click(function () {

		jQuery('body,html').animate({
			scrollTop: 0
		},  400);
		return false;
	});
});
if (jQuery(window).scrollTop() > 100)
jQuery('#backtotop').addClass("showme");

//progress bar animation
$(function() {
	$(".progress span").each(function() {
		$(this)
			.data("origWidth", $(this).width())
			.width(0)
			.animate({
				width: $(this).data("origWidth")
			}, 1200);
	});
});
