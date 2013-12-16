
Introduction
============

Tocm is CSS generator for javascript. With Tocm you can create and manage css on the fly without writing css file. With Tocm you can also create or manage Media Query, Fonts, Keyframes and Animations. Tocm was builded with jQuery included. To use Tocm, just embed the tocm file to your head and then you can embed your js file that contains class, font, etc. Example:

```html
<script src="script/tocm-1.1.min.js"></script>
```

####Why Tocm?
Tocm is easey to use, flexible and configurable. Tocm available for chaining and nested method. You can use your javascript experience when building stylesheet, like using math when defining css property value and etc. See ui definition sample bellow:

```js
// Creating definition.
var bColor = '#fff';
var fColor = '#333';

var baseWidth = 1360;
var bgImage = 'url(img/bg.jpg)';

// Creating class using nested method.
$.class('.wrapper', {
	background_color: bColor, color: fColor, width: baseWidth,

	'.half': {
		width: (baseWidth / 2)
	},
	// Creating class with width inheriting from window.innerWidth
	'.from-screen': {
		width: window.innerWidth
	},
}

// Add background image if defined using chaining method.
if (bgImage !== '') {
	$.class('.ui').set('background_image', bgImage);
}
```

Features:
=========
####Tocm Font
Tocm Font is a `font-face` generator. With Tocm Font you can embed your web font with easy way.
Usage:

```js
$.font(name, source, options);
```

where `name` is string `font-face` name, `source` is array containing the url of font, and `options` is optional font-face options. Example:

```js
$.font('Open Sans', [
	'font/opensans.eot',
	'font/opensans.ttf',
	'font/opensans.woff'
], {
	font_style: 'normal',
	font_weight: 600
});
```

Bellow is generated css by code above:

```css
@font-face {
	font-family: "Open Sans";
	src: local("Open Sans");
	src: url("font/opensans.eot");
	src: url("font/opensans.eot?#iefix") format("embedded-opentype");
	src: url("font/opensans.ttf") format("truetype");
	src: url("font/opensans.woff") format("woff");
	font-style: normal;
	font-weight: 600;
}

```

####Tocm Media
Tocm Media is Media Query generator. With Tocm Media you can group your class without escaping from current class scope event in nested method. Usage:

```js
$.media(name, rule);
```

where `name` is string media name. Name should only contains a-z ad A-Z characters. `rule` is string media query rule. Example:

```js
$.media('Mobile', 'screen and (max-width: 640px)');
```

After creating media, then you can group your class with this method:

```js
$.class('body@Mobile', {
	width: 640, height: '100%', padding: 10, margin: 0
});
``` 

Sample above is grouping `body` class to `Mobile` media. Bellow is generated css by code above:

```css
@media screen and (max-width: 640px) {
	body {
		height: 100%;
		margin: 0px;
		padding: 10px;
		width: 640px;
	}
}
```

####Tocm Keyframe
Tocm Keyframe is CSS3 Keyframes generator. Usage:

```js
$.keyrame(name, position, properties);
```

where `name` is string keyframe name `a-zA-Z_`, `position` is frame position, and `properties` is css properties for current position. Example:

```js
$.keyframe('TurnLeft', '0%', {
	left: 20, top: 0
});
```
Bellow is generated css by code above:

```css
@keyframes TurnLeft {
	0% {
		left: 20px;
		top: 0px;
	}
}

@-webkit-keyframes TurnLeft {
	0% {
		left: 20px;
		top: 0px;
	}
}
```

To add next position to keyframe, simply select the keyframe or add them directly when you create the keyframe. Example:

```js
// SELECTING
$.keyframe('TurnLeft').at('10%', { left: 50 });
$.keyframe('TurnLeft').at('100%', { left: '-100%' });

// DIRECTLY
$.keyframe('TurnLeft', '0%', {left: 20, top: 0}).at('10%', {left: 50}).at('100%', {left: '-100%'});
```

Now, the `TurnLeft` keyframe become:

```css
@keyframes TurnLeft {
	0% {
		left: 20px;
		top: 0px;
	}
	10% {
		left: 50px;
	}
	100% {
		left: -100%;
	}
}

@-webkit-keyframes TurnLeft {
	0% {
		left: 20px;
		top: 0px;
	}
	10% {
		left: 50px;
	}
	100% {
		left: -100%;
	}
}
```

####Tocm Animation
Tocm Animation is animation generator. With Tocm Animation you can create animation definition without manually define the keyframe and class. Tocm animation support nested method. It's mean that you can define multiple animation definition for parent class and child class. Child class will follow the parent properties if you not define their properties. Tocm animation also support onRun and onEnd callback for each animation. It's mean you can attach function to handle when animation has been started and finished. Usage:

```js
$.anime(name, properties);

// name is the animation name. It's used when you attach the animation to DOM element.
// properties is collection of animation properties. It's including keyframe position, animation rule, and css properties.
```
######Animation Rule:
* duration				--> *animation duration (in sec). Default is 0.*
* timing				--> *animation timing function. Default is 'linear'.*
* delay					--> *animation delay (in sec) before start. Default is 0.*
* repeat				--> *animation repeating (number). Default is 1, use 'infinite' to allways repeat.*
* direction				--> *animation direction.
* inherit				--> *(boolean) inherit parent properties or not. Default is true.*

#####Expamle:
```js
// Creating animation to move node to left.
$.anime('turnLeft', {
	// Parent properties. Animation rules using the default rules.
	'0%': {
		left: 0
	},
	'20%': {
		left: '20%'
	},
	'100%': {
		left: '-100%'
	},
	
	// Child animation with class name '.title'.
	'.title': {
		duration: 1,
		delay: 0.5
	},
	// Child animation with class name '.description'.
	'.description': {
		duration: 1,
		delay: 0.7
	}
});

// Attaching animation to node.
$('.content').addAnimation('turnLeft');

// To attach callback, just define the functions to animation, then attach the animation to node.
$.anime('turnLeft')
.onRun = function () {
	console.log('Animation started');
})
.onEnd = function () {
	console.log('Animation ended');
});
```

Sample above will animate the node with class '.content'. Since the parent animation doesn't have duration (0sec), it's mean the parent animation is only animation keyframe definiton to use as child keyframe. Then the child node with class '.title' and '.description' will animated with parent animation keyframe properties. The difference is only in delay before the animation start. 

####Tocm Class
Tocm Class is css generator. You can create class with two group: Family and Global. Family class will written to single style node with `family-name` as the `id` attribute. Global class will be written to global class node.  Family class is default method where you doesn't need to add prefix to the class name. While global, you need to add global identifier to the class name. Both Family and Global group is builded to makes debugging stylesheet easily since you can find the block of code in each style nodes.

When building stylesheet, you can using Basic and Nested method. Using basic method will give more options, but need lot of work. While using nested method, you can create a class and child classes easily. With nested method you doesn't need to write the parent class name. Just put the child classes under the parent class scope. Child classes fill follow the parent class group, except you define a new group in child classes.

Besides building stylesheet, you can also modify the class properties. Just select the class, and then set their property. Usage: `.set(string property, value) >> $.class('.clearfix').set('padding', 20)` 

or 

`.set(object property) >> $.class('.clearfix').set({padding: 20, margin: 20})`

###Example:

```js
// Family Class
$.class('.clearfix', {
	$zoom: 1,

	after: {
		display: 'table', clear: 'both'
	}
});

// Global Class
$.class('!.clearfix', {
	$zoom: 1,

	after: {
		display: 'table', clear: 'both'
	}
});

// Family class with media group.
$.class('.clearfix@Mobile', {
	$zoom: 1,

	after: {
		display: 'table', clear: 'both'
	}
});

// Global Class with media group.
$.class('!.clearfix@Mobile', {
	$zoom: 1,

	after: {
		display: 'table', clear: 'both'
	}
});
```

Advanced Sample.
================

```js
// Basic method.
// Using global group.
```
####Tocm Code
```js
$.class('!.container', {
	width: '100%', display: 'block', margin: 0, padding: 0
});
$.class('!.wrapper', {
	width: '100%', max_width: 960, margin: '0 auto'
});
```
####Result:
```html
<style id="Global Class" data="universal" type="text/css">
	.container {
		display: block;
		margin: 0px;
		padding: 0px;
		width: 100%;
	}
	.wrapper {
		margin: 0 auto;
		max-width: 960px;
		width: 100%;
	}
</style>
```
####Tocm Code
```js
$.class('!.container@Mobile', {
	width: '100%', display: 'block', margin: 0, padding: 0
});
$.class('!.wrapper@Mobile', {
	width: '100%', max_width: 960, margin: '0 auto'
});
```
####Result:
```html
<style id="Global Class" data="Mobile" type="text/css">
	@media all and (max-width: 640px) {
		.container {
			display: block;
			margin: 0px;
			padding: 0px;
			width: 100%;
		}
		.wrapper {
			margin: 0 auto;
			max-width: 960px;
			width: 100%;
		}
	}
</style>
```
```js
// Nested method.
// Each class still need global prefix to use global group and media prefix to group them.
```
####Tocm Code
```js
$.class({
	'!.container': {
		width: '100%', display: 'block', margin: 0, padding: 0
	},
	'!.wrapper': {
		width: '100%', max_width: 960, margin: '0 auto'
	}
});
```
####Result:
```html
<style id="Global Class" data="universal" type="text/css">
	.container {
		display: block;
		margin: 0px;
		padding: 0px;
		width: 100%;
	}
	.wrapper {
		margin: 0 auto;
		max-width: 960px;
		width: 100%;
	}
</style>
```
####Tocm Code
```js
$.class({
	'!.container@Mobile': {
		width: '100%', display: 'block', margin: 0, padding: 0
	},
	'!.wrapper@Mobile': {
		width: '100%', max_width: 960, margin: '0 auto'
	}
});
```
####Result:
```html
<style id="Global Class" data="Mobile" type="text/css">
	@media all and (max-width: 640px) {
		.container {
			display: block;
			margin: 0px;
			padding: 0px;
			width: 100%;
		}
		.wrapper {
			margin: 0 auto;
			max-width: 960px;
			width: 100%;
		}
	}
</style>
```
```js
// Super Nested method.
// This sample will tell the generator that all class will using global group.
// If media prefix defined, then generator will use it as prefix for all class.
```
####Tocm Code
```js
$.class('!', {
	'.container': {
		width: '100%', display: 'block', margin: 0, padding: 0
	},
	'.wrapper': {
		width: '100%', max_width: 960, margin: '0 auto'
	}
});
```
####Result:
```html
<style id="Global Class" data="universal" type="text/css">
	.container {
		display: block;
		margin: 0px;
		padding: 0px;
		width: 100%;
	}
	.wrapper {
		margin: 0 auto;
		max-width: 960px;
		width: 100%;
	}
</style>
```
####Tocm Code
```js
$.class('!@Mobile', {
	'.container': {
		width: '100%', display: 'block', margin: 0, padding: 0
	},
	'.wrapper': {
		width: '100%', max_width: 960, margin: '0 auto'
	}
});
```
####Result:
```html
<style id="Global Class" data="Mobile" type="text/css">
	@media all and (max-width: 640px) {
		.container {
			display: block;
			margin: 0px;
			padding: 0px;
			width: 100%;
		}
		.wrapper {
			margin: 0 auto;
			max-width: 960px;
			width: 100%;
		}
	}
</style>
```
---
####[SAMPLE] Grid System
---
#####Code
```js
// 960 GRID SYSTEM WITH FLUIDS LAYOUT.
// --------------------------------------------------------------------------

// CREATING DEFINITIONS.
var baseW = 100,    			// Container width. (%).
    baseM = 960,    			// Maximum width of container. (px)
    baseC = 12,     			// Number of column.
    gridM = 2.4,    			// Each column space. (%)
    gridW = 6.132,  			// Each column width. (%)
    gridC = (baseW / baseC);	// Each column width - no margin. (%)

// CREATING MAIN CLASS.
$.media('Tocmgrid', 'all');
$.class('.fl-grid@Tocmgrid', {
    // CONTAINER PROPERTIES.
    width: baseW  + '%', float: 'left', after: { clear: 'both' }
});

// CREATING BOX INCREMENT.
for (var i = 0; i <= 11; ++i) {
    var set = (i + 1);
	// SELECTING PARENT CLASS.
    $.class('.fl-grid', 'Tocmgrid')

    // FIRST COLUMN, NO MARGIN.
    .add('.col-' + set + 's', {
        width: ((gridW * set) + (gridM * (set - 1))) + '%',
        float: 'left'
    })
    .back()

    // NEXT COLUMN, RIGHT MARGIN.
    .add('.col-' + set + 'r', {
        width: ((gridW * set) + (gridM * (set - 1))) + '%',
        float: 'left', margin_right: gridM + '%'
    })
    .back()
    // NEXT COLUMN, LEFT MARGIN.
    .add('.col-' + set, {
        width: ((gridW * set) + (gridM * (set - 1))) + '%',
        float: 'left', margin_left: gridM + '%'
    })
    .back()
    // ALL COLUMN, NO MARGIN.
    .add('.col-' + set + 'c', {
        width: (gridC * set) + '%',
        float: 'left', margin: 0
    });
}
```
#####Result
```html
<style id=".fl-grid" data="Tocmgrid" type="text/css">
	@media all {
		.fl-grid {
			float: left;
			width: 100%;
		}
		.fl-grid:after {
			clear: both;
		}
		.fl-grid .col-1s {
			float: left;
			width: 6.132%;
		}
		.fl-grid .col-1r {
			float: left;
			margin-right: 2.4%;
			width: 6.132%;
		}
		.fl-grid .col-1 {
			float: left;
			margin-left: 2.4%;
			width: 6.132%;
		}
		.fl-grid .col-1c {
			float: left;
			margin: 0px;
			width: 8.333333333333334%;
		}
		.fl-grid .col-2s {
			float: left;
			width: 14.664%;
		}
		.fl-grid .col-2r {
			float: left;
			margin-right: 2.4%;
			width: 14.664%;
		}
		.fl-grid .col-2 {
			float: left;
			margin-left: 2.4%;
			width: 14.664%;
		}
		.fl-grid .col-2c {
			float: left;
			margin: 0px;
			width: 16.666666666666668%;
		}
		.fl-grid .col-3s {
			float: left;
			width: 23.196%;
		}
		.fl-grid .col-3r {
			float: left;
			margin-right: 2.4%;
			width: 23.196%;
		}
		.fl-grid .col-3 {
			float: left;
			margin-left: 2.4%;
			width: 23.196%;
		}
		.fl-grid .col-3c {
			float: left;
			margin: 0px;
			width: 25%;
		}
		.fl-grid .col-4s {
			float: left;
			width: 31.727999999999998%;
		}
		.fl-grid .col-4r {
			float: left;
			margin-right: 2.4%;
			width: 31.727999999999998%;
		}
		.fl-grid .col-4 {
			float: left;
			margin-left: 2.4%;
			width: 31.727999999999998%;
		}
		.fl-grid .col-4c {
			float: left;
			margin: 0px;
			width: 33.333333333333336%;
		}
		.fl-grid .col-5s {
			float: left;
			width: 40.26%;
		}
		.fl-grid .col-5r {
			float: left;
			margin-right: 2.4%;
			width: 40.26%;
		}
		.fl-grid .col-5 {
			float: left;
			margin-left: 2.4%;
			width: 40.26%;
		}
		.fl-grid .col-5c {
			float: left;
			margin: 0px;
			width: 41.66666666666667%;
		}
		.fl-grid .col-6s {
			float: left;
			width: 48.792%;
		}
		.fl-grid .col-6r {
			float: left;
			margin-right: 2.4%;
			width: 48.792%;
		}
		.fl-grid .col-6 {
			float: left;
			margin-left: 2.4%;
			width: 48.792%;
		}
		.fl-grid .col-6c {
			float: left;
			margin: 0px;
			width: 50%;
		}
		.fl-grid .col-7s {
			float: left;
			width: 57.324%;
		}
		.fl-grid .col-7r {
			float: left;
			margin-right: 2.4%;
			width: 57.324%;
		}
		.fl-grid .col-7 {
			float: left;
			margin-left: 2.4%;
			width: 57.324%;
		}
		.fl-grid .col-7c {
			float: left;
			margin: 0px;
			width: 58.333333333333336%;
		}
		.fl-grid .col-8s {
			float: left;
			width: 65.856%;
		}
		.fl-grid .col-8r {
			float: left;
			margin-right: 2.4%;
			width: 65.856%;
		}
		.fl-grid .col-8 {
			float: left;
			margin-left: 2.4%;
			width: 65.856%;
		}
		.fl-grid .col-8c {
			float: left;
			margin: 0px;
			width: 66.66666666666667%;
		}
		.fl-grid .col-9s {
			float: left;
			width: 74.38799999999999%;
		}
		.fl-grid .col-9r {
			float: left;
			margin-right: 2.4%;
			width: 74.38799999999999%;
		}
		.fl-grid .col-9 {
			float: left;
			margin-left: 2.4%;
			width: 74.38799999999999%;
		}
		.fl-grid .col-9c {
			float: left;
			margin: 0px;
			width: 75%;
		}
		.fl-grid .col-10s {
			float: left;
			width: 82.91999999999999%;
		}
		.fl-grid .col-10r {
			float: left;
			margin-right: 2.4%;
			width: 82.91999999999999%;
		}
		.fl-grid .col-10 {
			float: left;
			margin-left: 2.4%;
			width: 82.91999999999999%;
		}
		.fl-grid .col-10c {
			float: left;
			margin: 0px;
			width: 83.33333333333334%;
		}
		.fl-grid .col-11s {
			float: left;
			width: 91.452%;
		}
		.fl-grid .col-11r {
			float: left;
			margin-right: 2.4%;
			width: 91.452%;
		}
		.fl-grid .col-11 {
			float: left;
			margin-left: 2.4%;
			width: 91.452%;
		}
		.fl-grid .col-11c {
			float: left;
			margin: 0px;
			width: 91.66666666666667%;
		}
		.fl-grid .col-12s {
			float: left;
			width: 99.98400000000001%;
		}
		.fl-grid .col-12r {
			float: left;
			margin-right: 2.4%;
			width: 99.98400000000001%;
		}
		.fl-grid .col-12 {
			float: left;
			margin-left: 2.4%;
			width: 99.98400000000001%;
		}
		.fl-grid .col-12c {
			float: left;
			margin: 0px;
			width: 100%;
		}
	}
</style>
```
