/*jshint -W065 */
/*jshint undef:false */

// A COLLECTIONS OF NATIVE OBJECT PROTOTYPE EXTENDER.
// --------------------------------------------------------------------------
// NEW NATIVE FUNCTIONS.
(function (window) {
    'use strict';
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
    
    // Define Constant.
    window.define = function (name, value) {
        window[name] = value;
        Object.defineProperty(window, name, {
            enumerable: false,
            configurable: false,
            writable: false
        });
        return window[name];
    };

})(window);

// Extend Array.
(function (Array) {
    'use strict';
    // Shuffle array.
    if (!Array.prototype.shuffle) {
        Array.prototype.shuffle = function () {
            for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        };
        Object.defineProperty(Array.prototype, 'shuffle', {
            enumerable: false
        });
    }
    
    // Cycle array. Move first item to end, then return the moved item.
    if (!Array.prototype.cycle) {
        Array.prototype.cycle = function(){
            var first = this.shift();
            this.push(first);
            return first;
        };
        Object.defineProperty(Array.prototype, 'cycle', {
            enumerable: false
        });
    }
    
    // Delete array.
    if (!Array.prototype.delete) {
        Array.prototype.delete = function (index) {
            if (typeOf(index) === 'number') {
                var narr = [];
                for (var i = 0; i < this.length; ++i) {
                    if (i !== index) {
                        narr.push(this[i]);
                    }
                }
                return narr;
            }
            return this;
        };
    }
})(Array);

// Extend Object.
(function (Object) {
    'use strict';
    // Sorting object.
    if (!Object.prototype.sort) {
        Object.prototype.sort = function (direction) {
            var array = Object.keys(this), newobject = {};
            if (direction !== 'desc') {
                // SORT ASCENDING -->
                array = array.sort(function (a, b) {
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
                array = array.sort(function (a, b) {
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
            for (var i = 0; i < array.length; ++i) {
                newobject[array[i]] = this[array[i]];
            }
            return newobject;
        };
        Object.defineProperty(Object.prototype, 'sort', {
            enumerable: false
        });
    }
})(Object);

// Extend String.
(function (String) {
    'use strict';
    // PREG REPLACE FUNCTION.
    if (!String.prototype.preg_replace) {
        String.prototype.preg_replace = function (pattern, replace, recursive) {
            var match = this.match(pattern), newstring, replaced, candidate;
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
                return {filename: filename, path: filepath};
            }
        };
    }
})(String);
