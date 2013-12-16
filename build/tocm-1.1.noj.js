/**
    TOCM - TOCL CSS MAGIC
    v.1.1
    © 2013 Siriussoft Corporation.
    Developed bay Nanang - mahdaen@hotmail.com
    
    Tocl CSS Magic is a CSS class generator. With Tocl CSS Magic you can create and manage CSS class easily.
    Tocl CSS Magic allow you to create new class, add property, remove property or change property value without
    writing or editing the css file. All css script is created on the fly. You doesn't need to have css file anymore.
    -----------------------------------------------------------------------------------------------------------------
**/
/*jshint -W065 */
/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

/*jshint -W065 */
/*jshint undef:false */

// A COLLECTIONS OF NATIVE OBJECT PROTOTYPE EXTENDER.
// --------------------------------------------------------------------------
// NEW NATIVE FUNCTIONS.
(function (window) {
    'use strict';
    // CREATING FUNCTION TO DEFINE CONSTANT/NON-WRITABLE OBJECT.
    Object.defineProperty(window, 'define', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function (name, value) {
            if (name !== 'undefined' && value !== 'undefined') {
                Object.defineProperty(window, name, {
                    writable: false,
                    value: value
                });
            }
        }
    });
    // CREATING FUNCTION TO LOCK OBJECT ON WINDOW.
    define('lock', function (name) {
        if (typeof name === 'string') {
            var object = window[name];
            if (object) {
                delete window[name];
                Object.defineProperty(window, name, {
                    writable: false,
                    value: object
                });
            }
            return window[name];
        }
    });
    // Object Type.
    var ObjectType = function (obj) {
        if (typeof obj === 'undefined') {
            return 'undefined';
        }
        if (typeof obj === null) {
            return null;
        }
        return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
    };
    window.typeOf = ObjectType;
    lock('typeOf');

    // Last Node.
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
    lock('lastNode');

    // Sorting object.
    var sortObject = function (object, direction) {
        var tmparray = Object.keys(object),
            newobject = {};
        if (direction !== 'desc') {
            // SORT ASCENDING -->
            tmparray = tmparray.sort(function (a, b) {
                var X = a.toLowerCase();
                var Y = b.toLowerCase();
                if (X < Y) {
                    return -1;
                } else if (X > Y) {
                    return 1;
                }
                return 0;
            });
        } else {
            // SORT DESCENDING -->
            tmparray = tmparray.sort(function (a, b) {
                var X = a.toLowerCase();
                var Y = b.toLowerCase();
                if (X < Y) {
                    return 1;
                } else if (X > Y) {
                    return 0;
                }
                return -1;
            });
        }
        for (var i = 0; i < tmparray.length; ++i) {
            newobject[tmparray[i]] = object[tmparray[i]];
        }
        return newobject;
    };
    window.sortObject = sortObject;
    lock('sortObject');
})(window);

// Extend Date.
(function (Date) {
    'use strict';
    // CONVERT DATE TO JULIAN.
    if (!Date.prototype.toJulian) {
        Date.prototype.toJulian = function () {
            var MM = this.getUTCMonth() + 1;
            var DD = this.getUTCDate();
            var YY = this.getUTCFullYear();
            var HR = this.getUTCHours();
            var MN = this.getUTCMinutes();
            var SC = this.getUTCSeconds();

            HR = HR + (MN / 60) + (SC / 3600);
            var GGG = 1;
            if (YY <= 1585) {
                GGG = 0;
            }

            var jDate = -1 * Math.floor(7 * (Math.floor((MM + 9) / 12) + YY) / 4);

            var S = 1;
            if ((MM - 9) < 0) {
                S = -1;
            }
            var A = Math.abs(MM - 9);

            var J1 = Math.floor(YY + S * Math.floor(A / 7));
            J1 = -1 * Math.floor((Math.floor(J1 / 100) + 1) * 3 / 4);
            jDate = jDate + Math.floor(275 * MM / 9) + DD + (GGG * J1);
            jDate = jDate + 1721027 + 2 * GGG + 367 * YY - 0.5;
            jDate = jDate + (HR / 24);

            return jDate;
        };
    }
    if (!Date.prototype.dateOfMonth) {
        Date.prototype.dateOfMonth = function () {
            var jdate = new Date(this.getFullYear(), this.getMonth, 1).toJulian();
            var month = this.getMonth();

            var daycount = 0;

            for (var i = 1; i <= 31; ++i) {
                if ((new Date(this.getFullYear(), this.getMonth(), i).getMonth()) === month) {
                    daycount++;
                }
                jdate = jdate + 1;
            }
            return daycount;
        };
    }
    // GET WEEK OF YEAR.
    if (!Date.prototype.weekOfYear) {
        Date.prototype.weekOfYear = function () {
            var date = new Date(+this);
            date.setHours(0, 0, 0);
            date.setDate(date.getDate() + 4 - (date.getDay() || 7));
            return Math.ceil((((date - new Date(date.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
        };
    }
    // GET WEEK OF MONTH.
    if (!Date.prototype.getWeek) {
        Date.prototype.getWeek = function () {
            var year = this.getFullYear();
            var mont = this.getMonth();
            var date = this.getDate();

            var lmonth = mont - 1;
            if (mont === 0) lmonth = 11;
            var ndat = new Date(year, lmonth);

            var week = 0;
            for (var i = (ndat.dateOfMonth() - 7); i <= ndat.dateOfMonth(); ++i) {
                var cdate = new Date(year, lmonth, i);
                if (cdate.getDay() === 0) week++;
            }
            if (new Date(year, mont, 1).getDay() === 0) week = 0;
            for (var j = 1; j <= date; ++j) {
                var xdate = new Date(year, mont, j);
                if (xdate.getDay() === 0) week++;
            }
            return week;
        };
    }
    // GET DATE ON WEEK WITH/WITHOUT SPESIFIC DAY.
    if (!Date.prototype.dateOfWeek) {
        Date.prototype.dateOfWeek = function (week, day) {
            if (typeOf(week) === 'number') {
                var i, j, w;
                var gjd = new Date(this.getFullYear(), this.getMonth(), 1).toJulian();

                var dow = [];
                var don = [];
                for (i = 1; i <= 31; ++i) {
                    if (Number(gjd.toDate('w')) === Number(week) && Number(gjd.toDate('M') - 1) == this.getMonth()) {
                        dow.push(i);
                        don.push(gjd.toDate('dn'));
                    }
                    gjd = gjd + 1;
                }
                if (typeOf(day) === 'string') {
                    return new Date(this.getFullYear(), this.getMonth(), dow[don.indexOf(day)]);
                }
                return dow;
            }
        };
    }
    // DATE FORMATTING.
    if (!Date.prototype.format) {
        Date.prototype.format = function (format) {
            var jdate = this.toJulian();
            var drepl = ['Y', 'M', 'D', 'd', 'h', 'm', 's', 't', 'W', 'dn', 'mn', 'w', 'wn'];
            for (var i = 0; i < drepl.length; ++i) {
                var reg = new RegExp('%' + drepl[i], 'g');
                if (drepl[i].length > 1) {
                    reg = new RegExp(drepl[i], 'g');
                }
                format = format.replace(reg, jdate.toDate(drepl[i]));
            }
            return format;
        };
    }
    // CONVERT JULIAN NUMBER TO DATE.
    if (!Number.prototype.toDate) {
        Number.prototype.toDate = function (as) {
            var X = parseFloat(this) + 0.5;
            var Z = Math.floor(X); //Get day without time
            var F = X - Z; //Get time
            var Y = Math.floor((Z - 1867216.25) / 36524.25);
            var A = Z + 1 + Y - Math.floor(Y / 4);
            var B = A + 1524;
            var C = Math.floor((B - 122.1) / 365.25);
            var D = Math.floor(365.25 * C);
            var G = Math.floor((B - D) / 30.6001);
            //must get number less than or equal to 12)
            var month = (G < 13.5) ? (G - 1) : (G - 13);
            //if Month is January or February, or the rest of year
            var year = (month < 2.5) ? (C - 4715) : (C - 4716);
            month -= 1; //Handle JavaScript month format
            var UT = B - D - Math.floor(30.6001 * G) + F;
            var day = Math.floor(UT);
            //Determine time
            UT -= Math.floor(UT);
            UT *= 24;
            var hour = Math.floor(UT);
            UT -= Math.floor(UT);
            UT *= 60;
            var minute = Math.floor(UT);
            UT -= Math.floor(UT);
            UT *= 60;
            var second = Math.round(UT);

            var newdate = new Date(Date.UTC(year, month, day, hour, minute, second));

            var zyear = newdate.getFullYear();
            var zmonth = newdate.getMonth() + 1;
            if (zmonth < 10) zmonth = '0' + zmonth;

            var zdate = newdate.getDate();
            if (zdate < 10) zdate = '0' + zdate;

            var zhour = newdate.getHours();
            if (zhour < 10) zhour = '0' + zhour;

            var zminute = newdate.getMinutes();
            if (zminute < 10) zminute = '0' + zminute;

            var zsecond = newdate.getSeconds();
            if (zsecond < 10) zsecond = '0' + zsecond;

            var ztime = newdate.getTime();
            var zday = newdate.getDay() + 1;
            var zweek = newdate.weekOfYear();
            var wmont = newdate.getWeek();

            var stday = ['', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            //if (TocmConfig.date.dayname) stday = TocmConfig.date.dayname;
            var smont = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            //if (TocmConfig.date.monname) smont = TocmConfig.date.monname;
            var sweek = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth'];
            //if (TocmConfig.date.wekname) sweek = TocmConfig.date.wekname;

            if (typeOf(as) === 'string') {
                if (as === 'month' || as === 'M') {
                    return zmonth;
                } else if (as === 'date' || as === 'D') {
                    return zdate;
                } else if (as === 'year' || as === 'Y') {
                    return zyear;
                } else if (as === 'hour' || as === 'h') {
                    return zhour;
                } else if (as === 'minute' || as === 'm') {
                    return zminute;
                } else if (as === 'second' || as === 's') {
                    return zsecond;
                } else if (as === 'time' || as === 't') {
                    return ztime;
                } else if (as === 'week' || as === 'W') {
                    return zweek;
                } else if (as === 'day' || as === 'd') {
                    return zday;
                } else if (as === 'dayname' || as === 'dn') {
                    return stday[zday];
                } else if (as === 'monthname' || as === 'mn') {
                    return smont[Number(zmonth)];
                } else if (as === 'weekmonth' || as === 'w') {
                    return wmont;
                } else if (as === 'weekname' || as === 'wn') {
                    return sweek[wmont];
                } else if (as === 'object') {
                    return {
                        year: zyear,
                        month: zmonth,
                        date: zdate,

                        hour: zhour,
                        minute: zminute,
                        second: zsecond,

                        time: ztime,
                        day: zday,
                        week: zweek
                    };
                }
            }

            return newdate;
        };
    }
})(Date);

// Extend Array.
(function (Array) {
    'use strict';
    // Shuffle array.
    if (!Array.prototype.shuffle) {
        Array.prototype.shuffle = function () {
            for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        };
        Object.defineProperty(Array.prototype, 'shuffle', {
            enumerable: false
        });
    }

    // Cycle array. Move first item to end, then return the moved item.
    if (!Array.prototype.cycle) {
        Array.prototype.cycle = function () {
            var first = this.shift();
            this.push(first);
            return first;
        };
        Object.defineProperty(Array.prototype, 'cycle', {
            enumerable: false
        });
    }

    // Delete array.
    if (!Array.prototype.del) {
        Array.prototype.del = function (index) {
            if (typeOf(index) === 'number') {
                var narr = [];
                for (var i = 0; i < this.length; ++i) {
                    if (i !== index) {
                        narr.push(this[i]);
                        this.shift();
                    }
                }
                for (var x = 0; x < narr.length; ++x) {
                    this.push(narr[x]);
                }
            }
            return this;
        };
        Object.defineProperty(Array.prototype, 'delete', {
            enumerable: false
        });
    }
})(Array);

// Extend String.
(function (String) {
    'use strict';
    // PREG REPLACE FUNCTION.
    if (!String.prototype.preg_replace) {
        String.prototype.preg_replace = function (pattern, replace, recursive) {
            var match = this.match(pattern),
                newstring, replaced, candidate;
            if (match) {
                replaced = replace;
                for (var i = 0; i < match.length; ++i) {
                    candidate = new RegExp('(\\$' + i + ')', 'g');
                    replaced = replaced.replace(candidate, match[i]);
                }
                newstring = this.replace(match[0], replaced);
                if (recursive !== false) {
                    if (newstring.match(pattern)) {
                        newstring = newstring.preg_replace(pattern, replace);
                    }
                }
                return newstring;
            }
            return this;
        };
    }
    // SPLIT PATH FUNCTION.
    if (!String.prototype.split_path) {
        String.prototype.split_path = function (type) {
            var splited, filename, filepath, i;
            // Slash or Backslash.
            if (this.match('/')) {
                splited = this.split('/');
                filename = splited[splited.length - 1];
                filepath = this.replace('/' + filename, '');
            } else if (this.match(/\\/)) {
                splited = this.split(/\\/);
                filename = splited[splited.length - 1];
                filepath = this.replace('\\' + filename, '');
            } else {
                return this;
            }

            // Returning result.
            if (type === 'filename') {
                return filename;
            } else if (type === 'path') {
                return filepath;
            } else {
                return {
                    filename: filename,
                    path: filepath
                };
            }
        };
    }
})(String);
/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING TOCM REGISTRY.
(function (window) {
    'use strict';
    // CREATING TOCM CONFIGURATIONS.
    window.TocmConfig = {
        basedir: '',
        autowrite: true,
        sortclass: false,
        showdebug: false,
        date: {
            dayname: ['', 'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'],
            monname: ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
            wekname: ['', 'Pertama', 'Kedua', 'Ketiga', 'Keempat', 'Kelima']
        }
    };
    // CREATING COLLECTIONS OF UNIVERSAL CLASS.
    window.TocmDefClass = {};
    // CREATING COLLECTIONS OF MEDIA SPESIFIC CLASS.
    window.TocmMedClass = {};
    // CREATING MEDIA COLLECTIONS.
    window.TocmMedias = {};
    // CREATING KEYFRAMES COLLECTIONS.
    window.TocmKeyframes = {};
    // CREATING FONTS COLLECTIONS.
    window.TocmFonts = {};
})(window);
/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING REFERENCE OBJECTS.
(function (window) {
    'use strict';
    window.TocmRef = {
        css3: [
            'animation', 'animation_name', 'animation_duration', 'animation_fill_mode', 'animation_timing_function', 'animation_delay',
            'animation_iteration_count', 'animation_direction', 'animation_play_state', 'background_clip', 'background_origin',
            'background_size', 'border_radius', 'border_top_left_radius', 'border_top_right_radius', 'border_bottom_left_radius',
            'border_bottom_right_radius', 'border_image', 'border_image_outset', 'border_image_repeat', 'border_image_slice',
            'border_image_source', 'border_image_width', 'box_align', 'box_direction', 'box_decoration_break', 'box_flex',
            'box_flex_group', 'box_lines', 'box_ordinal_group', 'box_orient', 'box_pack', 'box_sizing', 'box_shadow', 'break_after',
            'break_before', 'break_inside', 'columns', 'column_count', 'column_fill', 'column_gap', 'column_rule', 'column_rule_color',
            'column_rule_style', 'column_rule_width', 'column_span', 'column_width', 'marquee_direction', 'marquee_play_count',
            'marquee_speed', 'marquee_style', 'nav_index', 'nav_left', 'nav_right', 'nav_up', 'opacity', 'perspective', 'perspective_origin',
            'rotation', 'rotation_point', 'text_shadow', 'text_wrap', 'transform', 'transform_origin', 'transform_style', 'transition',
            'transition_property', 'transition_duration', 'transition_timing_function', 'transition_delay',
            // POSSIBLE DROPPED //
            'appearance', 'backface_visibility', 'grid_columns', 'grid_rows', 'hanging_punctuation', 'icon', 'punctuation_trim', 'resize',
            'target', 'target_name', 'target_new', 'target_position', 'word_break', 'word_wrap', 'filter', 'user_select'
        ],
        // PSEUDO LISTS //
        pseudo: [
            'link', 'visited', 'active', 'hover', 'focus', 'first_letter', 'first_line', 'first_child', 'before', 'after', 'lang', 'target'
        ],
        // VENDOR LISTS //
        vendor: [
            '', '-webkit-', '-moz-', '-o-', '-ms-'
        ],
        // RESTRICTED PROPERTIES FROM NUMBER AUTOMATIONS.
        noint: [
            'opacity', 'z-index', 'font-weight', 'column-count', 'line-height'
        ]
    };
    lock('TocmRef');
})(window);
/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING CSS STRING BUILDER.
(function (window) {
    'use strict';
    var TocmBuilder = {};
    // FUNCTION TO CREATE CSS STRING.
    TocmBuilder.generateCSS = function (object, tab) {
        var baseurl = '';
        if (TocmConfig.basedir !== '') {
            baseurl = TocmConfig.basedir + '/';
        }
        var ccss = TocmRef.ccss,
            xcss = TocmRef.xcss,
            css3 = TocmRef.css3,
            cssString = '',
            property;

        if (typeOf(object) === 'object') {
            // Sorting Properties.
            object = sortObject(object);
            // CREATE CUSTOM TAB.
            if (typeOf(tab) !== 'string') {
                tab = '';
            }
            // Processing CSS Object.
            for (var index in object) {
                if (object.hasOwnProperty(index) && object[index] !== '') {
                    // Formatting to CSS property format.
                    property = index.replace(/_/g, '-').replace(/\$/g, '*');
                    property = property.replace(/[\d]+/g, '');
                    if (typeOf(object[index]) === 'number' && TocmRef.noint.indexOf(property) < 0) {
                        // Formatting number.
                        object[index] += 'px';
                    }
                    if (object[index] !== null) {
                        if (typeOf(object[index] === 'string') && !Number(object[index])) {
                            object[index] = String(object[index]).replace(/(url)(\s?)([\(]{1})/g, 'url(' + baseurl);
                        }
                        if (String(object[index]).match(/(.*)(\;)\s?$/)) {
                            object[index] = String(object[index]).match(/(.*)(\;)\s?$/)[1];
                        }
                        if (css3.indexOf(index) > -1) {
                            // CSS3 Properties.
                            cssString += tab + property + ': ' + object[index] + '; ';
                            cssString += '-webkit-' + property + ': ' + object[index] + '; ';
                            cssString += '-moz-' + property + ': ' + object[index] + '; ';
                            cssString += '-o-' + property + ': ' + object[index] + '; ';
                            cssString += '-ms-' + property + ': ' + object[index] + ';\n';
                        } else {
                            cssString += tab + property + ': ' + object[index] + ';\n';
                        }
                    }
                }
            }
            return cssString;
        } else {
            return '';
        }
    };
    // FUNCTION TO WRITE CSS STRING TO HANDLER.
    TocmBuilder.writeDOM = function (name, media, value) {
        var node, head, chld, last;
        if (typeOf(name) === 'string' && typeOf(media) === 'string' && typeOf(value) === 'string') {
            head = document.getElementsByTagName('head')[0];
            chld = head.children;
            last = lastNode(chld, 'style');
            node = $('style[id="' + name + '"][data="' + media + '"]')[0];
            if (node) {
                node.innerHTML = value;
            } else {
                node = document.createElement('style');
                node.setAttribute('id', name);
                node.setAttribute('data', media);
                node.setAttribute('type', 'text/css');
                node.innerHTML = value;

                if (last > -1) {
                    head.insertBefore(node, chld[last + 1]);
                } else {
                    head.appendChild(node);
                }
            }
        }
        return node;
    };
    // FUNCTION TO WRITE CSS STRING INTO COMMON FORMATED STRING.
    TocmBuilder.writeCSS = function (object, isget) {
        if (typeOf(object) === 'object' && object.hasOwnProperty('name')) {
            if (object.name === '') return '';
            var mediaInfo, cssString = '',
                property, pseudo;
            var area = object.config.write_area,
                auto = object.config.write_auto,
                family = object.family,
                domid;

            if (object.media !== 'none') {
                // GENERATING CLASS FROM MEDIA COLLECTIONS.
                mediaInfo = new TocmMedia(object.media);
                if (typeOf(mediaInfo) === 'object') {
                    // OPENING CSS SELECTOR.
                    cssString += '\t\t' + object.name + ' {\n';
                    // CREATING CSS STRING.
                    cssString += TocmBuilder.generateCSS(object.properties, '\t\t\t');
                    // CLOSING CSS SELECTOR.
                    cssString += '\t\t}\n';
                    // CREATING PSEUDO IF EXISTS.
                    pseudo = object.pseudo;
                    for (property in pseudo) {
                        if (pseudo.hasOwnProperty(property)) {
                            if (typeOf(pseudo[property]) === 'object' && Object.keys(pseudo[property]).length > 0) {
                                cssString += '\t\t' + object.name + ':' + property + ' {\n';
                                cssString += TocmBuilder.generateCSS(pseudo[property], '\t\t\t');
                                cssString += '\t\t}\n';
                            }
                        }
                    }
                    // RETURNING THE GENERATED CSS STRING.
                    return cssString;
                }
            } else {
                // GENERATING CLASS FROM GLOBAL COLLECTIONS.
                cssString += '\n\t' + object.name + ' {\n';
                cssString += TocmBuilder.generateCSS(object.properties, '\t\t');
                cssString += '\t}\n';

                // CREATING PSEUDO IF EXISTS.
                pseudo = object.pseudo;
                for (property in pseudo) {
                    if (pseudo.hasOwnProperty(property)) {
                        if (typeOf(pseudo[property]) === 'object' && Object.keys(pseudo[property]).length > 0) {
                            cssString += '\t' + object.name + ':' + property + ' {\n';
                            cssString += TocmBuilder.generateCSS(pseudo[property], '\t\t');
                            cssString += '\t}\n';
                        }
                    }
                }
                // RETURNING THE GENERATED CSS STRING.
                return cssString;
            }
        }
    };
    // FUNCTION TO WRITE READY STRIG TO HANDLER.
    TocmBuilder.writeSCS = function () {
        var defaultClass = TocmDefClass,
            mediaClass = TocmMedClass,
            name, fml, className, dstr = '',
            mstr = '';
        var area, family, auto, pdstr = {}, pmdstr = {}, minfo, fmcstr, gcstr;
        // ENUMERATING DEFAULT CLASSES.
        if (TocmConfig.sortclass === true) {
            defaultClass = sortObject(TocmDefClass);
        }
        for (name in defaultClass) {
            if (defaultClass.hasOwnProperty(name)) {
                area = defaultClass[name].config.write_area;
                family = defaultClass[name].family;
                if (area === 'family') {
                    if (typeOf(pdstr[family]) !== 'string') {
                        pdstr[family] = '';
                    }
                    pdstr[family] += TocmBuilder.writeCSS(defaultClass[name], true);
                } else {
                    dstr += TocmBuilder.writeCSS(defaultClass[name], true);
                }
            }
        }

        // WRITING GLOBAL CLASSES.
        if (dstr !== '') {
            TocmBuilder.writeDOM('Global Class', 'universal', dstr);
        }
        // WRITING PRIVATE CLASSES.
        for (fml in pdstr) {
            if (pdstr.hasOwnProperty(fml)) {
                TocmBuilder.writeDOM(fml, 'universal', pdstr[fml]);
            }
        }

        // ENUMERATING MEDIA CLASSES.
        if (TocmConfig.sortclass === true) {
            mediaClass = sortObject(TocmMedClass);
        }
        for (name in mediaClass) {
            if (mediaClass.hasOwnProperty(name)) {
                if (TocmConfig.sortclass === true) {
                    mediaClass[name] = sortObject(mediaClass[name]);
                }
                for (className in mediaClass[name]) {
                    if (mediaClass[name].hasOwnProperty(className)) {
                        area = mediaClass[name][className].config.write_area;
                        family = mediaClass[name][className].family;
                        if (area === 'family') {
                            if (typeOf(pmdstr[family]) !== 'string') {
                                pmdstr[family] = '';
                            }
                            pmdstr[family] += TocmBuilder.writeCSS(mediaClass[name][className], true);
                        } else {
                            mstr += TocmBuilder.writeCSS(mediaClass[name][className], true);
                        }
                    }
                }
                // WRITING GLOBAL CLASSES.
                if (mstr !== '') {
                    // GETTING MEDIA INFO.
                    minfo = new TocmMedia(name);
                    gcstr = '';
                    // OPENING MEDIA QUERIES.
                    gcstr += '\n\t@media ' + minfo.value + ' {\n';
                    // ADDING CSS STRING.
                    gcstr += mstr;
                    // CLOSING MEDIA QUERIES.
                    gcstr += '\t}\n';
                    TocmBuilder.writeDOM('Global Class', name, gcstr);
                    mstr = '';
                }
                // WRITING PRIVATE CLASSES.
                for (fml in pmdstr) {
                    if (pmdstr.hasOwnProperty(fml)) {
                        minfo = new TocmMedia(name);
                        fmcstr = '';
                        // OPENING MEDIA QUERIES.
                        fmcstr += '\n\t@media ' + minfo.value + ' {\n';
                        // ADDING CSS STRING.
                        fmcstr += pmdstr[fml];
                        // CLOSING MEDIA QUERIES.
                        fmcstr += '\t}\n';
                        TocmBuilder.writeDOM(fml, name, fmcstr);
                    }
                }
                pmdstr = {};
            }
        }
    };

    // ATTACHING CSS STRING BUILDER TO WINDOW OBJECT.
    define('TocmBuilder', TocmBuilder);
})(window);
/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING A TOCM CLASS SUPPORT.
// CREATING DEBUGGER.
(function (window) {
    'use strict';
    if (!window.TocmConfig) {
        window.TocmConfig = {};
    }

    window.$log = window.TocmLogger = function (context, message, color, force) {
        if (TocmConfig.showdebug === true && typeOf(context) === 'string' && typeOf(message) === 'string' || force === true) {
            var date = new Date().format('%D-%M-%Y %h:%m:%s');

            if (typeOf(color) === 'string') {
                console.log('%c[' + date + '][' + context + '] >> ' + message, 'color:' + color + ';');
            } else {
                console.log('%c[' + date + '][' + context + '] >> ' + message, 'color:blue;');
            }
        }
    };
    // Locking Debugger.
    lock('$log');
    lock('TocmLogger');
})(window);

// KEYFRAME COLLECTIONS.
(function (window) {
    'use strict';
    // CREATING KEYFRAMES DEFINITIONS.
    var TocmKeyframe = function (name, position, properties) {
        var frame, pos;
        // DO ACTIONS ONLY IF ARGUMENTS IS VALID.
        if (typeOf(name) === 'string') {
            // CREATE KEYFRAMES IF ARGUMENT POSITION AND PROPERTIES ARE DEFINED, OR SELECT IF ONLY NAME THAT DEFINED.
            if (typeOf(position) === 'string' && typeOf(properties) === 'object') {
                $.log('TocmKeyframe', 'Creating new keyframe "' + this.name + '".');

                this.name = name;
                frame = TocmKeyframes[name];
                if (typeOf(frame) !== 'object') {
                    TocmKeyframes[name] = {};
                    TocmKeyframes[name][position] = properties;
                }

                TocmKeyframes[name][position] = properties;
                this[position] = properties;

                // Writing the Keyframe CSS.
                $.log('TocmKeyframe', 'Writing keyframe "' + this.name + '" to style node.', 'purple');
                this.write();
            } else {
                frame = TocmKeyframes[name];
                if (typeOf(frame) === 'object') {
                    this.name = name;
                    for (pos in frame) {
                        if (frame.hasOwnProperty(pos)) {
                            this[pos] = frame[pos];
                        }
                    }
                }
            }
        }
        return this;
    };
    // CREATING PROTOTYPE.
    TocmKeyframe.prototype = {
        // FUNCTION TO WRITE KEYFRAME.
        write: function () {
            var cstr = '',
                style, vendor;
            vendor = ['', '-webkit-'];
            if (this.hasOwnProperty('name') && typeOf(this.name) === 'string') {
                // Opening CSS Keyframes.
                for (var i = 0; i < vendor.length; ++i) {
                    cstr += '\n\t@' + vendor[i] + 'keyframes ' + this.name + ' {\n';
                    for (var pos in this) {
                        if (this.hasOwnProperty(pos) && pos !== 'name') {
                            // Opening Position.
                            cstr += '\t\t' + pos + ' {\n';
                            // Creating Properties.
                            if (typeOf(this[pos]) === 'object') {
                                cstr += TocmBuilder.generateCSS(this[pos], '\t\t\t');
                            }
                            // Closing Position.
                            cstr += '\t\t}\n';
                        }
                    }
                    // Closing CSS Keyframes.
                    cstr += '\t}\n';
                }
                TocmBuilder.writeDOM(this.name, 'keyframe', cstr);
            }
            return this;
        },
        // FUNCTION TO ADD TIMELINE POSITION.
        at: function (position, properties) {
            var key, current;
            if (this.hasOwnProperty('name') && typeOf(position) === 'string' && typeOf(properties) === 'object') {
                $.log('TocmKeyframe', 'Adding timeline "' + position + '" to keyframe "' + this.name + '".', 'green');
                if (typeOf(this[position]) !== 'object') {
                    this[position] = {};
                }

                for (key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        this[position][key] = properties[key];
                    }
                }
                TocmKeyframes[this.name][position] = this[position];
                this.write();
            }
            return this;
        }
    };
    // Hiding Prototype.
    Object.defineProperty(TocmKeyframe.prototype, 'write', {
        enumerable: false
    });
    Object.defineProperty(TocmKeyframe.prototype, 'at', {
        enumerable: false
    });
    // TocmKeyframe Wrapper.
    window.$keyframes = window.TocmKeyframe = function (name, position, propertis) {
        return new TocmKeyframe(name, position, propertis);
    };
    // Locking Keyframe.
    lock('$keyframes');
    lock('TocmKeyframe');
})(window);

// FONTS COLLECTIONS.
(function (window) {
    'use strict';
    // CREATING FUNCTION TO CREATE OR GET FONT-FACE COLLECTIONS.
    var TocmFont = function (name, src, opt) {
        var fonts, key;
        if (typeOf(name) === 'string') {
            fonts = TocmFonts[name];
            if (typeOf(src) === 'string' || typeOf(src) === 'array') {
                TocmFonts[name] = {};

                $.log('TocmFont', 'Creating new font "' + name + '".');

                this.name = name;
                TocmFonts[name].src = src;
                this.src = src;
                if (typeOf(opt) === 'object') {
                    for (key in opt) {
                        if (opt.hasOwnProperty(key)) {
                            TocmFonts[name][key] = opt[key];
                            this[key] = opt[key];
                        }
                    }
                }
                $.log('TocmFont', 'Writing font "' + name + '" to style node.', 'orange');
                this.write();
            } else {
                if (typeOf(fonts) === 'object') {
                    this.name = name;
                    for (key in fonts) {
                        if (fonts.hasOwnProperty(key)) {
                            this[key] = fonts[key];
                        }
                    }
                }
            }
        }
        return this;
    };
    // CREATING PROTOTYPES.
    TocmFont.prototype = {
        // WRITING FONTS.
        write: function () {
            var baseurl = '';
            if (TocmConfig.basedir !== '') {
                baseurl = TocmConfig.basedir + '/';
            }
            var cstr = '',
                key, j;
            if (this.hasOwnProperty('name')) {
                cstr += '\n\t@font-face {\n';
                for (key in this) {
                    if (this.hasOwnProperty(key)) {
                        if (key === 'name') {
                            cstr += '\t\tfont-family: "' + this.name + '";\n';
                            cstr += '\t\tsrc: local("' + this.name + '");\n';
                        } else if (key === 'src') {
                            if (typeOf(this.src) === 'array') {
                                for (j = 0; j < (this.src.length); ++j) {
                                    if (this.src[j].search('.eot') > -1) {
                                        cstr += '\t\tsrc: url("' + baseurl + this.src[j] + '");\n';
                                        cstr += '\t\tsrc: url("' + baseurl + this.src[j] + '?#iefix") format("embedded-opentype");\n';
                                    } else if (this.src[j].search('.ttf') > -1) {
                                        cstr += '\t\tsrc: url("' + baseurl + this.src[j] + '") format("truetype");\n';
                                    } else if (this.src[j].search('.svg') > -1) {
                                        cstr += '\t\tsrc: url("' + baseurl + this.src[j] + '") format("svg");\n';
                                    } else if (this.src[j].search('.otf') > -1) {
                                        cstr += '\t\tsrc: url("' + baseurl + this.src[j] + '") format("opentype");\n';
                                    } else if (this.src[j].search('.woff') > -1) {
                                        cstr += '\t\tsrc: url("' + baseurl + this.src[j] + '") format("woff");\n';
                                    } else {
                                        cstr += '\t\tsrc: url("' + baseurl + this.src[j] + '");\n';
                                    }
                                }
                            } else if (typeOf(this.src) === 'string') {
                                cstr += '\t\tsrc: url("' + this.src + '");';
                            }
                        } else {
                            cstr += '\t\t' + key.replace('_', '-') + ': ' + this[key] + ';\n';
                        }
                    }
                }
                cstr += '\t}\n';
                TocmBuilder.writeDOM(this.name, 'font', cstr);
            }
            return this;
        },
        // CONFIGURING FONTS.
        set: function (objkey, value) {
            var name, key;
            if (this.hasOwnProperty('name')) {
                name = this.name;
                if (typeOf(objkey) === 'object') {
                    for (key in objkey) {
                        if (objkey.hasOwnProperty(key)) {
                            this[key] = objkey[key];
                            TocmFonts[name][key] = objkey[key];
                        }
                    }
                } else if (typeOf(objkey) === 'string' && typeOf(value) === 'string') {
                    this[objkey] = value;
                    TocmFonts[name][objkey] = value;
                }
                this.write();
            }
            return this;
        }
    };
    // Hiding Prototype.
    Object.defineProperty(TocmFont.prototype, 'write', {
        enumerable: false
    });
    Object.defineProperty(TocmFont.prototype, 'set', {
        enumerable: false
    });
    // TocmFont Wrapper.
    window.$fonts = window.TocmFont = function (name, src, opt) {
        return new TocmFont(name, src, opt);
    };
    // Locking TocmFont.
    lock('$fonts');
    lock('TocmFont');
})(window);

// MEDIA COLLECTIONS.
(function (window) {
    'use strict';
    // CREATING FUNCTION TO CREATE MEDIA QUERIES COLLECTIONS.
    var TocmMedia = function (name, value) {
        var media;
        if (typeOf(name) === 'string') {
            if (typeOf(value) === 'string') {
                window.TocmMedias[name] = {
                    name: name,
                    value: value
                };
                this.name = name;
                this.value = value;
                return this;
            } else {
                media = window.TocmMedias[name];
                if (typeOf(media) === 'object') {
                    this.name = media.name;
                    this.value = media.value;
                    return this;
                } else {
                    return -1;
                }
            }
        }
    };

    // TocmMedia Wrapper.
    window.$media = window.TocmMedia = function (name, value) {
        return new TocmMedia(name, value);
    };
    // Locking TocmMedia.
    lock('$media');
    lock('TocmMedia');
})(window);
/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING TOCM CONSTRUCTOR.
(function (window) {
    'use strict';
    // CREATING CLASS SELECTOR.
    var TocmSelector = function (name, media) {
        var obj;
        // Ensure the given name is in valid format.
        if (typeOf(name) === 'string') {
            // Specifying where the class object will be selected.
            if (typeOf(media) === 'string' && media !== 'none' && new TocmMedia(media).hasOwnProperty('name')) {
                // Ensure the given media is exist on TocmMedia Registry.
                if (typeOf(TocmMedClass[media]) === 'object') {
                    obj = TocmMedClass[media][name];
                    // Cancel select if the obj is not TocmClass Object.
                    if (typeOf(obj) !== 'object' || !obj.hasOwnProperty('name')) {
                        return;
                    }
                } else {
                    return;
                }
            } else {
                obj = TocmDefClass[name];
            }
            // Returning selected object.
            return obj;
        } else {
            return;
        }
    };
    // CREATING FUNCTION TO CREATE NEW CLASS.
    var TocmClass = function (objname, props, media, delayed) {
        if (typeOf(objname) === 'string' && typeOf(props) === 'object') {
            // COLLECTING CSS PROPERTIES.
            $.log('TocmClass', 'Creating new class "' + objname + '".');

            this.name = this.family = objname;
            this.properties = props;
            this.pseudo = {};
            this.config = {
                write_area: 'universal', // family <> universal.
                write_auto: false
            };
            this.parent = {};

            // ADDING TO MEDIA SPESIFIC COLLECTION IF 'media' WAS DEFINED AND ENSURE THE MEDIA HAS BEEN REGISTERED.
            if (typeOf(media) === 'string' && media !== 'none' && new TocmMedia(media).hasOwnProperty('name')) {
                this.media = media;

                // ADD TO THE MEDIA COLLECTIONS IF ALREADY EXISTS, OR CREATE NEW IF NOT EXISTS.
                $.log('TocmClass', 'Adding class "' + objname + '" to media "' + media + '".', 'purple');

                if (typeOf(TocmMedClass[media]) === 'object') {
                    TocmMedClass[media][objname] = this;
                } else {
                    TocmMedClass[media] = {};
                    TocmMedClass[media][objname] = this;
                }
            } else {
                $.log('TocmClass', 'Adding class "' + objname + '" to media "universal".', 'purple');

                this.media = 'none';
                TocmDefClass[objname] = this;
            }
            // HIDING PRIVATE OBJECT.
            Object.defineProperty(this, 'config', {
                enumerable: false
            });
            Object.defineProperty(this, 'parent', {
                enumerable: false
            });
            // RETURNING THE CLASS.
            return this;
        } else {
            return;
        }
    };
    // CREATING FUNCTION TO CREATE BATCH OBJECT CLASSES.
    var TocmBatchClass = function (name, object, cmedia, area, family, parent) {
        var proname, tempname, newclass, media, newname, subclass, properties = {}, pseudos = {};
        if (typeOf(name) === 'string' && typeOf(object) === 'object') {
            // PARSING NAME TO GET WETHER THE NAME CONTAINS GLOBAL IDENTIFIER OR NOT.
            if (name.search('!') > -1) {
                name = name.replace('!', '');
                area = 'global';
            }

            // PARSING NAME TO GET WETHER THE NAME CONTAINS MEDIA IDENTIFIER OR NOT.
            if (name.search('@') > -1) {
                name = name.replace(/\s+(\@)\s+/g, '@'); // REMOVING SPACE.
                name = name.split('@'); // SPLITING NAME AND MEDIA.
                media = name[1]; // ADDING MEDIA NAME.
                name = name[0]; // ADDING CLASS NAME.
            } else {
                // IF NOT CONTAINS MEDIA IDENTIFIER, THEN TRY TO GET FROM ARGUMENT.
                if (typeOf(cmedia) === 'string' && cmedia !== 'none') {
                    // IF DEFINED, THEN USE IT.
                    media = cmedia;
                } else {
                    // ELSE, DEFINE MEDIA NAME WITH 'none'.
                    media = 'none';
                }
            }

            // CREATING NEW OBJECT FOR THIS CLASS.
            newclass = new TocmClass(name, {}, media);
            if (newclass.hasOwnProperty('name')) {
                if (typeOf(area) !== 'string' && area !== 'global') {
                    newclass.config.write_area = 'family';
                }
            } else {
                return;
            }

            // ENUMERATING PROPERTIES.
            for (proname in object) {
                if (object.hasOwnProperty(proname)) {
                    // IF PROPERTY IS OBJECT, THEN CREATE NEW CLASS INHERITING TO THIS CLASS.
                    if (typeOf(object[proname]) === 'object') {
                        if (TocmRef.pseudo.indexOf(proname) < 0) {
                            // IF PROPERTY IS NOT PSEUDO OBJECT, THEN CREATE NEW CLASS.
                            if (name !== '' && name !== ' ') {
                                newname = name; // ADDING THIS NAME AS PARENT NAME FOR NEW CLASS.
                            } else {
                                newname = '';
                            }
                            // PARSING MULTIPLE NAME USE.
                            if (proname.search('&') > -1) {
                                if (name !== '' && name !== ' ') {
                                    name = ' ' + name;
                                }
                                // If  name is multiple.
                                tempname = proname.replace(/\s+(\&)\s+/g, '&'); // REPLACING SPACE.
                                tempname = tempname.split('&'); // SPLITING NAME.
                                // ENUMERATING PSEUDO IDENFIER (:).
                                for (var x = 0; x < tempname.length; ++x) {
                                    if (!tempname[x].match(/^([\:]+)([a-zA-Z\d\-\_\(\)\[\]]+)$/)) {
                                        tempname[x] = ' ' + tempname[x];
                                    }
                                }
                                // ADDING NAME.
                                for (var i = 0; i < tempname.length - 1; ++i) {
                                    newname += tempname[i] + ',' + name;
                                }
                                newname += tempname[tempname.length - 1];
                            } else {
                                if (proname.match(/^([\:]+)([a-zA-Z\d\-\_\(\)\[\]]+)$/)) {
                                    newname += proname;
                                } else {
                                    if (name !== '' && name !== ' ') {
                                        newname += ' ' + proname;
                                    } else {
                                        newname += proname;
                                    }
                                }
                            }
                            // REMOVING SPACE IN BEGINING OF NAME.
                            newname = newname.replace(/^(\s)/, '');
                            // ASIGNING FAMILY NAME.
                            if (typeOf(family) !== 'string') {
                                family = name;
                            }
                            // CREATING NEW CLASS INHERITING TO THIS CLASS.
                            $.log('TocmClass', 'Adding child-class "' + newname + '" to parent calss "' + name + '".', 'green');

                            TocmConfig.autowrite = false;
                            subclass = new TocmBatchClass(newname, object[proname], media, area, family, newclass);
                        } else {
                            // IF PROPERTY IS PSEUDO OBJECT, THEN ADD THE PSEUDO OBJEC TO QUEUE.
                            if (typeOf(pseudos[proname]) !== 'object') {
                                pseudos[proname] = object[proname];
                            } else {
                                for (var vip in object[proname]) {
                                    if (object[proname].hasOwnProperty(vip)) {
                                        pseudos[proname][vip] = [object][proname][vip];
                                    }
                                }
                            }
                        }
                    } else {
                        // IF PROPERTI IS PLAIN OBJECT, THEN ADD THE PROPERTY TO QUEUE.
                        properties[proname] = object[proname];
                    }
                }
            }
            // ASIGNING FAMILY NAME.
            if (typeOf(family) === 'string') {
                newclass.family = family;
            } else {
                newclass.family = name;
            }
            // ASIGNING PARENT NAME.
            if (typeOf(parent) === 'object' && parent.hasOwnProperty('name')) {
                newclass.parent = parent;
            }
            // APPLYING PROPERTIES.
            for (var prop in properties) {
                if (properties.hasOwnProperty(prop)) {
                    newclass.properties[prop] = properties[prop];
                }
            }
            // APPLYING PSEUDOS.
            for (var psdo in pseudos) {
                if (pseudos.hasOwnProperty(psdo)) {
                    newclass.pseudo[psdo] = pseudos[psdo];
                }
            }
            // APPLYING CLASS.
            if (newclass.name === newclass.family) {
                TocmConfig.autowrite = true;
            }
            newclass.apply();
            // RETURNING CLASS.
            return newclass;
        }
    };
    // CREATING WRPAPPER //
    window.$global = function (selector, props, media) {
        return new TocmBatchClass(selector, props, media, 'global');
    };
    // CREATE A TOCM SELECTOR AND CREATOR WRAPPER.
    window.$class = window.Tocm = function (select, omedia, media) {
        // Ensure the selector/class pattern is string.
        if (typeOf(select) === 'string') {
            // If 'omedia' is string, then use it as media to select class.
            if (typeOf(omedia) === 'string') {
                return new TocmSelector(select, omedia);
            }
            // Else if 'omedia' is object, then use it as object to create class.
            else if (typeOf(omedia) === 'object') {
                // If the 'media' is string, then use it as media to create class.
                if (typeOf(media) === 'string' && media !== 'none') {
                    return new TocmBatchClass(select, omedia, media);
                }
                // Else, just create class as universal class.
                else {
                    return new TocmBatchClass(select, omedia);
                }
                // Writing CSS if the auto write is true.
                if (TocmConfig.autowrite === true) {
                    // TocmBuilder.writeSCS();
                }
            }
            // Else, just select class with no media.
            else {
                return new TocmSelector(select);
            }
        } else if (typeOf(select) === 'object') {
            var newclass = Object.keys(select);
            for (var i = 0; i < newclass.length; ++i) {
                new Tocm(newclass[i], select[newclass[i]]);
            }
        }
    };
    lock('Tocm');
    lock('$class');
    lock('$global');

    // CREATING MODULE WRAPPER.
    window.Tocm.module = TocmClass.prototype = {
        // CREATING FUNCTION TO APPLY CHANGES.
        apply: function () {
            if (this.hasOwnProperty('name')) {
                if (this.media !== 'none') {
                    TocmMedClass[this.media][this.name] = this;
                } else {
                    TocmDefClass[this.name] = this;
                }
                if (TocmConfig.autowrite === true) {
                    $.log('TocmClass', 'Writing class "' + this.name + '" changes to style node.', 'orange');
                    TocmBuilder.writeSCS(this);
                }
            }
            return this;
        },
        write: function () {
            TocmBuilder.writeSCS();
            return this;
        }
    };
    // HIDING CORE MODULE.
    Object.defineProperty(Tocm.module, 'apply', {
        enumerable: false
    });
    Object.defineProperty(Tocm.module, 'write', {
        enumerable: false
    });

    // CREATING MODULE SETTER.
    Tocm.defineModule = function (name, func) {
        if (typeOf(name) === 'string' && typeOf(func) === 'function') {
            Tocm.module[name] = func;
            Object.defineProperty(Tocm.module, name, {
                enumerable: false
            });
            return Tocm.module[name];
        }
    };
    // CREATING LAYOUT DEBUGGER.
    Tocm.debugLayout = function (linecolor) {
        if (typeOf(linecolor) !== 'string' || linecolor.match(/\#/)) {
            linecolor = '#f00';
        }
        $class('*', {
            box_shadow: '0 0 0 1px ' + linecolor
        });
    };
    // CREATING STYLE COLLECTOR.
    Tocm.collect = function () {
        var csstring = '';
        $('style[data]').each(function () {
            csstring += $(this).html();
        });
        return csstring;
    };
})(window);

// CREATING TOCM MODULES.
(function (e) {
    'use strict';
    // MODULE TO ASSIGN PROPERTIES.
    e.module.set = function (objkey, value) {
        // DO ACTIONS ONLY IF THIS OBJECT IS TOCM CLASS.
        if (this.hasOwnProperty('name') && this.hasOwnProperty('properties')) {
            var key;
            // DO ACTIONS ONLY IF THE ARGUMENTS IS VALID TYPE.
            if (typeOf(objkey) === 'object') {
                for (key in objkey) {
                    if (objkey.hasOwnProperty(key)) {
                        this.properties[key] = objkey[key];
                    }
                }
            } else if (typeOf(objkey) === 'string' && typeOf(value) === 'string') {
                this.properties[objkey] = value;
            }
            // APPLYING CHANGES.
            this.apply();
        }
        return this;
    };
    // MODULE TO ASSIGN PSEUDO PROPERTIES.
    e.module.on = function (pseudo, props) {
        var key;
        // DO ACTIONS ONLY IF ALL ARGUMENTS WAS DEFINED WITH TRUE TYPE AND IF THIS CLASS IS TOCM CLASS.
        if (typeOf(pseudo) === 'string' && typeOf(props) === 'object' && this.hasOwnProperty('name')) {
            if (pseudo.search('&') > -1) {
                pseudo = pseudo.replace(/\s+(\&)\s+/g, '&');
                pseudo = pseudo.split('&');
                for (var i = 0; i < pseudo.length; ++i) {
                    if (this.media !== 'none') {
                        this.on(pseudo[i], props);
                    } else {
                        this.on(pseudo[i], props);
                    }
                }
            } else {
                // DEFINE NEW PSEUDO IF UNDEFINED.
                if (typeOf(this.pseudo[pseudo]) === 'undefined') {
                    this.pseudo[pseudo] = {};
                }
                // APPLYING PROPERTIES TO PSEUDO.
                for (key in props) {
                    if (props.hasOwnProperty(key)) {
                        this.pseudo[pseudo][key] = props[key];
                    }
                }
                // APPLYING CHANGES.
                this.apply();
            }
        }
        return this;
    };
    // MODULE TO IMPORT PROPERTIES FROM ANOTHER CLASS.
    e.module.copy = function (name, media, psdo) {
        var parent, key, ppsdo;
        if (typeOf(name) === 'string') {
            if (typeOf(media) === 'string' && media !== '' && media !== 'none') {
                parent = new TocmClass(name, media);
            } else {
                parent = new TocmClass(name);
            }

            for (key in parent.properties) {
                if (parent.properties.hasOwnProperty(key)) {
                    this.properties[key] = parent.properties[key];
                }
            }

            if (typeOf(psdo) === 'string') {
                if (parent.pseudo.hasOwnProperty(psdo)) {
                    ppsdo = parent.pseudo[psdo];
                    for (key in ppsdo) {
                        if (ppsdo.hasOwnProperty(key)) {
                            if (!this.pseudo.hasOwnProperty(psdo)) {
                                this.pseudo[psdo] = {};
                            }
                            this.pseudo[psdo][key] = ppsdo[key];
                        }
                    }
                }
            }
            this.apply();
        }
        return this;
    };
    // MODULE TO ADD CHILD CLASS. 
    e.module.add = function (name, prop) {
        var newname = this.name + ' ';
        if (typeOf(name) === 'string') {
            if (name.search('&')) {
                name = name.replace(/\s+(\&)\s+/g, '&');
                name = name.split('&');
                for (var i = 0; i < name.length - 1; ++i) {
                    newname += name[i] + ', ' + this.name + ' ';
                }
                newname += name[name.length - 1];
            }
        }
        var newclass = $class(newname, prop, this.media);
        if (newclass.hasOwnProperty('name')) {
            newclass.family = this.family;
            newclass.parent = this;
            newclass.config.write_area = 'family';
            var doc = document.getElementById(newclass.name);
            if (doc) {
                doc.parentNode.removeChild(doc);
            }
            newclass.apply();
            return newclass;
        } else {
            return this;
        }
    };
    // MOODULE TO NAVIGATE TO OTHER CLASS.
    e.module.goTo = function (name) {
        var fclass = new TocmClass(this.name + ' ' + name, this.media);
        if (fclass.hasOwnProperty('name')) {
            return fclass;
        } else {
            return this;
        }
    };
    // MODULE TO GO BACK TO PARENT CLASS.
    e.module.back = function () {
        if (this.hasOwnProperty('parent') && this.parent.hasOwnProperty('name')) {
            return this.parent;
        } else {
            return this;
        }
    };

    // HIDING MODULES.
    var mod = ['set', 'on', 'copy', 'add', 'goto', 'back'];
    for (var i = 0; i < mod.length; ++i) {
        Object.defineProperty(e.module, mod[i], {
            enumerable: false
        });
    }
})(Tocm);
/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING GLOBAL REFERENCES.
(function (window) {
    'use strict';
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
/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING CONFIGURATION AND COLLECTIONS.
(function (window) {
    'use strict';
    window.TocmTimeline = {};
    if (!TocmConfig) {
        window.TocmConfig = {};
    }
    TocmConfig.animation = {
        duration: 0,
        timing: 'linear',
        delay: 0,
        repeat: 1,
        direction: 'normal',
        state: 'running',
        inherit: true,
        endNode: '',
        endTime: 0
    };
})(window);

// CREATING CONSTRUCTOR.
(function (window) {
    'use strict';
    // CREATING ENUMERATOR.
    var _writeAnimation = function (name, property, preconf, timeline) {
        if (typeOf(name) === 'string' && typeOf(property) === 'object') {
            // GETTING CONFIGURATIONS.
            var conf = Object.keys(TocmConfig.animation),
                config = TocmConfig.animation;

            // CREATING USABLE VARIABLES.
            var csstring = '',
                keyframe = '',
                cssclass = '';
            var atab = '\t',
                btab = '\t\t',
                ctab = '\t\t\t',
                open = ' {\n',
                line = ';\n',
                close = '}\n';

            // CREATING ANIMATION OBJECT.
            var animation = property,
                inherited = {}, selftimeline = {};

            // CREATING ANIMATION CONFIGURATIONS.
            if (!animation.duration) {
                if (typeOf(preconf) === 'object') {
                    animation.duration = preconf.duration;
                } else {
                    animation.duration = config.duration;
                }
            }
            if (!animation.timing) {
                if (typeOf(preconf) === 'object') {
                    animation.timing = preconf.timing;
                } else {
                    animation.timing = config.timing;
                }
            }
            if (!animation.delay) {
                if (typeOf(preconf) === 'object') {
                    animation.delay = preconf.delay;
                } else {
                    animation.delay = config.delay;
                }
            }
            if (!animation.repeat) {
                if (typeOf(preconf) === 'object') {
                    animation.repeat = preconf.repeat;
                } else {
                    animation.repeat = config.repeat;
                }
            }
            if (!animation.direction) {
                if (typeOf(preconf) === 'object') {
                    animation.direction = preconf.direction;
                } else {
                    animation.direction = config.direction;
                }
            }
            if (!animation.state) {
                if (typeOf(preconf) === 'object') {
                    animation.state = preconf.state;
                } else {
                    animation.state = config.state;
                }
            }
            if (typeOf(animation.inherit) !== 'boolean') {
                if (typeOf(preconf) === 'object') {
                    animation.inherit = preconf.inherit;
                } else {
                    animation.inherit = config.inherit;
                }
            }

            // CREATING TIMELINE.
            if (typeOf(timeline) === 'object' && animation.inherit === true) {
                for (var x in timeline) {
                    if (timeline.hasOwnProperty(x)) {
                        selftimeline[x.replace(/\%/g, '')] = timeline[x];
                    }
                }
            }
            for (var time in animation) {
                if (animation.hasOwnProperty(time) && time.match(/\%/g)) {
                    selftimeline[time.replace(/\%/g, '')] = animation[time];
                }
            }

            // SORTING TIMELINE.
            selftimeline = sortObject(selftimeline);

            // CREATING CSS KEYFRAMES STRING.
            // Opening keyframes.
            keyframe += atab + '@keyframes ' + name.replace(/\./g, '_').replace(/\s/g, '').replace(/\#/g, '_') + open;
            // Adding keyframes properties.
            for (time in selftimeline) {
                if (selftimeline.hasOwnProperty(time)) {
                    inherited[time] = selftimeline[time];

                    keyframe += btab + time + '%' + open;
                    keyframe += TocmBuilder.generateCSS(selftimeline[time], ctab);
                    keyframe += btab + close;
                }
            }
            // Closing keyframes.
            keyframe += atab + close;
            // Opening keyframes.
            keyframe += atab + '@-webkit-keyframes ' + name.replace(/\./g, '_').replace(/\s/g, '').replace(/\#/g, '_') + open;
            // Adding keyframes properties.
            for (time in selftimeline) {
                if (selftimeline.hasOwnProperty(time)) {
                    keyframe += btab + time + '%' + open;
                    keyframe += TocmBuilder.generateCSS(selftimeline[time], ctab);
                    keyframe += btab + close;
                }
            }
            // Closing keyframes.
            keyframe += atab + close;

            // CREATING CSS CLASS STRING.
            // Opening selector.
            cssclass += atab + name + open;
            // Adding animation properties.
            cssclass += btab + 'animation: ' + name.replace(/\./g, '_').replace(/\s/g, '').replace(/\#/g, '_') + ' ' + animation.duration + 's ' + animation.timing + ' ' + animation.delay + 's ' + animation.repeat + ' ' + animation.direction + ';\n';
            cssclass += btab + 'animation-play-state: ' + animation.state + ';\n';
            cssclass += btab + '-webkit-animation: ' + name.replace(/\./g, '_').replace(/\s/g, '').replace(/\#/g, '_') + ' ' + animation.duration + 's ' + animation.timing + ' ' + animation.delay + 's ' + animation.repeat + ' ' + animation.direction + ';\n';
            cssclass += btab + '-webkit-animation-play-state: ' + animation.state + ';\n';
            // Closing selector
            cssclass += atab + close;

            // ADDING GENERATED CLASS AND KEYFRAME TO CSS STRING.
            csstring += keyframe + '\n' + cssclass + '\n';

            // ITERATING CHILD ANIMATIONS.
            for (var child in animation) {
                if (animation.hasOwnProperty(child) && child.match(/\%/g) === null && conf.indexOf(child) < 0) {
                    csstring += _writeAnimation(name + ' ' + child, animation[child], {
                        duration: animation.duration,
                        timing: animation.timing,
                        delay: animation.delay,
                        repeat: animation.repeat,
                        direction: animation.direction,
                        state: animation.state,
                        inherit: animation.inherit
                    }, inherited);
                }
            }
            return csstring;
        } else {
            return '';
        }
    };

    // CREATING CORE CONSTRUCTOR.
    var TocmAnimation = function (name, properties) {
        if (typeOf(name) === 'string' && !name.match(/[\!\@\#\$\%\^\&\*\.\,\:\;]+/)) {
            if (typeOf(properties) === 'object') {
                $.log('TocmAnimation', 'Creating new animation "' + name + '".');
                this.name = name;
                for (var key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        this[key] = properties[key];
                    }
                }
                this.apply();
                return this;
            } else {
                return TocmTimeline[name];
            }
        }
    };

    // REGISTERING TO WINDOW OBJECT AND CREATING MODULE WRAPPER.
    window.$animation = window.TocmAnimation = function (name, properties) {
        return new TocmAnimation(name, properties);
    };
    // LOCKING OBJECT.
    lock('$animation');
    lock('TocmAnimation');

    // CREATING MODULES.
    window.TocmAnimation.module = TocmAnimation.prototype = {
        apply: function () {
            // Getting the larger runtime.
            this.last();
            // Hiding Properties.
            var x = ['endNode', 'endTime', 'name'];
            for (var i = 0; i < x.length; ++i) {
                if (this.hasOwnProperty(x[i])) {
                    Object.defineProperty(this, x[i], {
                        enumerable: false
                    });
                }
            }
            // Adding animation object to Timeline.
            TocmTimeline[this.name] = this;
            // Build the animation.
            $.log('TocmAnimation', 'Writing animation "' + this.name + '" to style node.', 'orange');
            TocmBuilder.writeDOM(this.name, 'animation', _writeAnimation('.' + this.name, JSON.parse(JSON.stringify(this))));
            return this;
        },
        // FUNCTION TO GET LAST ANIMATED CLASS.
        last: function () {
            var conf = Object.keys(TocmConfig.animation),
                config = TocmConfig.animation;

            var endTime = config.endTime,
                endNode = config.endNode;

            var inherit = function (animation, preconf) {
                if (typeOf(animation) === 'object') {
                    // CREATING ANIMATION CONFIGURATIONS.
                    if (!animation.duration) {
                        if (typeOf(preconf) === 'object') {
                            animation.duration = preconf.duration;
                        } else {
                            animation.duration = config.duration;
                        }
                    }
                    if (!animation.delay) {
                        if (typeOf(preconf) === 'object') {
                            animation.delay = preconf.delay;
                        } else {
                            animation.delay = config.delay;
                        }
                    }
                    if (!animation.repeat) {
                        if (typeOf(preconf) === 'object') {
                            animation.repeat = preconf.repeat;
                        } else {
                            animation.repeat = config.repeat;
                        }
                    }
                }
                return animation;
            };

            var nobj = JSON.parse(JSON.stringify(this));
            nobj = inherit(nobj);

            var gLast = function (obj) {
                if (typeOf(obj) !== 'object') return;
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (key === 'duration') {
                            var hX = obj.duration;
                            if (obj.hasOwnProperty('delay') && hX > 0) {
                                hX += obj.delay;
                            }
                            if (hX > endTime) {
                                if (obj.hasOwnProperty('repeat')) {
                                    if (obj.repeat === 'infinite') {
                                        $.log('TocmAnimation', '"' + obj.name + '": using infinite play and it\'s mean never stoped. Now skipping end-point node.', 'purple');
                                        endTime = 0;
                                        endNode = '';
                                    } else if (obj.repeat > 0) {
                                        $.log('TocmAnimation', '"' + obj.name + '": takes ' + (hX * obj.repeat) + 's to finish run. It\'s larger than current largest time: "' + endTime + 's". Now use it as end-point node.', 'purple');
                                        endTime = hX * obj.repeat;
                                        endNode = obj.name;
                                    }
                                } else {
                                    $.log('TocmAnimation', '"' + obj.name + '": takes ' + hX + 's to finish run. It\'s larger than current largest time: "' + endTime + 's". Now use it as end-point node.', 'purple');
                                    endTime = hX;
                                    endNode = obj.name;
                                }
                            } else {
                                $.log('TocmAnimation', '"' + obj.name + '": takes ' + hX + 's to finish run. It\'s smaller or equal to current largest time: "' + endTime + 's". Now skip it.', 'purple');
                            }
                        } else if (typeOf(obj[key]) === 'object' && !key.match(/\%/g) && conf.indexOf(key) < 0) {
                            var xobj = obj[key];
                            xobj.name = key;
                            xobj = inherit(xobj, obj);
                            gLast(xobj);
                        }
                    }
                }
            };

            gLast(nobj);

            this.endNode = endNode;
            this.endTime = endTime;

            return this;
        }
    };
})(window);

// CREATING MODULES.
(function (e) {
    'use strict';
    // FUNCTION TO ADD CHILD ANIMATION.
    e.add = function (name, properties) {
        $.log('TocmAnimation', 'Adding new animation "' + name + '" to parent animation "' + this.name + '".');
        if (typeOf(name) === 'string' && typeOf(properties) === 'object') {
            this[name] = properties;
            this.apply();
            return this;
        }
    };
    // FUNCTION TO PAUSE ANIMATION.
    e.pause = function (delay) {
        $.log('TocmAnimation', 'Pausing animation "' + this.name + '".');
        this.state = 'paused';
        this.apply();
        var target = this;
        if (typeOf(delay) === 'number') {
            setTimeout(function () {
                target.play();
            }, (delay * 1000));
        }
        return this;
    };
    // FUNCTION TO CONTINUE ANIMATION.
    e.play = function () {
        $.log('TocmAnimation', 'Playing animation "' + this.name + '".');
        this.state = 'running';
        this.apply();
        return this;
    };
    // FUNCTION TO SET PROPERTIES OR CONFIGURATIONS.
    e.set = function (property, value) {
        $.log('TocmAnimation', 'Setting property to animation "' + this.name + '".', 'green');
        if (typeOf(property) === 'string') {
            var recset = function (object, prop) {
                for (var key in prop) {
                    if (prop.hasOwnProperty(key)) {
                        if (typeOf(prop[key]) === 'object') {
                            if (!object[key]) {
                                object[key] = {};
                            }
                            recset(object[key], prop[key]);
                        } else {
                            object[key] = prop[key];
                        }
                    }
                }
            };

            if (typeOf(value) === 'object') {
                if (!this[property]) {
                    this[property] = {};
                }
                recset(this[property], value);
            } else {
                this[property] = value;
            }
            $.log('TocmAnimation', 'Applying changes to animation "' + this.name + '".', 'purple');
            this.apply();
        } else if (typeOf(property) === 'object') {
            for (var name in property) {
                if (property.hasOwnProperty(name)) {
                    this.set(name, property[name]);
                }
            }
        }
        this.pause(0.01);
        return this;
    };
    // FUNCTION TO DELETE ANIMATION.
    e.remove = function () {
        $.log('TocmAnimation', 'Removing animation "' + this.name + '".', 'red');
        delete TocmTimeline[this.name];
        var node = $.path('#' + this.name.replace(/\./g, ''))[0];
        node.parentNode.removeChild(node);
        return [];
    };

    // HIDING MODULES.
    var mod = Object.keys(e);
    for (var i = 0; i < mod.length; ++i) {
        Object.defineProperty(TocmAnimation.module, mod[i], {
            enumerable: false
        });
    }
})(TocmAnimation.module);
/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING SELECTOR.
(function (window) {
    'use strict';
    // CREATING CORE SELECTOR.
    var TocmQuery = function (pattern, context) {
        var doms = [],
            i;
        // FORWARD TO JQUERY IF USING CONTEXT.
        if (pattern && context) return jQuery(pattern, context);

        // GETTING PATTERN TYPE.
        if (typeOf(pattern) === 'string') {
            // Fixing slash-space.
            pattern = pattern.replace(/\s?\/\s?/g, ' > ');

            // Creating RegExp Pattern.
            var pregmatch = [
                /(\&)([a-zA-Z\d\-\_]+)([\|\*\~\$\!\^\=]+)([\#\a-zA-Z\d\-\_]+)/, // Attribute Selector.

                /(\@)([a-zA-Z\d\-\_]+)/, // Name Contains.
                /(\:)([\d]+)/, // Index Number.

                /(#!)([a-zA-Z\d\-\_]+)/, // ID NOT Contains.
                /(.!)([a-zA-Z\d\-\_]+)/, // Class NOT Contains.
                /(@!)([a-zA-Z\d\-\_]+)/ // Name NOT Contains.
            ];
            // Creating Pattern Replace to meet with XPath Pattern.
            var pregrepl = [
                '[$2$3"$4"]',

                '[name*="$2"]',
                ':eq($2)',

                '[id!="$2"]',
                '[class!="$2"]',
                '[name!="$2"]'
            ];
            // Creating XPath Pattern.
            for (i = 0; i < pregmatch.length; ++i) {
                if (pattern.match(pregmatch[i])) {
                    pattern = pattern.preg_replace(pregmatch[i], pregrepl[i]);
                }
            }
            //console.log(pattern);
        }

        return jQuery(pattern);
    };
    // ADDING TOCMQUERY TO WINDOW.
    window.$path = window.TocmQuery = TocmQuery;
    // LOCKING OBJECT.
    lock('$path');
    lock('TocmQuery');
})(window);
/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING TOCM TASK LIBRARY.
(function (window) {
    'use strict';
    window.TocmRegistry = {
        EventLibrary: {
            DOMEvent: {},
            IOEvent: {}
        },
        TaskLibrary: {
            Task: {
                length: 0,
                splice: function () {}
            },
            Listener: {
                length: 0,
                splice: function () {}
            }
        }
    };
})(window);

// CREATING TASK CONSTRUCTOR.
(function (window) {
    'use strict';
    // CREATING TASK LISTENER.
    var listenTask = function (tsid, time) {
        if (typeOf(tsid) === 'number') {
            var listener = TocmRegistry.TaskLibrary.Listener,
                tasklist = TocmRegistry.TaskLibrary.Task,
                task = tasklist[tsid];

            if (typeOf(time) === 'number') {
                listener[tsid] = setTimeout(function () {
                    task.call();
                }, time);

                listener.length++;
            } else if (typeOf(task.nextRun === 'number') && task.nextRun > 0) {
                listener[tsid] = setTimeout(function () {
                    task.call();
                }, task.nextRun);

                listener.length++;
            } else if (typeOf(task.nextRun) === 'string') {
                var nexd = new Date(task.nextRun).getTime();
                var curd = new Date().getTime();
                var tdur = nexd - curd;

                if (tdur > 0) {
                    listener[tsid] = setTimeout(function () {
                        task.call();
                    }, tdur);

                    listener.length++;
                } else {
                    task.status = 'stopped';
                }
            }
        }
    };
    var unlistenTask = function (tsid) {
        var listener = TocmRegistry.TaskLibrary.Listener;

        if (listener[tsid]) {
            clearTimeout(listener[tsid]);
            delete listener[tsid];
            listener.length--;
        }
    };

    // CREATING TASK BUILDER.
    var TocmTask = function (name) {
        var task = TocmRegistry.TaskLibrary.Task;
        if (typeOf(name) === 'string') {
            $.log('TocmTask', 'Creating new task "' + name + '".');
            // Handle if task already exist.
            for (var i = 0; i < task.length; ++i) {
                if (task[i].name === name) {
                    $.log('TocmTask', 'Task "' + name + '" is already exist. Now return it.', 'orange');
                    return task[i];
                }
            }
            // Increasing task length.
            task.length++;
            // Configuring new task.
            this.name = name;
            this.tsid = (task.length - 1);
            this.status = 'init';
            this.runtime = '';
            this.nextRun = this.lastRun = this.trigger = '';

            this.actions = [];

            task[this.tsid] = this;
            $.log('TocmTask', 'Task "' + name + '" has been created.', 'green');
        }
        return this;
    };

    // CREATING TASK HANDLER.
    // ------------------------------------------------------
    // Handling actions.
    var actionHandler = function (task) {
        $.log('TocmTask', 'Running task "' + task.name + '".', 'orange');
        task.status = 'running';
        // Handling task onCall event.
        if (typeOf(task.onCall) === 'function') task.onCall(task);

        // Getting the actions.
        var action = task.actions;
        // Enumerating actions.
        try {
            // Trying to trigger actions.
            for (var i = 0; i < action.length; ++i) {
                $.log('TocmTask', 'Triggering action "' + action[i].name + '".');
                action[i](task);
                $.log('TocmTask', 'Action "' + action[i].name + '" has been triggered.', 'green');
            }
        } catch (e) {
            // If error occurs while triggering actions, then call the onFail handler and stop the task.
            task.status = 'failed';
            if (typeOf(task.onFail) === 'function') task.onFail(task);

            $.log('TocmTask', e.message, 'red', true);
        } finally {
            if (task.status !== 'failed') {
                task.status = 'ready';
                task.lastRun = new Date().format('dn mn %D, %Y %h:%m:%s');

                if (typeOf(task.onLoad) === 'function') task.onLoad(task);

                $.log('TocmTask', 'Task "' + task.name + '" finished running. Now it\'s ready for next run.', 'green');
                task.init();
                listenTask(task.tsid);
            }
        }
    };
    // Handling realtime task.
    var realtimeHandler = function (task) {
        // Set up the next run time.
        task.nextRun = 5;
        // Change task status.
        task.status = 'ready';

        return task;
    };
    // Handling immediate task.
    var immediateHandler = function (task) {
        // Turn off task.
        task.nextRun = 0;
        // Change task status.
        task.status = 'ready';

        return task;
    };
    // Handling delayed task.
    var delayedHandler = function (task) {
        // Getting current date in milliseconds.
        var curnMil = new Date().getTime();
        var nextMil;

        // Getting trigger.
        var trigger = task.trigger;
        var trigarr = trigger.split(' ');
        // Parsing trigger.
        if (trigarr.length > 1 && trigarr[0] === 'every') {
            var pat = trigarr[1].split(/([\d\.]+)/);
            pat[1] = Number(pat[1]);
            switch (pat[2]) {
            case 's':
                nextMil = (pat[1] * 1000);
                break;
            case 'm':
                nextMil = (pat[1] * 60 * 1000);
                break;
            case 'h':
                nextMil = (pat[1] * 60 * 60 * 1000);
                break;
            case 'd':
                nextMil = (pat[1] * 60 * 60 * 24 * 1000);
                break;
            case 'w':
                nextMil = (pat[1] * 60 * 60 * 24 * 7 * 1000);
                break;
            default:
                nextMil = 0;
                break;
            }
        }

        task.nextRun = new Date(curnMil + nextMil).format('dn mn %D, %Y %h:%m:%s');
        // Change task status.
        task.status = 'ready';

        return task;
    };
    // Handling scheduled task.
    var scheduledHandler = function (task) {
        var nextRun, lowTime, higTime;
        var nextDay = Number(new Date().toJulian().toDate('D')) + 1;
        var curTime = new Date().getTime();

        var trigger = task.trigger;
        var trigarr = trigger.split(/\s/);
        if (trigarr.length > 1) {
            switch (trigarr[0]) {
            case 'daily':
                if (trigarr[1] === 'at') {
                    // Handling invalid time format.
                    if (!trigarr[2].match(/[\d]+\:[\d]+$/)) {
                        task.nextRun = 0;
                        task.status = 'failed';
                        $.log('TocmTask', 'Invalid time format "' + trigarr[2] + '" on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                        break;
                    }

                    // Trying schedule time for today.
                    nextRun = new Date(new Date().format('%M-%D-%Y ' + trigarr[2]));
                    // If time now is higher than scheduled time, then reschedule time for next day.
                    if (nextRun.getTime() <= curTime) {
                        nextRun = new Date(new Date().format('%M-' + nextDay + '-%Y ' + trigarr[2]));
                    }

                    task.nextRun = nextRun.format('dn mn %D, %Y %h:%m:%s');
                    task.status = 'ready';
                } else if (trigarr[1] === 'between') {
                    // Handling invalid time format.
                    if (!trigarr[2].match(/^[\d]{2}\:[\d]{2}$/) || trigarr[3] !== 'and' || !trigarr[4].match(/^[\d]{2}\:[\d]{2}$/)) {
                        task.nextRun = 0;
                        task.status = 'failed';
                        $.log('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                        break;
                    }

                    lowTime = new Date(new Date().format('%M-%D-%Y ' + trigarr[2]));
                    higTime = new Date(new Date().format('%M-%D-%Y ' + trigarr[4]));

                    if (curTime > higTime.getTime()) {
                        // Schedule time to next day if current time is higher than max range time.
                        nextRun = new Date(new Date().format('%M-' + nextDay + '-%Y ' + trigarr[2]));
                    } else if (curTime < lowTime.getTime()) {
                        // Schedule time to today if current time is lower than min range time.
                        nextRun = new Date(new Date().format('%M-%D-%Y ' + trigarr[2]));
                    } else if (curTime >= lowTime.getTime() && curTime <= higTime.getTime()) {
                        // Convert it to realtime task if current time is in time range.
                        nextRun = 15;
                    }

                    if (typeOf(nextRun) === 'date') {
                        task.nextRun = nextRun.format('dn mn %D, %Y %h:%m:%s');
                    } else if (typeOf(nextRun) === 'number') {
                        task.nextRun = nextRun;
                    }

                    task.status = 'ready';
                } else {
                    $.log('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                }
                break;
            case 'weekly':
                // Creating the day of week.
                var weekDay;
                var week = new Date().toJulian().toDate('w');
                if (trigarr[1] === 'on') {
                    weekDay = trigarr[2];
                } else {
                    weekDay = 'Sun';
                }
                // Getting date on week by the day.
                var tgTime = new Date().dateOfWeek(week, weekDay);
                // Forward for next week if current date has left the target date.
                if (new Date(curTime).getDate() > tgTime.getDate()) {
                    tgTime = new Date().dateOfWeek((week + 1), weekDay);
                }

                if (trigarr[3] === 'at') {
                    // Handling invalid time format.
                    if (!trigarr[4].match(/[\d]+\:[\d]+$/)) {
                        task.nextRun = 0;
                        task.status = 'failed';
                        $.log('TocmTask', 'Invalid time format "' + trigarr[4] + '" on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                        break;
                    }

                    // Trying schedule time for today.
                    nextRun = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                    // If time now is higher than scheduled time, then reschedule time for next day.
                    if (nextRun.getTime() <= curTime) {
                        tgTime = new Date().dateOfWeek((week + 1), weekDay);
                        nextRun = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                    }

                    task.nextRun = nextRun.format('dn mn %D, %Y %h:%m:%s');
                    task.status = 'ready';
                } else if (trigarr[3] === 'between') {
                    // Handling invalid time format.
                    if (!trigarr[4].match(/^[\d]{2}\:[\d]{2}$/) || trigarr[5] !== 'and' || !trigarr[6].match(/^[\d]{2}\:[\d]{2}$/)) {
                        task.nextRun = 0;
                        task.status = 'failed';
                        $.log('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                        break;
                    }

                    lowTime = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                    higTime = new Date(tgTime.format('%M-%D-%Y ' + trigarr[6]));

                    if (curTime > higTime.getTime()) {
                        // Schedule time to next day if current time is higher than max range time.
                        tgTime = new Date().dateOfWeek((week + 1), weekDay);
                        nextRun = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                    } else if (curTime < lowTime.getTime()) {
                        // Schedule time to today if current time is lower than min range time.
                        nextRun = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                    } else if (curTime >= lowTime.getTime() && curTime <= higTime.getTime()) {
                        // Convert it to realtime task if current time is in time range.
                        nextRun = 15;
                    }

                    if (typeOf(nextRun) === 'date') {
                        task.nextRun = nextRun.format('dn mn %D, %Y %h:%m:%s');
                    } else if (typeOf(nextRun) === 'number') {
                        task.nextRun = nextRun;
                    }

                    task.status = 'ready';
                } else {
                    $.log('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                }
                break;
            default:
                $.log('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                break;
            }
        }

        return task;
    };

    // CREATING TASK MODULES.
    TocmTask.prototype = {
        // CREATING TASK INIT.
        init: function () {
            var task;
            this.status = 'init';

            if (this.runtime === 'realtime') {
                task = realtimeHandler(this);
            } else if (this.runtime === 'immediate') {
                task = immediateHandler(this);
            } else if (this.runtime === 'delayed') {
                task = delayedHandler(this);
            } else if (this.runtime === 'scheduled') {
                task = scheduledHandler(this);
            } else {
                this.status = 'failed';
            }
            return this;
        },
        call: function () {
            if (this.status === 'ready') {
                unlistenTask(this.tsid);
                actionHandler(this);
            }
            return this;
        },
        // CREATING TASK STARTER.
        run: function (exec) {
            this.init();

            if (exec === true) {
                this.call();
            } else {
                listenTask(this.tsid);
            }

            return this;
        },
        // CREATING TASK STOPPER.
        stop: function () {
            $.log('TocmTask', 'Stopping task "' + this.name + '".');
            this.status = 'stopped';
            if (TocmRegistry.TaskLibrary.Listener[this.tsid]) {
                clearTimeout(TocmRegistry.TaskLibrary.Listener[this.tsid]);
            }
            $.log('TocmTask', 'Task "' + this.name + '" has been stopped.');
            return this;
        },
        // CREATING DELAY SETTER.
        repeat: function (trigger) {
            if (typeOf(trigger) === 'string') {
                $.log('TocmTask', 'Set task "' + this.name + '" as delayed task.');
                unlistenTask(this.tsid);
                this.runtime = 'delayed';
                this.trigger = trigger;
                this.init();
            }
            return this;
        },
        // CREATING REALTIME SETTER.
        realtime: function () {
            $.log('TocmTask', 'Set task "' + this.name + '" as realtime task.');
            unlistenTask(this.tsid);
            this.runtime = 'realtime';
            this.trigger = '';
            this.init();
            return this;
        },
        schedule: function (trigger) {
            if (typeOf(trigger) === 'string') {
                $.log('TocmTask', 'Set task "' + this.name + '" as scheduled task.');
                unlistenTask(this.tsid);
                this.runtime = 'scheduled';
                this.trigger = trigger;
                this.init();
            }
            return this;
        },
        immediate: function (time) {
            this.runtime = 'immediate';
            if (typeOf(time) === 'number') {
                $.log('TocmTask', 'Set task "' + this.name + '" as immediate task.');
                this.init();
                listenTask(this.tsid, time);
            } else {
                $.log('TocmTask', 'Set task "' + this.name + '" as immediate task and run it immediately since no time defined.');
                this.init();
                this.call();
            }
            return this;
        },
        addAction: function (func) {
            if (typeOf(func) === 'function') {
                $.log('TocmTask', 'Adding action "' + func.name + '" to task "' + this.name + '".');
                if (this.actions.indexOf(func) < 0) {
                    this.actions.push(func);
                } else {
                    this.actions[this.actions.indexOf(func)] = func;
                }
                $.log('TocmTask', 'Action "' + func.name + '" has been added to task "' + this.name + '".', 'green');
            }
            return this;
        }
    };
    // ATTACHING TOCMTASK TO WINDOW.
    window.$task = window.TocmTask = function (name, runtime) {
        return new TocmTask(name, runtime);
    };
    // LOCKING TOCMTASK.
    lock('$task');
    lock('TocmTask');
    // CREATING MODULE WRAPPER.
    window.TocmTask.module = window.TocmTask.event = TocmTask.prototype;
})(window);
/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// EXTENDING JQUERY IDENTIFIER ($).
(function($) {
    'use strict';
    $.anime = TocmAnimation;
    $['class'] = Tocm;
    $.media = TocmMedia;
    $.path = TocmQuery;
    $.font = TocmFont;
    $.keyframe = TocmKeyframe;
    $.task = TocmTask;
    $.log = TocmLogger;
    
    // CONFIGUGRATION EDIT.
    $.config = TocmConfig;
    
    // LOCKING ALL TOCM INSTANCE.
    var obj = Object.keys(window);
    for (var i = 0; i < obj.length; ++i) {
        if (obj[i].search('Tocm') !== -1) {
            //lock(obj[i]);
        }
    }
})(jQuery);

// CREATING JQUERY PLUGIN.
(function ($) {
    $.fn.addAnimation = function (name) {
        if (typeOf(name) === 'string') {
            var runNode = this;
            runNode.addClass(name.replace(/\./g, ''));
            
            var anim = $.anime(name), x, i;
            var pfs = ['animationstart', 'webkitAnimationStart', 'MSAnimationStart'];
            var pfe = ['animationend', 'webkitAnimationEnd', 'MSAnimationEnd'];
            
            if (typeOf(anim.onRun) === 'function' && anim.endNode !== '') {
                for (x = 0; x < runNode.length; ++x) {
                    runNode[x].addEventListener(pfs[0], function (e) {
                        anim.onRun(e);
                        this.removeEventListener(pfs[0], arguments.callee, false);
                    }, false);
                    runNode[x].addEventListener(pfs[1], function (e) {
                        anim.onRun(e);
                        this.removeEventListener(pfs[1], arguments.callee, false);
                    }, false);
                    runNode[x].addEventListener(pfs[2], function (e) {
                        anim.onRun(e);
                        this.removeEventListener(pfs[2], arguments.callee, false);
                    }, false);
                }
            }
            if (typeOf(anim.onEnd) === 'function' && anim.endNode !== '') {
                for (x = 0; x < runNode.length; ++x) {
                    runNode[x].addEventListener(pfe[0], function (e) {
                        anim.onEnd(e);
                        this.removeEventListener(pfe[0], arguments.callee, false);
                    }, false);
                    runNode[x].addEventListener(pfe[1], function (e) {
                        anim.onEnd(e);
                        this.removeEventListener(pfe[1], arguments.callee, false);
                    }, false);
                    runNode[x].addEventListener(pfe[2], function (e) {
                        anim.onEnd(e);
                        this.removeEventListener(pfe[2], arguments.callee, false);
                    }, false);
                }
            }
            // Automaticaly remove animation when animation endded.
            if (anim.endNode !== '') {
                var remAnim = function () {
                    runNode.removeClass(name.replace(/\./g, ''));
                };
                for (x = 0; x < runNode.length; ++x) {
                    runNode[x].addEventListener(pfe[0], function (e) {
                        remAnim(e);
                        this.removeEventListener(pfe[0], arguments.callee, false);
                    }, false);
                    runNode[x].addEventListener(pfe[1], function (e) {
                        remAnim(e);
                        this.removeEventListener(pfe[1], arguments.callee, false);
                    }, false);
                    runNode[x].addEventListener(pfe[2], function (e) {
                        remAnim(e);
                        this.removeEventListener(pfe[2], arguments.callee, false);
                    }, false);
                }
            }
        }
        return this;
    };
    $.fn.remAnimation = function (name) {
        if (typeOf(name) === 'string') {
            this.removeClass(name.replace(/\./g, ''));
        }
        return this;
    };
})(jQuery);
/*jshint undef:false*/

// CREATING MOST USED SINGLE PROPERTIES CONSTANTS.
(function (e) {
    var prop = {
        block               : 'block',
        scroll              : 'scroll',
        none                : 'none',
        inline              : 'inline',
        inline_block        : 'inline-block',
        bold                : 'bold',
        italic              : 'italic',
        pre                 : 'pre',
        pre_wrap            : 'pre-wrap',
        break_word          : 'break-word',
        relative            : 'relative',
        absolute            : 'absolute',
        fixed               : 'fixed',
        inherit             : 'inherit',
        top                 : 'top',
        left                : 'left',
        right               : 'right',
        bottom              : 'bottom',
        center              : 'center',
        middle              : 'middle',
        baseline            : 'baseline',
        justify             : 'justify',
        hidden              : 'hidden',
        pointer             : 'pointer',
        normal              : 'normal',
        border_box          : 'border-box',
        content_box         : 'content-box',
        padding_box         : 'padding-box',
        auto                : 'auto',
        vertical            : 'vertical',
        transparent         : 'transparent',
        table               : 'table',
        table_row           : 'table-row',
        both                : 'both'
    };
    
    for (var key in prop) {
        if (prop.hasOwnProperty(key)) {
            define(key.toUpperCase(), prop[key]);
        }
    }
})(window);