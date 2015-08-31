(function($){
    
    $.fn.TinyToggle =  {
        defaults: {
          type: 'toggle',  
          size: 'medium', 
          palette: 'standard',
          colors: null,
          icons: null,
          disabled: false,
          onReady: null,
          onChange: null,
          onCheck: null,
          onUncheck: null
        },
        types: {
          toggle:     { checked: 'tt-switch-on', unchecked: 'tt-switch-off' },
          check:      { checked: 'tt-check-v',   unchecked: 'tt-check-v' },
          circle:     { checked: 'tt-check-circle-empty-v', unchecked: 'tt-check-circle-empty-v' },
          square:     { checked: 'tt-check-square',   unchecked: 'tt-uncheck-square' },
          square_v:   { checked: 'tt-check-square-outbound-v',   unchecked: 'tt-check-square-outbound-v' },
          power:      { checked: 'tt-power',   unchecked: 'tt-power' },          
          dot:        { checked: 'tt-check-circle', unchecked: 'tt-uncheck-circle' },          
          like:       { checked: 'tt-like',   unchecked: 'tt-like' },
          watch:      { checked: 'tt-watch',   unchecked: 'tt-watch' },
          star:       { checked: 'tt-star',   unchecked: 'tt-star' },
          lock:       { checked: 'tt-lock',   unchecked: 'tt-lock' },
          heart:      { checked: 'tt-heart',   unchecked: 'tt-heart' },
          smile:      { checked: 'tt-smile',   unchecked: 'tt-smile' },
        },        
        palettes: {
          standard:     { check: '#009900', uncheck: '#999999' },
          black:        { check: '#000000', uncheck: '#999999' },
          white:        { check: '#FFFFFF', uncheck: '#999999' },
          blue:         { check: '#0066FF', uncheck: '#999999' },
          red:          { check: '#CC0000', uncheck: '#999999' },
          green:        { check: '#009933', uncheck: '#999999' },
          purple:       { check: '#CC3399', uncheck: '#999999' },
          yellow:       { check: '#FFCC00', uncheck: '#999999' }
        },
        sizes: {
        	mini: 		'1em',
        	small: 		'1.2em',
        	medium: 	'1.5em',
        	large: 		'2em',
        	big: 		  '2.5em',
        	huge: 		'3em',
        	monster: 	'4em',
        	giant: 		'5em'         		
        }
    }
  
    $.fn.tinyToggle = function(method) {
	    if ( _tinyToggleMethods[method] ) {
	        return _tinyToggleMethods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	      } else if ( typeof method === 'object' || ! method ) {
	        return _tinyToggleMethods.init.apply( this, arguments );
	      } else {
	        $.error( 'Method ' +  method + ' does not exist on $.tinyToggle' );
	      }       
    }; 

   var _tinyToggleMethods = {   
      init: function(options) {    
        if ( !options ) options = {};
        return this.each(function(){
          var opt = $.extend({}, $.fn.TinyToggle.defaults, options);             
          
          var me = $(this);
          me.hide();
          var wrapper = me.parent();              
          var span = $("<span/>").addClass("tt").append(me);
          var icon = $("<i></i>");
          
          // TEST THE DISABLE ATTRIBUTE FOR CHECKBOX
          if ( me.attr("disabled") != undefined ) opt.disabled = true;
          if ( opt.disabled ) span.addClass("tt-disabled");
          
          // SIZE AND CUSTOM SIZE
          if ( me.data("tt-size") != undefined ) opt.size = me.data("tt-size");
          var fontsize = $.fn.TinyToggle.sizes[opt.size];          
          if ( me.data("tt-custom-size") != undefined ) fontsize = me.data("tt-custom-size");          
          span.css("font-size", fontsize);
          
          // TYPE DEFINITION
          opt.icons = null;
          if ( me.data("tt-type") != undefined ) {
            if ( $.fn.TinyToggle.types[ me.data("tt-type") ] != undefined ) {
              opt.type = me.data("tt-type"); 
            }
          }              
          opt.icons = $.extend({}, $.fn.TinyToggle.types[ opt.type ]);
          
          // PALETTE DEFINITIONS
          if ( me.data("tt-palette") != undefined ) {
            if ( $.fn.TinyToggle.palettes[ me.data("tt-palette") ] != undefined ) {
              opt.palette = me.data("tt-palette");
            }
          }   
          
          // IF EXISTS COLORS OBJECT IN THE OPTIONS  USE THEM OTHERWISE LOAD PALETTE FROM
          // DEFALTS REPOSITORY
          if ( options.colors != null ) opt.colors = $.extend({}, options.colors);
          else opt.colors = $.extend({}, $.fn.TinyToggle.palettes[ opt.palette ]);
          
          // OVERWRITE COLORS WITH TAG DATA ATTRIBUTE IF EXISTS
          if ( me.data('tt-color-check') != undefined ) opt.colors.check = me.data('tt-color-check'); 
          if ( me.data('tt-color-uncheck') != undefined ) opt.colors.uncheck = me.data('tt-color-uncheck'); 
          
          
          // CHECK THE CURRENT STATUS OF CHECKBOX INPUT
          var check = me.is(":checked");
          if ( check ) {   
            icon.addClass( opt.icons.checked );
            icon.css('color', opt.colors.check);
          } else {
            icon.addClass( opt.icons.unchecked );
            icon.css('color', opt.colors.uncheck);               
          }                                         
          
          // APPEND ICON TO THE SPAN AND THE SPAN TO THE WRAPPER
          wrapper.append(span.append(icon));              
          
          // MANAGE CLICK EVENT ON THE ICON OBJECT
          icon.click(function(){
            me.tinyToggle("toggle");
          });    
          
          // MANAGE HOVER STATUS FOR THE SPAN WRAPPER
          span.hover(
              function() { if ( !me.data("disabled") ) $(this).find("i").addClass("tt-hover") },
              function() { if ( !me.data("disabled") ) $(this).find("i").removeClass("tt-hover") }  
          );
                        
          opt.ui = span;
          
          // STORE THE OBJECT DATA
          me.data( opt );     
          
          // CALLBACK ONREADY EVENT IF EXISTS
          if ( $.isFunction( opt.onReady ) ) opt.onReady.call(this, me);          
        });         
      },      
      toggle: function() {
        return this.each(function(){
          var me = $(this);
          if ( !me.data("disabled") ) {
            var check = me.is(":checked");
            var data = me.data();
            if ( check ) {
              data.ui.find("i").removeClass( data.icons.checked ).addClass( data.icons.unchecked ).css('color', data.colors.uncheck);
              me.prop("checked", false).removeAttr("checked");
              if ( $.isFunction(data.onUncheck) ) data.onUncheck.call(this, me);
            } else {
              data.ui.find("i").removeClass( data.icons.unchecked ).addClass( data.icons.checked ).css('color', data.colors.check);
              me.prop("checked", true).attr("checked", "checked");
              if ( $.isFunction(data.onCheck)) data.onCheck.call(this, me);
            }         
            if ( $.isFunction(data.onChange) ) data.onChange.call( this, me, me.is(":checked") );
          }
        });
      },
      check: function() {
        return this.each(function(){
          if ( !$(this).is(":checked") && !$(this).data("disabled")  )  $(this).tinyToggle("toggle");
        });
      },
      uncheck: function() {
        return this.each(function(){
        	if ( $(this).is(":checked") && !$(this).data("disabled") )  $(this).tinyToggle("toggle");
        });
      },
      disable: function() {
        return this.each(function(){
          $(this).data('disabled', true);
          $(this).data("ui").addClass("tt-disabled");
        });        
      },
      enable: function() {
        return this.each(function(){
          $(this).data('disabled', false);
          $(this).data("ui").removeClass("tt-disabled");
        });        
      }     
   };    
    
})( jQuery );