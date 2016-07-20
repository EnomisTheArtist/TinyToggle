(function($){
    
    $.fn.TinyToggle =  {
        defaults: {
          labels: {both: null, check: null, uncheck: null},
          type: 'toggle',  
          size: 'medium', 
          palette: 'standard',
          colors: null,
          icons: null,
          group: null,
          disabled: false,
          onReady: null,    // Fired when the control is ready
          onClick: null,    // Fired when user click on the controller
          onChange: null,   // Fired when the value of input change          
          onCheck: null,    // Fired when the controller become checked
          onUncheck: null,  // Fired when the controller become unchecked
          onEnabled: null,  // Fired when the controller become enabled
          onDisabled: null  // Fired when the controller become disabled
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
          var container = $("<span/>").addClass("tt").append(me);
          var span = $("<span\>").addClass("tt-icon");
          var icon = $("<i/>");          
          span.append(icon);
          
          // CHECK GROUP DATA ATTRIBUTE
          if ( me.data("tt-group") != undefined ) opt.group = me.data("tt-group");
          
          // CHECK LABEL DATA ATTRIBUTE
          opt.labels = $.extend({}, options.labels);
          if ( me.data("tt-label") != undefined ) opt.labels.both =  me.data("tt-label");
          if ( me.data("tt-label-check") != undefined ) opt.labels.check =  me.data("tt-label-check");
          if ( me.data("tt-label-uncheck") != undefined ) opt.labels.uncheck =  me.data("tt-label-uncheck");
          
          // TEST THE DISABLE ATTRIBUTE FOR CHECKBOX
          if ( me.attr("disabled") != undefined ) opt.disabled = true;
          if ( opt.disabled ) container.addClass("tt-disabled");
          
          // SIZE AND CUSTOM SIZE
          if ( me.data("tt-size") != undefined ) opt.size = me.data("tt-size");
          var fontsize = $.fn.TinyToggle.sizes[opt.size];          
          if ( me.data("tt-custom-size") != undefined ) fontsize = me.data("tt-custom-size");          
          container.css("font-size", fontsize);
          
          // TYPE DEFINITION
          opt.icons = null;
          if ( me.data("tt-type") != undefined ) {
            if ( $.fn.TinyToggle.types[ me.data("tt-type") ] != undefined ) {
              opt.type = me.data("tt-type"); 
            }
          }              
          
          opt.icons = $.extend({}, $.fn.TinyToggle.types[ opt.type ]);
          
          // CUSTOM ICONS DEFINITION
          // IF YOU WANT USE COMPLETE FONT-AWSOME ICONSETS YOU CAN
          // SET THE ATTRIBUTES: data-tt-icon-check="fa fa-camera-retro"
          if ( me.data("tt-icon-check") != undefined ) {
            opt.icons = { checked: me.data("tt-icon-check"), unchecked: me.data("tt-icon-check") };
          }          
          if ( me.data("tt-icon-uncheck") != undefined ) {
            opt.icons.unchecked =  me.data("tt-icon-uncheck");
          }
          
          
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
            span.css('color', opt.colors.check);
          } else {
            icon.addClass( opt.icons.unchecked );
            span.css('color', opt.colors.uncheck);               
          }                                         
          
          span.addClass("tt-switch-color");
          
          // APPEND ICON TO THE SPAN AND THE SPAN TO THE WRAPPER
          container.append(span);          
          if ( opt.labels ) {
            var init_label = opt.labels.both;            
            if ( check && opt.labels.check ) init_label = opt.labels.check;
            else if ( !check && opt.labels.uncheck ) init_label = opt.labels.uncheck;            
            if ( init_label != null && init_label != "" ) {
              var label_tag = $("<span/>").addClass("tt-label").html(init_label);
              
              // MANAGE CLICK EVENT IN LABEL
              label_tag.click(function() {
                if ( !me.data().disabled ) {
                  me.tinyToggle("toggle");
                  if ( $.isFunction( me.data().onClick ) ) me.data().onClick.call(this, me) ;
                }
              });
              
              // MANAGE HOVER STATUS
              label_tag.hover(
                  function() { if ( !me.data("disabled") ) $(this).parent().find("span.tt-icon").addClass("tt-hover") },
                  function() { if ( !me.data("disabled") ) $(this).parent().find("span.tt-icon").removeClass("tt-hover") }  
              );
              
              container.append(label_tag);              
            }            
          }

          wrapper.append(container); 
          
          opt.ui = container;
                    
          // MANAGE CLICK EVENT ON THE ICON OBJECT
          icon.click(function(){   
            if ( !me.data().disabled ) {
              me.tinyToggle("toggle");
              if ( $.isFunction( me.data().onClick ) ) me.data().onClick.call(this, me);
            }
          });    
          
          // MANAGE HOVER STATUS FOR THE ICON                        
          icon.hover(
              function() { if ( !me.data("disabled") ) $(this).addClass("tt-hover") },
              function() { if ( !me.data("disabled") ) $(this).removeClass("tt-hover") }  
          );     
                              
          // CALLBACK ONREADY EVENT IF EXISTS
          if ( $.isFunction( opt.onReady ) ) opt.onReady.call(this, me);
          
          // STORE THE OBJECT DATA
          me.data( opt ); 
        });         
      },     
      toggle: function(group) {
        return this.each(function(){
          var me = $(this);
          var data = me.data();
          var check = me.is(":checked");              
          if ( group == undefined || data.group == group ) {             
            if ( check ) me.prop("checked", false).removeAttr("checked");
            else me.prop("checked", true).attr("checked", "checked");   
            me.tinyToggle('refresh');
            if ( $.isFunction(data.onChange) ) data.onChange.call( this, me, me.is(":checked") );
          }
        });
      },
      refresh: function(group) {        
        return this.each(function(){
          var me = $(this);
          var data = me.data();
          var check = me.is(":checked"); 
          if ( group == undefined || data.group == group ) { 
            if ( check ) {
              data.ui.find("i").removeClass( data.icons.unchecked ).addClass( data.icons.checked );
              data.ui.find("span.tt-icon").css('color', data.colors.check);
              if ( data.labels.check ) data.ui.find(".tt-label").html( data.labels.check );
              if ( $.isFunction(data.onCheck)) data.onCheck.call(this, me);                
            } else {
              data.ui.find("i").removeClass( data.icons.checked ).addClass( data.icons.unchecked );
              data.ui.find("span.tt-icon").css('color', data.colors.uncheck);
              if ( data.labels.uncheck ) data.ui.find(".tt-label").html( data.labels.uncheck );
              if ( $.isFunction(data.onUncheck) ) data.onUncheck.call(this, me);
            }                
          }
        });        
      },
      check: function(group) {
        return this.each(function(){
          var me = $(this);
          var data = me.data();  
          if ( group == undefined || data.group == group ) {  
            if ( !me.is(":checked") ) me.tinyToggle("toggle");
          }
        });
      },
      uncheck: function(group) {
        return this.each(function(){
          var me = $(this);
          var data = me.data();
          if ( group == undefined || data.group == group ) {
            if ( me.is(":checked") )  me.tinyToggle("toggle");
          }
        });
      },
      disable: function(group) {
        return this.each(function() {
          var me = $(this);
          var data = me.data();
          if ( group == undefined || data.group == group ) {
            if ( data.disabled == false ) {
              me.data('disabled', true);
              me.data("ui").addClass("tt-disabled");
              if ( $.isFunction(data.onDisabled ) ) data.onDisabled.call( this, me, me.is(":checked") );
            }
          }
        });        
      },
      enable: function(group) {
        return this.each(function() {
          var me = $(this)
          var data = me.data();
          if ( group == undefined || data.group == group ) {             
            if ( data.disabled == true ) {
              me.data('disabled', false);
              me.data("ui").removeClass("tt-disabled");
              if ( $.isFunction(data.onEnabled) ) data.onEnabled.call( this, me, me.is(":checked") );
            }
          }
        });        
      },
      event: function( event_name, handler ) {
        return this.each(function(){
          var me = $(this)
          me.data(event_name, handler);
        });
      }
   };    
    
})( jQuery );