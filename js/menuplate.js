/**
 * File: js/menuplate.js
 * Type: Javascript component file
 * Author: Chris Humboldt
 */

// Table of contents
// Defaults
// Variables
// Options
// Tools

// Defaults
var $menuplateDefault = {
	selector: '.menuplate-trigger',
	clone: false,
	close: 'close',
	reveal: 'left',
	type: 'slide',
	position: 'on'
};

var menuplate = function($userOptions) {
	// Variables
	var $self = this;

	// Options
	$userOptions = $userOptions || false;
	$self.options = {
		selector: $userOptions.selector || $menuplateDefault.selector,
		clone: $userOptions.clone || $menuplateDefault.clone,
		close: $userOptions.close || $menuplateDefault.close,
		type: $userOptions.type || $menuplateDefault.type,
		reveal: $userOptions.reveal || $menuplateDefault.reveal,
		position: $userOptions.position || $menuplateDefault.position
	}

	// Tools
	var tool = function(document, $options) {
		// HTML
		var $menuOverlay = document.createElement('div');
		$menuOverlay.id = 'web-overlay';
		var $toolHtml = {
			menuOverlay: $menuOverlay
		};

		// Elements
		var $toolEl = {
			body: document.getElementsByTagName('body')[0],
			html: document.getElementsByTagName('html')[0]
		};

		// Functions
		var classAdd = function($element, $class) {
			if (exists($element)) {
				if (typeof $class === 'object') {
					for (var $i = 0, $len = $class.length; $i < $len; $i++) {
						classAddExecute($element, $class[$i]);
					}
				} else {
					classAddExecute($element, $class);
				}
			}
		};
		var classAddExecute = function($element, $class) {
			var $crtClass = $element.className;
			if ($crtClass.match(new RegExp('\\b' + $class + '\\b', 'g')) === null) {
				$element.className = $crtClass === '' ? $class : $crtClass + ' ' + $class;
			}
		};
		var classClear = function($element) {
			if (exists($element)) {
				$element.removeAttribute('class');
			}
		};
		var classRemove = function($element, $class) {
			if (exists($element)) {
				if (typeof $class === 'object') {
					for (var $i = $class.length - 1; $i >= 0; $i--) {
						classRemoveExecute($element, $class[$i]);
					}
				} else {
					classRemoveExecute($element, $class);
				}
			}
		};
		var classRemoveExecute = function($element, $class) {
			if ($element.className.indexOf($class) > -1) {
				$element.className = $element.className.split(' ').filter(function($val) {
					return $val != $class;
				}).toString().replace(/,/g, ' ');
				if ($element.className === '') {
					classClear($element);
				}
			}
		};
		var eventAdd = function($elem, $type, $eventHandle) {
			if ($elem == null || typeof($elem) == 'undefined') return;
			if ($elem.addEventListener) {
				$elem.addEventListener($type, $eventHandle, false);
			} else if ($elem.attachEvent) {
				$elem.attachEvent("on" + $type, $eventHandle);
			} else {
				$elem["on" + $type] = $eventHandle;
			}
		};
		var eventRemove = function($elem, $type, $eventHandle) {
			if ($elem == null || typeof($elem) == 'undefined') return;
			if ($elem.removeEventListener) {
				$elem.removeEventListener($type, $eventHandle, false);
			} else if ($elem.detachEvent) {
				$elem.detachEvent("on" + $type, $eventHandle);
			} else {
				$elem["on" + $type] = $eventHandle;
			}
		};
		var exists = function($element) {
			return ($element === null || typeof($element) === undefined) ? false : true;
		};
		var hasClass = function($element, $class) {
			return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
		};
		var hasWhiteSpace = function($check) {
			return /\s/.test($check);
		};
		var isTouch = function() {
			return 'ontouchstart' in window || 'onmsgesturechange' in window;
		};

		// Return
		return {
			classAdd: classAdd,
			classClear: classClear,
			classRemove: classRemove,
			element: $toolEl,
			eventAdd: eventAdd,
			eventRemove: eventRemove,
			exists: exists,
			hasClass: hasClass,
			hasWhiteSpace: hasWhiteSpace,
			html: $toolHtml,
			isTouch: isTouch
		}
	}(document, $self.options);

	// Apply to element
	var $selectorType = $self.options.selector.charAt(0).toString();
	if ($selectorType === '#' && !tool.hasWhiteSpace($self.options.selector)) {
		new menuplateComponent(document.getElementById($self.options.selector.substring(1)), $self.options, tool);
	} else {
		var $elements = document.querySelectorAll($self.options.selector);
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			new menuplateComponent($elements[$i], $self.options, tool);
		};
	}
};

var menuplateComponent = function($this, $option, tool) {
	if (tool.exists($this)) {
		// Variables
		var $self = $this;
		var $link = $self.getAttribute('href');
		var $menuElement = document.querySelector($link);

		// Functions
		function menuSetup() {
			if (!tool.isTouch()) {
				tool.classAdd(tool.element.html, 'mnp-no-touch');
			}
			if (!tool.exists(document.getElementById('web-overlay'))) {
				tool.element.body.appendChild(tool.html.menuOverlay);
			}
			tool.classAdd($self, 'mnp-trigger');

			// Clone
			if ($option.clone === true) {
				var $menuClone = $menuElement.cloneNode(true);
				tool.classAdd($menuClone, 'mnp clone _t-' + $option.type + ' _r-' + $option.reveal);
				tool.element.body.appendChild($menuClone);
				$menuElement = $menuClone;
			} else {
				tool.classAdd($menuElement, 'mnp _t-' + $option.type + ' _r-' + $option.reveal);
				setTimeout(function() {
					tool.classAdd($menuElement, 'mnp-ready');
				}, 500);
			}

			// Fullscreen option
			if ($option.type == 'fullscreen') {
				var $menuClose = document.createElement('a');
				$menuClose.className = 'mnp-close';
				$menuClose.innerHTML = $option.close;
				$menuElement.appendChild($menuClose);
			}

			// Contextual option
			if ($option.type == 'contextual') {
				var $menuCloseUl = document.createElement('ul');
				var $menuCloseLi = document.createElement('li');
				var $menuClose = document.createElement('a');
				$menuClose.className = 'mnp-close';
				$menuClose.innerHTML = $option.close;
				$menuCloseUl.className = 'close-list';
				$menuCloseLi.appendChild($menuClose);
				$menuCloseUl.appendChild($menuCloseLi);
				if (!tool.exists($menuElement.querySelector('.mnp-close'))) {
					$menuElement.appendChild($menuCloseUl);
				}
			}
		}

		function menuReveal() {
			var $menuLinks = $menuElement.querySelectorAll('a');
			var $menuLinkClose = $menuElement.querySelectorAll('a.mnp-close');
			$self.onclick = function(event) {
				event.preventDefault();
				if (!tool.hasClass($menuElement, 'mnp-display')) {
					if ($option.position == 'on') {
						var $clickX = event.clientX;
						var $clickY = event.clientY + (tool.element.body.scrollTop);
					}

					menuRemoveHTMLOptionClasses();
					var $openMenus = document.querySelectorAll('.mnp.mnp-display');
					for (var $i = 0, $len = $openMenus.length; $i < $len; $i++) {
						tool.classRemove($openMenus[$i], 'mnp-display');
					}
					tool.classAdd($menuElement, 'mnp-display');
					tool.classAdd(tool.element.html, 'mnp-reveal mnp-t-' + $option.type);
					if ($option.type == 'contextual' && (window.innerWidth >= 700) && ($option.position == 'on')) {
						$menuElement.style.top = $clickY + 20 + 'px';
						$menuElement.style.left = $clickX + 'px';
					}
					// window.addEventListener('resize', menuClose);
					tool.eventAdd(window, 'resize', menuClose);
					document.getElementById('web-overlay').onclick = function() {
						menuClose();
					};
				} else {
					menuClose();
				}
			};
			for (var $i = $menuLinks.length - 1; $i >= 0; $i--) {
				$menuLinks[$i].onclick = function() {
					menuClose();
				};
			}
			for (var $i = $menuLinkClose.length - 1; $i >= 0; $i--) {
				$menuLinkClose[$i].onclick = function() {
					menuClose();
				};
			}
		}

		function menuClose() {
			tool.eventRemove(window, 'resize', menuClose);
			if (tool.exists(document.querySelector('.mnp.mnp-display'))) {
				tool.classRemove(document.querySelector('.mnp.mnp-display'), 'mnp-display');
			}
			tool.classRemove(tool.element.html, 'mnp-reveal');
			$menuElement.removeAttribute('style');
			menuRemoveHTMLOptionClasses();
		}

		function menuRemoveHTMLOptionClasses() {
			tool.classRemove(tool.element.html, 'mnp-t-slide');
			tool.classRemove(tool.element.html, 'mnp-t-fullscreen');
			tool.classRemove(tool.element.html, 'mnp-t-contextual');
		}

		// Execute
		menuSetup();
		menuReveal();
	}
};