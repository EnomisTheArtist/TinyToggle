# TinyToggle
jQuery plugin to create a flexible and modern checkbox input

Watch what TinyToggle can do at the [Docs Page](http://tinytoggle.simonerighi.net/)

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

## Documentation
Read complete documentation in [TinyToggle Offical Page](http://tinytoggle.simonerighi.net/)


## License
Copyright &copy; Simone Righi (simone.righi@icloud.com)<br>
Licensed under the MIT license.
