(function($){
    
    var TinyToggle =  {
        defaults: {
          type: 'toggle',  // [toggle, circle, dotCircle, square]
          size: 'medium',  // [small, medium, large, huge, monster, giant]
          palette: 'standard',
          colors: null,
          icons: null,
          onChange: null          
        },
        types: {
          toggle:     { checked: 'tt-switch-on', unchecked: 'tt-switch-off' },
          circle:     { checked: 'tt-check-circle', unchecked: 'tt-uncheck-circle' },
          square:     { checked: 'tt-check-square',   unchecked: 'tt-uncheck-square' },
          power:      { checked: 'tt-power',   unchecked: 'tt-power' },
        },        
        palettes: {
          standard:     { check: '#009900', uncheck: '#999999' },
          power:        { check: '#FFFF00', uncheck: '#FFCC00' }
        },               
        setDefaults: function($options) {
          TinyToggle.defaults = jQuery.extend(TinyToggle.defaults, options);
        },
        colorLuminance: function(hex, lum) {
          hex = String(hex).replace(/[^0-9a-f]/gi, '');
          if (hex.length < 6) { hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]; }
          lum = lum || 0;
          var rgb = "", c, i;
          for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
          }
          return rgb;
        }        
    }
  
    jQuery.fn.tinyToggle = function(method) {
        if ( _tinyToggleMethods[method] ) {
            return _tinyToggleMethods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
          } else if ( typeof method === 'object' || ! method ) {
            return _tinyToggleMethods.init.apply( this, arguments );
          } else {
            jQuery.error( 'Method ' +  method + ' does not exist on jQuery.tinyToggle' );
          }       
    }; 

   var _tinyToggleMethods = {   
      init: function(options) {
        
        return this.each(function(){
          var opt = jQuery.extend({}, TinyToggle.defaults, options);               
          var me = jQuery(this);
          me.hide();
          var wrapper = me.parent();              
          var span = jQuery("<span/>").addClass("tt").append(me);
          var icon = jQuery("<i></i>");
          
          if ( me.data("tt-size") != undefined ) opt.size = me.data("tt-size");          
          span.addClass(opt.size);
          
          // TYPE DEFINITION
          if ( me.data("tt-type") != undefined ) {
            if ( TinyToggle.types[ me.data("tt-type") ] != undefined ) {
              opt.type = me.data("tt-type"); 
            }
          }              
          opt.icons = TinyToggle.types[ opt.type ];
          
          // PALETTE DEFINITIONS
          if ( me.data("tt-palette") != undefined ) {
            if ( TinyToggle.palettes[ me.data("tt-palette") ] != undefined ) {
              opt.palette = me.data("tt-palette");
            }
          }                        
          opt.colors = TinyToggle.palettes[ opt.palette ];
          
          
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
          
          icon.click(function(){
            me.tinyToggle("toggle");
          });    
          
          span.hover(
              function() { $(this).find("i").addClass("tt-hover") },
              function() { $(this).find("i").removeClass("tt-hover") }  
          );
                        
          opt.ui = span;             
          if ( jQuery.isFunction(opt.onChange) ) {
            opt.onChange = opt.onChange;
          }             
          
          // STORE THE OBJECT DATA
          me.data( opt );          
        });         
      },      
      toggle: function() {
        return this.each(function(){
          var me = jQuery(this);
          var check = me.is(":checked");
          var data = jQuery(this).data();
          if ( check ) {
            data.ui.find("i").removeClass( data.icons.checked ).addClass( data.icons.unchecked ).css('color', '#'+data.colors.uncheck);
            me.prop("checked", false);
          } else {
            data.ui.find("i").removeClass( data.icons.unchecked ).addClass( data.icons.checked ).css('color', '#'+data.colors.check);
            me.prop("checked", true);
          }         
          if ( data.onChange ) {
            data.onChange.call( me, check );
          }         
        });
      },
      onChange: function(handler) {
        return this.each(function(){
          var me = jQuery(this);
          var data = jQuery(this).data();
          data.onChange = handler; 
        });
      }           
   };    
    
})( jQuery );