# TinyToggle
jQuery plugin to create a flexible and beauty checkbox input

# WIP!!! The plugin is in develop.... coming soon!

## Install

Copy TinyToggle dist files and folders in the assets path of your website.

*Remember! TinyToggle plugin depends on jQuery*

```html
<script src="%your_assets_path%/jquery.js" type="text/javascript"></script>
<script src="%your_assets_path%/jquery.tinytoggle.min.js" type="text/javascript"></script>
```

Link the TinyToggle stylesheet
```html
<link href="%your_assets_path%/tinytoggle.min.css" rel="stylesheet">
```

## How to use?

It's easy, trust me!
First create a checkbox input tag in your HTML with the class 'tiny-toggle'

```html
<input type="checkbox" id="my-checkbox" name="opt1" class="tiny-toggle">
```

Now instantiate the plugin with javascript:

```js
$( document ).ready( function() {      
  $("#my-checkbox").tinyToggle();
});
```

**That's all... :)**

## Easy to customize

You can customize the checkboxes aspect and behaviors just set the defaults TinyToggle options, in this case the customization will take effect for all TinyToggle checkboxes in your page.

```html
<script type="text/javascript">
  $.fn.TinyToggle.defaults.type = 'square';  // Change the default type to 'square'
  
  // Define your custom size
  $.fn.TinyToggle.sizes['mysize'] = '36px';
  $.fn.TinyToggle.defaults.size = 'mysize';   // Change the default size to 'mysize'
  
  // Define your custom palette
  $.fn.TinyToggle.palettes['mypalette'] = {check:'#333333', uncheck:'#CCCCCC'};
  $.fn.TinyToggle.defaults.palette = 'mypalette';   // Change the default palette to 'mypalette'
</script>
```

Otherwise you can specify the options during the plug-in instantiation. In this case the customization will take effect only on the checkboxes matched by jQuery selector '#my-checkbox'

```js
$( document ).ready( function() {      
  $("#my-checkbox").tinyToggle({
    type:    'circle',
    palette: 'red',
    size:    'huge'
  });
});
```

Another way to customize TinyToggle is via data attribute in the html tag, this customization will overwrite all others previous customizations. 

```html
<input type="checkbox" id="my-checkbox" name="opt1" class="tiny-toggle"
  data-tt-type="like"
  data-tt-palette='purple'
  data-tt-size='monster'>
```

This is really usefull when, for some reason, you need to specify different type, color or size for someone of your checkboxes in the page. You can instantiate the plug-in for all checkboxes in the same time but your customization still remain active.

By data attribute you can customize deeper you checkboxes, for example you can set the custom check color and unchek color or define your custom size for TinyToggle.

```html
<input type="checkbox" id="my-checkbox" name="opt1" class="tiny-toggle" 
  data-tt-color-check="#000000"
  data-tt-color-uncheck="#CCCCCC"
  data-tt-custom-size="3.5em"
  >
```

#### Types
* toggle (default option)
* dot
* circle
* square
* square_v
* power
* check
* like
* watch
* star
* lock
* heart
* smile


#### Sizes 
* mini
* small
* medium (default option)
* large
* big
* huge
* monster
* giant

#### Palettes
* standard (default option)
* black
* white
* blue
* red
* green
* purple
* yellow


# Events and behaviours

TinyToggle has three events available, you can specify events like a function when the plug-in was started.

```js
$( document ).ready( function() {      
  $("#my-checkbox").tinyToggle({
    onChange:  function(checkbox, value)  { alert('value changed now is: ' + value) },
    onCheck:   function(checkbox)  { alert('value changed now is checked') },
    onUncheck: function(checkbox)  { alert('value changed now is unchecked') },
  });
});
```

# Methods

You can toggle the checkbox value programmatically using the 'toggle' implemented method.

```js
  $("#my-checkbox").tinyToggle('toggle');
```

