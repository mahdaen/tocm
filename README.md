
Introduction
============

Tocm is CSS generator for javascript. With Tocm you can create and manage css on the fly without writing css file. With Tocm you can also create or manage Media Query, Fonts, Keyframes and Animations. Tocm was builded with jQuery included. To use Tocm, just embed the tocm file to your head and then you can embed your js file that contains class, font, etc. Example:

```html
<script src="script/tocm-1.1.min.js"></script>
```

####Why Tocm?
Tocm is easey to use, flexible and configurable. Tocm available for chaining and nested method. You can use your javascript experience when building stylesheet, like using math when defining css property value and etc. See ui definition sample below:

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

##Features:
---
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
Below is generated css by code above:

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

If you have fonts with same name, then you doesn't need to write array as source. Simply use this method:
```js
$.font('Open Sans', 'font/opensans');
```
Tocm Font will automatically generate array for you with complete font type (.eot, .woff, .ttf, .svg, .otf).

Below is generated css by code above:

```css
@font-face {
	font-family: "Open Sans";
	src: local("Open Sans");
	src: url("font/opensans.eot");
	src: url("font/opensans.eot?#iefix") format("embedded-opentype");
	src: url("font/opensans.woff") format("woff");
	src: url("font/opensans.ttf") format("truetype");
	src: url("font/opensans.svg") format("svg");
	src: url("font/opensans.otf") format("opentype");
}

```

######Method:
Create new font-face.
```js
$.font(name, source, options);

// Source usage sample
$.font('Arial', ['font/arial.eot', 'font/arial.ttf']); // Embed .eot and .ttf font
// Or
$.font('Arial', 'font/arial.ttf'); // Embed .ttf font only.
// Or
$.font('Arial', 'font/arial'); // Embed all font type.
```

Selecting font-face.
```js
$.font(name);
```

Modifying fonts property.
```js
$.font(name).set(objkey, value);

// Sample:
$.font('Open Sans').set('font-style', 'italic');
// Or
$.font('Open Sans').set({ 'font-style': 'italic', 'font-weight' : 400 });
```

---
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

Sample above is grouping `body` class to `Mobile` media. Below is generated css by code above:

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
######Method:
Create new media.
```js
$.media(name, rule);
```

Selecting media.
```js
$.media(name);
```

---
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
Below is generated css by code above:

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
######Method:
Create new keyframe.
```js
$.keyframe(name, position, properties);
```

Selecting keyframe.
```js
$.keyframe(name);
```

Adding/editing position.
```js
$.keyframe(name).at(position, properties);
```

---
####Tocm Animation
Tocm Animation is animation generator. With Tocm Animation you can create animation definition without manually define the keyframe and class. Tocm animation support nested method. It's mean that you can define multiple animation definition for parent class and child class. Child class will follow the parent properties if you not define their properties. Tocm animation also support onRun and onEnd callback for each animation. It's mean you can attach function to handle when animation has been started and finished. Usage:

```js
$.anime(name, properties);
```

Where `name` is the animation name. It's used when you attach the animation to DOM element, `properties` is collection of animation properties. It's including keyframe position, animation rule, and css properties.

######Animation Rule:
* `duration`			*animation duration (in sec). Default is 0.*
* `timing`				*animation timing function. Default is 'linear'.*
* `delay`				*animation delay (in sec) before start. Default is 0.*
* `repeat`				*animation repeating (number). Default is 1, use 'infinite' to allways repeat.*
* `direction`			*animation direction.
* `inherit`				*(boolean) inherit parent properties or not. Default is true.*

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
$.anime('turnLeft').onRun = function () {
	console.log('Animation started');
});
$.anime('turnLeft').onEnd = function () {
	console.log('Animation ended');
});
```

Sample above will animate the node with class '.content'. Since the parent animation doesn't have duration (0sec), it's mean the parent animation is only animation keyframe definiton to use as child keyframe. Then the child node with class '.title' and '.description' will animated with parent animation keyframe properties. The difference is only in delay before the animation start.

######Method:
Create new animation.
```js
$.anime(name, property);
```
Selecting animation.
```js
$.anime(name);
```
Adding child animation.
```js
$.anime(name).add(newname, properties);
```
Pause animation.
```js
$.anime(name).pause();
```
Playing animation.
```js
$.anime(name).play();
```

---
####Tocm Task
Tocm Task is task scheduller. With Tocm Task you can create a Realtime, Immediate, Delayed, and Schedulled task.
Realtime task will run everytime, Immediate task will run once, with or without delay before run, Delayed task will run every given interval, and Schedulled task will run on specified rule. You can also add multiple action into one task. For example, you will run function to sync message and sync status every 1sec, then you just simply create delayed task and attach the sync funtion into the task.

######Method:
Create/Select task.
```js
$.task(name);

// This method will create a new task if not exist, and return the task if already exist.
// Sample:

$.task('Clock');
```
Configuring task.
######Task Method:
* `.realtime()` - Set as Realtime task.
* `.immediate(delay)` - Set as Immediate task. (delay in milliseconds).
* `.repeat(rule)` - Set as Delayed task. **Rule**: `every #time` (second, minute, hour). e.g. `ever 5s`, `every 1m`, `every 1h`
* `.schedule(rule)` - Set as Schedulled task. **Rule**: `daily at 18:25`, `daily between 06:00 and 13:00`, `weekly on Sun at 15:00`, `weekly on Wed between 06:00 and 12:00`. You can only change the time and day (in weekly) on that rule.

* `.addAction(function)` - Adding action into task.
* `.run()` - Run the task. *Note: task will never run until you run them.*
* `.stop()` - Stop the task.
 
```js
$.task(name).method(methodrule);

// Sample:
$.task('Clock').repeat('every 1s').addAction(function () {
	$('#clock').html(new Date());
}).run();
// That sample will set the current date as #clock element text every 1sec.

$.task('Alert').immediate(500).addAction(function () { alert('Success'); }).run();
// That sample will create new task 'Alert' and alert 'Success' in 500ms after the task run.

$.task('GoSchool').schedule('weekly on Mon at 07:00').addAction(function () { alert('Time to go to school'); }).run();
// That sample will create new task 'GoSchool' and alert 'Time to go to school' every Monday at 07:00.

$.task('MillSec').realtime().addAction(function () {
	$('#clock').html(new Date().getMilliseconds());
}).run();
// That sample will create new task 'MilSec' and change the #clock text with the current millisecond Date().
// Task will re run after the action triggered.

$.task('MilSec').stop();
// That sample will stop the 'MilSec' task. You can re run the task with .run() method. 
```
You can change the task method anytime. But we prefer to stop the task before you change the method.
Sample:
```js
$.task('Clock').stop().realtime().run();
// That sample will stop and change the 'Clock' method to realtime task, and then re run the task.
``` 

---
####Tocm Class
Tocm Class is css generator. You can create class with two group: Family and Global. Family class will written to single style node with `family-name` as the `id` attribute. Global class will be written to global class node.  Family class is default method where you doesn't need to add prefix to the class name. While global, you need to add global identifier to the class name. Both Family and Global group is builded to makes debugging stylesheet easily since you can find the block of code in each style nodes.

Tocm Class is support with almost all of CSS3. So you doesn't need to add vendor prefix `-webkit-, -moz-` etc. Just use the standard property and Tocm Class will add the vendor prefix automatically. e.g. `filter: 'blur(1px)'`, then it would become `filter: 'blur(1px)'; -webkit-filter: 'blur(1px)'; -ms-filter: 'blur(1px)';`

When building stylesheet, you can using Basic and Nested method. Using basic method will give more options, but need lot of work. You also must to write the style manualy if you change/modify the class after page load, since tocm only listen on page load `.ready`. The reason is to increase the compile speed.

While using nested method, you can create a class and child classes easily. With nested method you doesn't need to write the parent class name. Just put the child classes under the parent class scope. Child classes will follow the parent class group, except you define a new group in child classes.

Besides building stylesheet, you can also modify the class properties. Just select the class, and then set their property. If you group the class into media, then you have to add the media name to the select pattern. Usage: `.set(string property, value) >> $.class('.clearfix').set('padding', 20)` 

or 

`.set(object property) >> $.class('.clearfix@Mobile').set({padding: 20, margin: 20})`

######RULES:
* Class name should only contains `a-z A-Z 0-9 - _`.
* `!` on class name will be used as global identifier.
* `@` on class name will be used as media identifier.
* Class property using native object. You can't add multiple key in one object. Both `'property' : 'value'` or `property: value` method are allowed. If you want to add two property in one class, then you have to add number as prefix or suffix. e.g. `{ 'background-image1' : 'url(...)', 'background-image2' : 'linear-gradient(...)' }`.
* Number in property value will be converted to `px`. e.g. `width: 200` will become `width: 200px`. But in some case, it will be ignored like when in property `line-height, opacity, etc`. If you want to define in another format, then you have to use string format. e.g. `'10pt'`, `'100%'`, etc.
* `$` in property name will be converted to `*`. It's used for some IE hack like `*zoom: 1`.

######Method:
Create new class.
```js
$.class(name, properties);
// or
$.class(object);
// or
$.class(group, object);

// Sample:
$.class('.button', {
	display: 'block', padding: 10, background_color: '#fff',

	'img': {
		opacity: 1
	},

	':hover': {
		'background-color': '#ccc',

		'img': {
			opacity: 0.7
		}
	}
});
```

Selecting class.
```js
$.class(name);

// Sample:
$.class('body .button');
```

Adding/Editing properties.
```js
$.class(name).set(property, value);
// or
$.class(name).set(objproperties);

// Sample:
$.class('.button').set('border', '1px solid #ccc');
// or
$.class('.button img').set({ width: '100%', filter: 'blur(2px)' });
``` 

Adding child class. This is chaining method.
```js
$.class(name).add(newname, properties);
```

Back to parent class when in chaining method.
```js
.back()

// Sample:
$.class(name).add('newbutton', { display: 'block' }).back();
```

Go to another class in current parent class when in chaining method.
```js
.goto(name)

// Sample:
$.class(name)
.add('newbutton', { display: 'block' })
.back()
.goto('.oldbutton')
.set('display', 'none');
```

Importing properties from other class.
```js
$.class(name).copy(sourcename);

// Sample:
$.class('.nbt').copy('.button');
```

Writing the class after finish using chaining method and after page loaded. This is neccessary if you're using chaining method, since the style will never generated before you write the style. But you have to write the style only after the chain is complete, or you will reduce the compile performance.
```js
$.class(name).write();

// Sample
$.class('.nbt').copy('.button').set('display', 'none').write();

// Do not!
$.class('.nbt').copy('.button').write().add('.some', {}).write().back().add('.some2', {}).write();
```


---
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

###Advanced Sample.
---
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
/*
 * ADAPTING 960 GRID SYSTEM AND CONVERT IT TO FLUIDS GRID.
 * 960 fluids system with 12 column layout.
 * -------------------------------------------------------------------------------------------
 */

// CREATING CLASS DEFINITIONS CONSTANTS.
define('baseWidth', 960);                                   // Main container width (px).
define('column',     12);                                   // Column count.
define('colgap',      8);                                   // Column gap count.

define('fixSize',   (baseWidth / column));                  // Each fixed column size (px).         ->                 80px
define('gapSize',   (fixSize / colgap));                    // Each gap size (px).                  ->                 10px

define('marSize',   (gapSize / baseWidth) * 100);           // Each margin size (%).                ->  1.0416666666666665%
define('filSize',   (marSize * 2));                         // Each column fill size (%).           ->   2.083333333333333%
define('colSize',   (marSize * (colgap - 2)));              // Each column size (%).                ->   6.249999999999999%

// CREATING MEDIA GROUPS.
$.media('Tocmgrid', 'all');
$.media('Tocmgrid-tablet', $.media('tablet').value);
$.media('Tocmgrid-mobile', $.media('mobile').value);

// CREATING MAIN CLASSES.
$.class('!@Tocmgrid', {
    // Content container class.
    '.container': {
        width: pr(100), max_width: baseWidth, margin: '0 auto'
    },
    // Content wrapper class.
    '.wrapper': {
        width: pr(100), margin: 0, padding_left: 10, padding_right: 10
    },
    // Fluids Grid container class.
    '.fl-grid': {
        width: pr(100), position: 'relative', ':after': { clear: 'both' }
    },
    // Fixed Grid container class.
    '.fx-grid': {
        width: baseWidth, float: 'left', position: 'relative', ':after': { clear: 'both' }
    }
});

// CREATING GRID CALSSES.
var x;
for (x = 1; x <= column; ++x) {
    // Selecting parent class.
    $.class('.fl-grid@Tocmgrid')
    // Fluids column with margin.
    .add('.grid-' + x, {
        float: 'left', width: pr(((colSize * x) + (filSize * (x - 1)))), margin_left: pr(marSize), margin_right: pr(marSize)
    }).back()
    // Fluids column without margin.
    .add('.grid-' + x + 'c', {
        float: 'left', width: pr(((colSize * x) + (filSize * (x - 1)) + (marSize * 2))), margin: 0
    }).back()
    // --------------------------------------------------------------------------------------------
    // Fluids column push.
    .add('.push-' + x, {
        position: 'relative', left: pr(((colSize * x) + (filSize * x)))
    }).back()
    // Fluids column pull.
    .add('.pull-' + x, {
        position: 'relative', left: pr(-((colSize * x) + (filSize * x)))
    }).back()
    // --------------------------------------------------------------------------------------------
    // Fuilds column prefix.
    .add('.prefix-' + x, {
        padding_left: pr(((colSize * x) + (filSize * (x - 1))))
    }).back()
    // Fuilds column suffix.
    .add('.suffix-' + x, {
        padding_right: pr(((colSize * x) + (filSize * (x - 1))))
    }).back()
    // --------------------------------------------------------------------------------------------
    // Fluids column for tablet.
    .add('!.grid-' + x + '.tablet@Tocmgrid-tablet', {
        float: 'left', width: pr(((colSize * 4) + (filSize * 3))), margin_left: pr(marSize), margin_right: pr(marSize)
    }).back()
    // --------------------------------------------------------------------------------------------
    // Fluids column for mobile.
    .add('!.grid-' + x + '.mobile@Tocmgrid-mobile', {
        float: 'left', width: pr(((colSize * 12) + (filSize * 12))), margin: 0, padding_left: 10, padding_right: 10
    }).back();
    // --------------------------------------------------------------------------------------------
}
```
#####Result
```html
<style id="Global Class" data="Tocmgrid" type="text/css">
	@media all {
		.container {
			margin: 0 auto;
			max-width: 960px;
			width: 100%;
		}

		.wrapper {
			margin: 0;
			padding-left: 10px;
			padding-right: 10px;
			width: 100%;
		}

		.fl-grid {
			position: relative;
			width: 100%;
		}

		.fl-grid:after {
			clear: both;
		}

		.fx-grid {
			float: left;
			position: relative;
			width: 960px;
		}

		.fx-grid:after {
			clear: both;
		}

		.fl-grid .grid-1 {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 6.249999999999999%;
		}

		.fl-grid .grid-1c {
			float: left;
			margin: 0;
			width: 8.333333333333332%;
		}

		.fl-grid .push-1 {
			left: 8.333333333333332%;
			position: relative;
		}

		.fl-grid .pull-1 {
			left: -8.333333333333332%;
			position: relative;
		}

		.fl-grid .prefix-1 {
			padding-left: 6.249999999999999%;
		}

		.fl-grid .suffix-1 {
			padding-right: 6.249999999999999%;
		}

		.fl-grid .grid-2 {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 14.583333333333332%;
		}

		.fl-grid .grid-2c {
			float: left;
			margin: 0;
			width: 16.666666666666664%;
		}

		.fl-grid .push-2 {
			left: 16.666666666666664%;
			position: relative;
		}

		.fl-grid .pull-2 {
			left: -16.666666666666664%;
			position: relative;
		}

		.fl-grid .prefix-2 {
			padding-left: 14.583333333333332%;
		}

		.fl-grid .suffix-2 {
			padding-right: 14.583333333333332%;
		}

		.fl-grid .grid-3 {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 22.916666666666664%;
		}

		.fl-grid .grid-3c {
			float: left;
			margin: 0;
			width: 24.999999999999996%;
		}

		.fl-grid .push-3 {
			left: 24.999999999999996%;
			position: relative;
		}

		.fl-grid .pull-3 {
			left: -24.999999999999996%;
			position: relative;
		}

		.fl-grid .prefix-3 {
			padding-left: 22.916666666666664%;
		}

		.fl-grid .suffix-3 {
			padding-right: 22.916666666666664%;
		}

		.fl-grid .grid-4 {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 31.249999999999996%;
		}

		.fl-grid .grid-4c {
			float: left;
			margin: 0;
			width: 33.33333333333333%;
		}

		.fl-grid .push-4 {
			left: 33.33333333333333%;
			position: relative;
		}

		.fl-grid .pull-4 {
			left: -33.33333333333333%;
			position: relative;
		}

		.fl-grid .prefix-4 {
			padding-left: 31.249999999999996%;
		}

		.fl-grid .suffix-4 {
			padding-right: 31.249999999999996%;
		}

		.fl-grid .grid-5 {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 39.58333333333333%;
		}

		.fl-grid .grid-5c {
			float: left;
			margin: 0;
			width: 41.666666666666664%;
		}

		.fl-grid .push-5 {
			left: 41.66666666666666%;
			position: relative;
		}

		.fl-grid .pull-5 {
			left: -41.66666666666666%;
			position: relative;
		}

		.fl-grid .prefix-5 {
			padding-left: 39.58333333333333%;
		}

		.fl-grid .suffix-5 {
			padding-right: 39.58333333333333%;
		}

		.fl-grid .grid-6 {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 47.91666666666666%;
		}

		.fl-grid .grid-6c {
			float: left;
			margin: 0;
			width: 49.99999999999999%;
		}

		.fl-grid .push-6 {
			left: 49.99999999999999%;
			position: relative;
		}

		.fl-grid .pull-6 {
			left: -49.99999999999999%;
			position: relative;
		}

		.fl-grid .prefix-6 {
			padding-left: 47.91666666666666%;
		}

		.fl-grid .suffix-6 {
			padding-right: 47.91666666666666%;
		}

		.fl-grid .grid-7 {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 56.24999999999999%;
		}

		.fl-grid .grid-7c {
			float: left;
			margin: 0;
			width: 58.33333333333333%;
		}

		.fl-grid .push-7 {
			left: 58.33333333333333%;
			position: relative;
		}

		.fl-grid .pull-7 {
			left: -58.33333333333333%;
			position: relative;
		}

		.fl-grid .prefix-7 {
			padding-left: 56.24999999999999%;
		}

		.fl-grid .suffix-7 {
			padding-right: 56.24999999999999%;
		}

		.fl-grid .grid-8 {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 64.58333333333333%;
		}

		.fl-grid .grid-8c {
			float: left;
			margin: 0;
			width: 66.66666666666666%;
		}

		.fl-grid .push-8 {
			left: 66.66666666666666%;
			position: relative;
		}

		.fl-grid .pull-8 {
			left: -66.66666666666666%;
			position: relative;
		}

		.fl-grid .prefix-8 {
			padding-left: 64.58333333333333%;
		}

		.fl-grid .suffix-8 {
			padding-right: 64.58333333333333%;
		}

		.fl-grid .grid-9 {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 72.91666666666666%;
		}

		.fl-grid .grid-9c {
			float: left;
			margin: 0;
			width: 74.99999999999999%;
		}

		.fl-grid .push-9 {
			left: 74.99999999999999%;
			position: relative;
		}

		.fl-grid .pull-9 {
			left: -74.99999999999999%;
			position: relative;
		}

		.fl-grid .prefix-9 {
			padding-left: 72.91666666666666%;
		}

		.fl-grid .suffix-9 {
			padding-right: 72.91666666666666%;
		}

		.fl-grid .grid-10 {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 81.24999999999999%;
		}

		.fl-grid .grid-10c {
			float: left;
			margin: 0;
			width: 83.33333333333331%;
		}

		.fl-grid .push-10 {
			left: 83.33333333333331%;
			position: relative;
		}

		.fl-grid .pull-10 {
			left: -83.33333333333331%;
			position: relative;
		}

		.fl-grid .prefix-10 {
			padding-left: 81.24999999999999%;
		}

		.fl-grid .suffix-10 {
			padding-right: 81.24999999999999%;
		}

		.fl-grid .grid-11 {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 89.58333333333331%;
		}

		.fl-grid .grid-11c {
			float: left;
			margin: 0;
			width: 91.66666666666664%;
		}

		.fl-grid .push-11 {
			left: 91.66666666666666%;
			position: relative;
		}

		.fl-grid .pull-11 {
			left: -91.66666666666666%;
			position: relative;
		}

		.fl-grid .prefix-11 {
			padding-left: 89.58333333333331%;
		}

		.fl-grid .suffix-11 {
			padding-right: 89.58333333333331%;
		}

		.fl-grid .grid-12 {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 97.91666666666666%;
		}

		.fl-grid .grid-12c {
			float: left;
			margin: 0;
			width: 99.99999999999999%;
		}

		.fl-grid .push-12 {
			left: 99.99999999999999%;
			position: relative;
		}

		.fl-grid .pull-12 {
			left: -99.99999999999999%;
			position: relative;
		}

		.fl-grid .prefix-12 {
			padding-left: 97.91666666666666%;
		}

		.fl-grid .suffix-12 {
			padding-right: 97.91666666666666%;
		}
	}
</style>
<style id="Global Class" data="Tocmgrid-tablet" type="text/css">
	@media (max-width: 989px) and (min-device-width: 1024px), screen and (max-device-width: 480px), (max-device-width: 480px) and (orientation: landscape), (max-device-width: 1024px) and (min-device-width: 481px) and (orientation: portrait) {
		.fl-grid .grid-1.tablet {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 31.249999999999996%;
		}

		.fl-grid .grid-2.tablet {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 31.249999999999996%;
		}

		.fl-grid .grid-3.tablet {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 31.249999999999996%;
		}

		.fl-grid .grid-4.tablet {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 31.249999999999996%;
		}

		.fl-grid .grid-5.tablet {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 31.249999999999996%;
		}

		.fl-grid .grid-6.tablet {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 31.249999999999996%;
		}

		.fl-grid .grid-7.tablet {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 31.249999999999996%;
		}

		.fl-grid .grid-8.tablet {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 31.249999999999996%;
		}

		.fl-grid .grid-9.tablet {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 31.249999999999996%;
		}

		.fl-grid .grid-10.tablet {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 31.249999999999996%;
		}

		.fl-grid .grid-11.tablet {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 31.249999999999996%;
		}

		.fl-grid .grid-12.tablet {
			float: left;
			margin-left: 1.0416666666666665%;
			margin-right: 1.0416666666666665%;
			width: 31.249999999999996%;
		}

	}
</style>
<style id="Global Class" data="Tocmgrid-mobile" type="text/css">
	@media (max-width: 509px) and (min-device-width: 1024px), (max-device-width: 480px) and (orientation: portrait) {
		.fl-grid .grid-1.mobile {
			float: left;
			margin: 0;
			padding-left: 10px;
			padding-right: 10px;
			width: 99.99999999999999%;
		}

		.fl-grid .grid-2.mobile {
			float: left;
			margin: 0;
			padding-left: 10px;
			padding-right: 10px;
			width: 99.99999999999999%;
		}

		.fl-grid .grid-3.mobile {
			float: left;
			margin: 0;
			padding-left: 10px;
			padding-right: 10px;
			width: 99.99999999999999%;
		}

		.fl-grid .grid-4.mobile {
			float: left;
			margin: 0;
			padding-left: 10px;
			padding-right: 10px;
			width: 99.99999999999999%;
		}

		.fl-grid .grid-5.mobile {
			float: left;
			margin: 0;
			padding-left: 10px;
			padding-right: 10px;
			width: 99.99999999999999%;
		}

		.fl-grid .grid-6.mobile {
			float: left;
			margin: 0;
			padding-left: 10px;
			padding-right: 10px;
			width: 99.99999999999999%;
		}

		.fl-grid .grid-7.mobile {
			float: left;
			margin: 0;
			padding-left: 10px;
			padding-right: 10px;
			width: 99.99999999999999%;
		}

		.fl-grid .grid-8.mobile {
			float: left;
			margin: 0;
			padding-left: 10px;
			padding-right: 10px;
			width: 99.99999999999999%;
		}

		.fl-grid .grid-9.mobile {
			float: left;
			margin: 0;
			padding-left: 10px;
			padding-right: 10px;
			width: 99.99999999999999%;
		}

		.fl-grid .grid-10.mobile {
			float: left;
			margin: 0;
			padding-left: 10px;
			padding-right: 10px;
			width: 99.99999999999999%;
		}

		.fl-grid .grid-11.mobile {
			float: left;
			margin: 0;
			padding-left: 10px;
			padding-right: 10px;
			width: 99.99999999999999%;
		}

		.fl-grid .grid-12.mobile {
			float: left;
			margin: 0;
			padding-left: 10px;
			padding-right: 10px;
			width: 99.99999999999999%;
		}

	}
</style>

```
