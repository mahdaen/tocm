// CREATING GLOBAL REFERENCES.
(function (window) {
    'use strict';
    window.rgb = function (hexColor, opacity, rtype) {
        var shorthandRegex, result, objRgb, isPrs;

        // Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
        shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hexColor = hexColor.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);

        objRgb = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };

        if (opacity && typeOf(opacity) === 'string') {
            isPrs = opacity.search('%');

            if (isPrs !== -1) {
                opacity = opacity.replace('%', '');
                opacity = Number(opacity) / 100;
            }
            objRgb.o = opacity;
        } else if (opacity && typeOf(opacity) === 'number') {
            objRgb.o = opacity;
        }

        if (!rtype || rtype !== 'object') {
            result = objRgb.r + ', ' + objRgb.g + ', ' + objRgb.b;
            if (objRgb.o) {
                result = 'rgba(' + result + ', ' + objRgb.o + ')';
            } else {
                result = 'rgb(' + result + ')';
            }

            return result;
        } else {
            return objRgb;
        }
    };
    window.newline = '<br/>';
    window.unit = {
        pixel: function (unit) {

        },
        count: function (result) {

        },
        type: function (unit) {
            var rxHex3, rxHex6, type;
            type = typeof unit;
            if (typeof unit == 'string') {
                // Match for hex color format.
                rxHex3 = /^#([a-f\d]{3})$/i;
                rxHex6 = /^#([a-f\d]{6})$/i;
                if (unit.match(rxHex3) || unit.match(rxHex6)) {
                    type = 'hexcolor';
                }
                // Match for percentage.
                if (unit.match(/(^\d+%$)|(^\d+\.\d+\%)/)) {
                    type = 'percentage';
                }
                // Match for Pixel.
                if (unit.match(/(^\d+px$)|(^\d+\.\d+px$)/)) {
                    type = 'pixel';
                }
                // Match for typography or em.
                if (unit.match(/(^\d+em$)|(^\d+\.\d+em$)/)) {
                    type = 'typography';
                }
                // Match for centimeter.
                if (unit.match(/(^\d+cm$)|(^\d+\.\d+cm$)/)) {
                    type = 'centimeter';
                }
                // Match for millimeter.
                if (unit.match(/(^\d+mm$)|(^\d+\.\d+mm$)/)) {
                    type = 'millimeter';
                }
                // Match for inch.
                if (unit.match(/(^\d+in$)|(^\d+\.\d+in$)/)) {
                    type = 'inch';
                }
                // Match for point.
                if (unit.match(/(^\d+pt$)|(^\d+\.\d+pt$)/)) {
                    type = 'point';
                }
                //Match for pica.
                if (unit.match(/(^\d+pc$)|(^\d+\.\d+pc$)/)) {
                    type = 'pica';
                }
            }
            return type;
        }
    };
    window.define = function (name, value) {
        window[name] = value;
        Object.defineProperty(window, name, {
            enumerable: false,
            configurable: false,
            writable: false
        });
        return window[name];
    };


    var ObjectType = function (obj) {
        if (typeof obj === 'undefined') {
            return 'undefined';
        }
        if (typeof obj === null) {
            return null;
        }
        return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
    };
    window.typeOf = window.ObjectType = ObjectType;
    var ObjectLastNode = function (from, what) {
        var ncoll = from;
        var acoll = {};
        for (var i = 0; i < ncoll.length; ++i) {
            acoll[ncoll[i].nodeName.toLowerCase()] = i;
        }
        var last = acoll[what];
        if (!last) {
            return -1;
        } else {
            return last;
        }
    };
    window.lastNode = ObjectLastNode;
    var ObjectSort = function (obj) {
        var key, array, object;
        if (typeOf(obj) === 'array') {
            return obj.sort();
        }
        if (typeOf(obj) === 'object') {
            array = [];
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    array.push(key);
                }
            }
            array = array.sort();
            object = {};
            for (key = 0; key < array.length; ++key) {
                object[array[key]] = obj[array[key]];
            }
            return object;
        }
    };
    window.sortObject = ObjectSort;
    var XPathSelector = function (pattern) {
        var item, search, result = [];
        if (typeOf(pattern) === 'string') {
            search = document.evaluate(pattern, document, null, XPathResult.ANY_TYPE, null);
            while (item = search.iterateNext()) {
                result.push(item);
            }
        }
        return result;
    };
    window.$path = function (pattern) {
        return new XPathSelector(pattern);
    };
    window.$path.module = XPathSelector.prototype = {};
    var Gradient = function (value, mode) {
        var gstr = '', vendor = TocmRef.vendor, type;
        if (typeOf('mode') === 'string') {
            mode += '-gradient';
            gstr += mode + '(' + value + '); ';
        } else {
            mode = 'gradient';
        }
        if (typeOf(value) === 'string') {
            for (var i = 0; i < vendor.length; ++i) {
                gstr += vendor[i] + mode + '(' + value + '); ';
            }
            return gstr;
        } else {
            return 'none';
        }
    };
    window.gradient = Gradient;
    window.linear_gradient = function (value) {
        return gradient(value, 'linear');
    };
    window.radial_gradient = function (value) {
        return gradient(value, 'radial');
    };
})(window);
