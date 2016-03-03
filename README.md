# Menuplate
A Javascript menu component.

## Getting Started
You can either download a copy of the source files or install Menuplate via Bower.

```
bower install menuplate
```

Start by including the necessary files.

```
<head>
	<link href="css/menuplate.css" rel="stylesheet" type="text/css">
</head>
<body>
	/* Your content goes here */
	<script src="js/min/menuplate.js"></script>
</body>
```

## HTML Example
There are three different menu types and all use the same HTML. You require the trigger that will open the menu and the actual menu list. See an example below.

```
<a id="menu-trigger" href="#menu-example">Open Menu</a>
<div id="menu-example">
   <ul>
      <li><h6>Menu</h6></li>
      <li><a href="#">Link One</a></li>
      <li><a href="#">Link Two</a></li>
      <li><a href="#">Link Three</a></li>
      <li><a href="#">Link Four</a></li>
      <li><a href="#">Link Five</a></li>
   </ul>
</div>
```

## Execute Via Javascript
Use the following example to trigger the menu component.

```
<script>
new menuplate({
	selector: '#menu-trigger'
});
</script>
```

## Javascript Options
There are a few options that allow changing the menu type and your desired reveal. They can be assigned to the second argument of the Menuplate component call.

```
<script>
new menuplate({
	selector: '#menu-trigger',
   type: 'fullscreen'
});
</script>
```

| Name | Default | Options | Description |
| ---- | ---- | ---- | ---- |
| selector | .menu-trigger | | Set the HTML selector. |
| type | slide | slide, contextual, fullscreen | This determines the type of menu you want to use. |
| clone | false | true, false | Clone the menu HTML and use that for the component or if false use the designated HTML. |
| close | close | | You can decide what you want the close text to say. |
| reveal | left | left, right, top, bottom | Set the direction from which the menu appears. **NOTE** that the bottom and top option only applies to the fullscreen menu type. |

#### Defaults
You can also set or overwrite the above options globally by altering the Menuplate defaults. To do so reference the **$menuplateDefault** object. For example:

```
<script>
// Default change
$menuplateDefault.selector = '.menu-link';
$menuplateDefault.type = 'fullscreen';

// Execute
new menuplate();
</script>
```

## Advanced Example
See an advanced example below with options as per the above.

```
<a href id="menu-trigger" data-menu-link="#menu-example">Open Navigation</a>
<div id="menu-example">
   <ul>
      <li><h6>Navigation</h6></li>
      <li><a href="#">Link One</a></li>
      <li><a href="#">Link Two</a></li>
      <li><a href="#">Link Three</a></li>
      <li><a href="#">Link Four</a></li>
      <li><a href="#">Link Five</a></li>
   </ul>
</div>

<script src="js/min/menuplate.js"></script>
<script>
new menuplate('#menu-trigger', {
   type: 'fullscreen',
   reveal: 'right'
});
</script>
```

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2016 Webplate Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
