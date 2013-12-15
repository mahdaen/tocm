
Tocm
====

Tocm is CSS generator for javascript. With Tocm you can create and manage css on the fly without writing css file. With Tocm you can also create or manage Media Query, Fonts, Keyframes and Animations. Tocm was builded with jQuery included. To use Tocm, just embed the tocm file to your head and then you can your js file that contains class, font, etc. Example:

```html
<script src="script/tocm-1.1.min.js"></script>
```

###Features:
####Tocm Font
Tocm Font is a `font-face` generator. With Tocm Font you can embed your web font with easy way.
Usage:

```js
$.font(name, source, options);
```

where `name` is string `font-face` name, `source` is array containing the url of font, and `options` is optional font-face options. Example:

```js
$.font('Open Sans', ['font/opensans.eot', 'font/opensans.ttf', 'font/opensans.woff'], {font_style: 'normal', font_weight: 600});
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

####Tocm Class
Tocm Class is css generator. You can create class with two method: Private, Global. Private class will written to single style node with `family-name` as the `id` attribute. Global class will be written to global class node. Example:

```js
// Private Class
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

// Private class with media group.
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