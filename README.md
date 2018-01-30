# Rocket Menu
A Javascript menu module.

* [Getting Started](#getting-started)
* [Basic Example](#basic-example)
* [Initialization](#initialization)
	* [Options](#options)
   * [Methods](#methods)
	* [Defaults](#defaults)

## Getting Started
Install via NPM.

```
npm install rocket-menu
```

**NOTE** that this module has a dependency [Rocket Tools (28kb)](https://github.com/chrishumboldt/Rocket-Tools) which will automatically be installed as well.

Start by including the necessary files.

```html
<head>
   <link href="node_modules/rocket-menu/css/menu.min.css" rel="stylesheet" type="text/css">
</head>
<body>
   /* Your content goes here */
   <script src="node_modules/rocket-tools/js/tools.min.js"></script>
   <script src="node_modules/rocket-menu/js/menu.min.js"></script>
</body>
```

## HTML Example
There are two different menu types and all use the same HTML. You require the trigger that will open the menu and the actual menu list. See an example below.

```html
<a id="menu-trigger" href>Open Menu</a>

<div id="menu-example" class="mod-menu">
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

## Initialization
Use the following example to trigger the menu module.

```js
Rocket.menu({
   target: '#menu-example',
   trigger: '#menu-trigger'
});
```

#### Options
Name | Default | Options | Description
---- | ---- | ---- | ----
`closeText` | `close` | | You can decide what you want the close text to say.
`reveal` | `left` | `left` `right` | Set the direction from which the menu appears. **NOTE** that this only applies to the slide menu.
`target` | | | Set the menu that you want to open.
`trigger` | | | Set the elements that will trigger the menu.
`type` | `slide` | `mini` `slide` | This determines the type of menu you want to use.

#### Methods
You can also manually execute certain methods once the menu has been initialised.

```js
// Initialize a menu
const menu = Rocket.menu({
   target: '#menu-example',
   trigger: '#menu-trigger'
});

// Show the menu
menu.show();

// Close the menu
setTimeout(() => {
   menu.close();
}, 4000);
```

#### Defaults
You can also overwrite the module options globally by altering the defaults. To do so reference the defaults object property. For example:

```js
Rocket.defaults.menu.closeText = 'Cancel';
```

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2018 Rocket Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
