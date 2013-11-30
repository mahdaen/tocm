// PATTERN PLAN -->
// MAIN PATTERN -->
$('*'); // All selector.
$('div'); // Tag Selector.
$('#content'); // ID Selector.
$('.clearfix'); // Class Selector.
$('@submit'); // Name Selector.

// EXTENDED PATTERN -->
$('#!content'); // ID Not Contains.
$('.!clearfix'); // Class Not Contains.
$('@!submit'); // Name Not Contains.

// ATTRIBUTE PATTERN -->
$('@name=test'); // Attribute name equal to test.
$('@name?test'); // Attribute name contains test.
$('@name!test'); // Attribute name not equal to test.

// COMBINED PATTERN -->
$('div#content'); // Select element with Tag and Id.
$('div.clearfix'); // Select element with Tag and Class.
$('div@name=test'); // Select element with Tag and Attribute.

// MULTI COMBINED PATTERN -->
$('#content.clearfix'); // Select element with ID and Class.
$('div#content.clearfix'); // Select element with Tag, ID, and Class.
$('div#content.clearfix@name=test'); // Select element with Tag, ID, Class, and Attribute.

// PATH PATTERN -->
$('div/#content/@name=test'); // Select all div, child with ID content, child with attribute name equal to test.
