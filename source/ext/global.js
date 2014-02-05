/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING GLOBAL REFERENCES.
(function (window) {
    'use strict';
    // CREATING UNIT CONVERTER.
    var conv = function (src, suf) {
        if (typeOf(src) === 'number') {
            return src + suf;
        } else {
            return src;
        }
    };
    assign('em', function (src) {
        return conv(src, 'em');
    });
    assign('px', function (src) {
        return conv(src, 'px');
    });
    assign('pt', function (src) {
        return conv(src, 'pt');
    });
    assign('pr', function (src) {
        return conv(src, '%');
    });
    // CREATING HEX TO RGBA CONVERTER.
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
    // LOCKING RGB.
    lock('rgb');

    // CREATING GRADIENT GENERATOR.
    var Gradient = function (value, mode) {
        var gstr = '',
            vendor = ['', '-webkit-', '-moz-', '-o-', '-ms-'],
            type, v, i;
        if (typeOf('mode') === 'string') {
            mode += '-gradient';
        } else {
            mode = 'gradient';
        }
        if (typeOf(value) === 'string') {
            value = value.replace(/(\s?)(&)(\s?)/g, '&');
            value = value.split('&');
            for (i = 0; i < (vendor.length); ++i) {
                for (v = 0; v < (value.length - 1); ++v) {
                    gstr += vendor[i] + mode + '(' + value[v] + '), ';
                }
                gstr += vendor[i] + mode + '(' + value[value.length - 1] + '); ';
            }
            return gstr;
        } else if (typeOf(value) === 'object') {
            // { linear: '90deg, #fff, #000', radial: '#fff, #000' }
            for (i = 0; i < vendor.length; ++i) {
                var vals = Object.keys(value);
                for (v = 0; v < (vals.length - 1); ++v) {
                    gstr += vendor[i] + vals[v].replace(/[\d]+/g, '') + '-gradient(' + value[vals[v]] + '), ';
                }
                gstr += vendor[i] + vals[v].replace(/[\d]+/g, '') + '-gradient(' + value[vals[vals.length - 1]] + '); ';
            }
            return gstr;
        } else {
            return '';
        }
    };
    window.gradient = Gradient;
    window.linear_gradient = function (value) {
        return gradient(value, 'linear');
    };
    window.radial_gradient = function (value) {
        return gradient(value, 'radial');
    };

    // Creating function to generate gradient value.
    // gradival('90deg', ['#fff', '#fff', '#fff', '#ccc']);
    // 90deg, #fff, #fff, #fff, #ccc
    var Gradival = function (dir, val) {
        var grdv = '', i, v;
        if (typeOf(dir) === 'string' && typeOf(val) === 'array') {
            grdv += dir + ', ' + gradval(val);
        } else if (typeOf(dir) === 'array') {
            for (i = 0; i < (dir.length - 1); ++i) {
                grdv += dir[i] + ', ';
            }
            grdv += dir[dir.length - 1];
        }
        return grdv;
    };
    window.gradval = Gradival;
    // LOCKING OBJECT.
    lock('gradient');
    lock('linear_gradient');
    lock('radial_gradient');
    lock('gradval');
})(window);
