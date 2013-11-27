/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

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