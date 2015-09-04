# TinyToggle v1.0.0
jQuery plugin to create a flexible and beauty checkbox input

TinyToggle is a simple and useful plug-in to mask the checkboxes html inputs tag in your html projects. You can choose from 13 different icons sets available, you can also customize colors palette and size as you like. 

TinyToggle is based on web fonts css it's easy to use and light to include in your project. 

Watch what TinyToggle can do at the [Demo Page](http://simonerighi.net/tinytoggle/demo)

## Install

Copy TinyToggle dist files and folders in the assets path of your website.

*Remember! TinyToggle plugin depends on jQuery*

```html
<script src="%your_js_assets_path%/jquery.js" type="text/javascript"></script>
<script src="%your_js_assets_path%/jquery.tinytoggle.min.js" type="text/javascript"></script>
```

Link the TinyToggle stylesheet
```html
<link href="%your_css_assets_path%/tinytoggle.min.css" rel="stylesheet">
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
$("#my-checkbox").tinyToggle({
  type:    'circle',
  palette: 'red', // you can also specify custom palettes Ex. 'mypalette'
  size:    'huge'
});
```

Otherwise customize TinyToggle via data attribute in the html tag, this customization will overwrite all others previous customizations. 

```html
<input type="checkbox" id="my-checkbox" name="opt1" class="tiny-toggle"
  data-tt-type="like"
  data-tt-palette='purple'
  data-tt-size='monster'>
```

This is really usefull when, for some reason, you need to specify different type, color or size for someone of your checkboxes in the page. You can instantiate the plug-in for all checkboxes in the same time but your customization still remain active.

By data attribute you can customize deeper you checkboxes, for example you can set the colors and specify custom size for this TinyToggle.

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


# Callbacks and behaviours

You may specify callback functions during the plug-in initialization.

```js      
$("#my-checkbox").tinyToggle({
  onReady:   function(checkbox)  { alert('TinyToggle is ready!'); },
  onChange:  function(checkbox, value)  { alert('value changed now is: ' + value); },
  onCheck:   function(checkbox)  { alert('value changed now is checked'); },
  onUncheck: function(checkbox)  { alert('value changed now is unchecked'); },
});
```

Use options 'disabled' set to true for lock the TinyToggle controller.

```js      
$("#my-checkbox").tinyToggle({
  disabled:   true
});
```
Otherwise you can specify the attribute 'disabled' in the checkbox HTML tag attributes to lock controller.

```html
<input type="checkbox" id="my-checkbox" name="opt1" class="tiny-toggle" disabled>
```


# Methods

You can interact with the controller using the implemented methods.


### Toggle
Switch the status of checkbox.

```js
  $("#my-checkbox").tinyToggle('toggle');
```

### Check
Set checkbox checked if current status is unchecked otherwise do nothing.

```js
  $("#my-checkbox").tinyToggle('check');
```

### Uncheck
Set checkbox unchecked if current status is checked otherwise do nothing.

```js
  $("#my-checkbox").tinyToggle('uncheck');
```

### Enable
Enable checkbox

```js
  $("#my-checkbox").tinyToggle('enable');
```

### Disable
Disable checkbox

```js
  $("#my-checkbox").tinyToggle('disable');
```



## License
Copyright &copy; Simone Righi (simone.righi@icloud.com)<br>
Licensed under the MIT license.
