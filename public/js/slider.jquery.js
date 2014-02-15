;
"use strict";

(function($,window){
  var settings,defaults,methods;

  defaults = { 
    control_next: "<a>",
    control_back: "<a>",
    class_action_next: 'slider_next',
    class_action_back: 'slider_back',
    content: this,

  };

  methods = {
    init : function(options) {
      settings = $.extend(defaults,options);
      return this.each(function(){
        $this = $(this);
        $this.slider('config');
      });
    },
    config: function(){
      this.slider('styling_container');
      this.children().addClass('slide right');
      this.children().eq(0).removeClass('right').addClass('active');
      this.slider('controls');
      this.slider('events');
    },
    styling_container:function(){
      this.addClass('container_slider');
    },
    controls: function(){
      $(settings.control_back)
        .data("data-sliderback","true")
        .addClass(settings.class_action_back);

      $(settings.control_next)
        .data("data-slidernext","true")
        .addClass(settings.class_action_next);
    },
    events:function(){
      slider_container = $(settings.content);
      slider_container.on('click',settings.control_next,function(e){
        e.preventDefault();
        slider_container.slider('back')
      });
      slider_container.on('click',settings.control_back,function(e){
        e.preventDefault();
        slider_container.slider('next')
      });

    },
    next:function(){
      active = this.find('.active');
      next_element = active.next();
      if(next_element.hasClass('slide')){
        active.removeClass('active').addClass('left');
        next_element.removeClass('right').addClass('active');
      }
      else{
        first = this.find('.slide:first');
        all = this.find('.slide:not(:first)');
        first.removeClass('left').addClass('active');
        all.removeClass('left active').addClass('right');
      }
    },
    back: function(){
      active = this.find('.active');
      back_element = active.prev();
      if(back_element.hasClass('slide')){
        active.removeClass('active').addClass('right');
        back_element.removeClass('left').addClass('active');
      }
      else{
        last = this.find('.slide:last');
        all = this.find('.slide:not(:last)');
        last.removeClass('left right').addClass('active');
        all.removeClass('right active').addClass('left');
      }
    },
    slides: function(){
      return this.find('.slide');
    }
  };

  $.fn.slider = function(methodOrOptions) {
    if ( methods[methodOrOptions] ) {
        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
        return methods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.slider' );
    }    
  };
})(jQuery,window,undefined);
