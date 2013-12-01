/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// EXTENDING MODULE.
(function ($) {
    'use strict';
    $.extend({
        // FUNCTION TO ADD CLASS.
        addClass: function (stclass) {
            for (var i = 0; i < this.length; ++i) {
                this[i].setAttribute('class', this[i].getAttribute('class') + ' ' + stclass);
            }
            return this;
        },
        // FUNCTION TO REMOVE CLASS.
        remClass: function (stclass) {
            for (var i = 0; i < this.length; ++i) {
                var curn = this[i].getAttribute('class');
                curn = curn.replace(' ' + stclass, '');
                this[i].setAttribute('class', curn);
            }
            return this;
        },
        addAnimation: function (name, prop) {
            
        },
        // FUNCTION TO SET/GET ATTRIBUTE.
        attr: function (name, value) {
            if (typeOf(name) === 'string') {
                if (typeOf(value) === 'string') {
                    for (var i = 0; i < this.length; ++i) {
                        this[i].setAttribute(name, value);
                    }
                } else {
                    return this[0].getAttribute(name);
                }
            }
            return this;
        },
        remove: function (index) {
            if (this.length > 0) {
                var parent = this[0].parentNode;
                
                if (typeOf(index) === 'number') {
                    this[index].parentNode.removeChild(this[index]);
                    this.lists = this.lists.delete(index);
                } else {
                    for (var i = 0; i < this.length; ++i) {
                        this[i].parentNode.removeChild(this[i]);
                    }
                    this.lists = [parent];
                }
                
                for (var x = 0; x < this.length; ++x) {
                    delete this[x];
                }
                
                this.apply();
                return this;
            }
            return this;
        }
    });
})(TocmQuery);

