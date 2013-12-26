/*jshint -W065 */
/*jshint undef:false */

// A COLLECTIONS OF NATIVE OBJECT PROTOTYPE EXTENDER.
// --------------------------------------------------------------------------
// NEW NATIVE FUNCTIONS.
(function (window) {
    'use strict';
    // CREATING FUNCTION TO DEFINE CONSTANT/NON-WRITABLE OBJECT.
    if (Object.defineProperty) {
        Object.defineProperty(window, 'define', {
            writable: false,
            value: function (name, value) {
                if (name !== 'undefined' && value !== 'undefined') {
                    Object.defineProperty(window, name, {
                        writable: false,
                        enumerable: false,
                        value: value
                    });
                }
            }
        });
    } else {
        window.define = function (name, value) {
            window[name] = value;
        };
    }
    // CREATING FUNCTION TO LOCK OBJECT ON WINDOW.
    define('glock', function (name) {
        if (typeof name === 'string' && Object.defineProperty) {
            var object = window[name];
            if (object) {
                delete window[name];
                Object.defineProperty(window, name, {
                    writable: false,
                    enumerable: false,
                    value: object
                });
                return window[name];
            }
        }
    });
    // CREATING FUNCTION TO HIDE OBJECT ON WINDOW.
    define('ghide', function (name) {
        if (typeof name === 'string' && Object.defineProperty) {
            var object = window[name];
            if (object) {
                delete window[name];
                Object.defineProperty(window, name, {
                    enumerable: false,
                    value: object
                });
                return window[name];
            }
        }
    });
    // CREATING FUNCTION TO LOCK OBJECT ON OBJECT.
    window.lock = function (name, from) {
        if (typeOf(name) === 'string' && Object.defineProperty) {
            if (typeOf(from) === 'object') {
                var obj = from[name];
                if (obj) {
                    //delete from[name];
                    Object.defineProperty(from, name, {
                        writable: false,
                        enumerable: false,
                        value: obj
                    });
                    return from[name];
                }
            } else {
                return glock(name);
            }
        }
    };
    // CREATINF FUNCTION TO HIDE OBJECT ON OBJECT.
    window.hide = function (name, from) {
        if (typeOf(name) === 'string' && Object.defineProperty) {
            if (typeOf(from) === 'object') {
                var obj = from[name];
                if (obj) {
                    //delete from[name];
                    Object.defineProperty(from, name, {
                        enumerable: false,
                        value: obj
                    });
                    return from[name];
                }
            } else {
                return ghide(name);
            }
        }
    };
    glock('hide');
    glock('lock');
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

    if (!Object.keys) {
        Object.prototype.keys = function (obj) {
            if (typeOf(obj) === 'object') {
                var arr = [];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        arr.push(key);
                    }
                }
                return arr;
            }
        };
    }
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
        lock('shuffle', Array.prototype);
    }

    // Cycle array. Move first item to end, then return the moved item.
    if (!Array.prototype.cycle) {
        Array.prototype.cycle = function () {
            var first = this.shift();
            this.push(first);
            return first;
        };
        lock('cycle', Array.prototype);
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
        lock('del', Array.prototype);
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
