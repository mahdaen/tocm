/**
TOCM - TOCL CSS MAGIC
v.1.0.1
© 2013 Siriussoft Corporation.
Developed bay Nanang - mahdaen@hotmail.com

Tocl CSS Magic is a CSS class generator. With Tocl CSS Magic you can create and manage CSS class easily.
Tocl CSS Magic allow you to create new class, add property, remove property or change property value without
writing or editing the css file. All css script is created on the fly. You doesn't need to have css file anymore.
-----------------------------------------------------------------------------------------------------------------
**/

/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING TOCM REGISTRY.
(function(window) {
    'use strict';
    // CREATING COLLECTIONS OF GLOBAL CLASS.
    window.TocmDefClass = {};
    // CREATING COLLECTIONS OF MEDIA SPESIFIC CLASS.
    window.TocmMedClass = {};
    // CREATING MEDIA COLLECTIONS.
    window.TocmMedia = {};
    // CREATING KEYFRAMES COLLECTIONS.
    window.TocmKeyframes = {};
    // CREATING FONTS COLLECTIONS.
    window.TocmFonts = {};
    // CREATING AUTOWRITE OPTION.
    window.TocmAutoWrite = false;
})(window);


// CREATING TOCM CORE FUNCTIONS.
(function(window) {
    'use strict';
    // CREATING CLASS SELECTOR.
    var TocmClass = function (selector, media) {
        var obj, key;
        if (typeOf(selector) === 'string') {
            // Trying to get from default class.
            obj = TocmDefClass[selector];

            if (typeOf(media) === 'string' && media !== 'none') {
                if (!$media(media).hasOwnProperty('name')) {
                    return;
                }
                // Trying to get from media class if using media filter.
                if (typeOf(TocmMedClass[media]) === 'object') {
                    obj = TocmMedClass[media][selector];
                    if (typeOf(obj) !== 'object') {
                        return;
                    }
                } else {
                    return;
                }
            }
            
            if (typeOf(obj) === 'object') {
                this.name = selector;
                this.family = obj.family;
                this.config = obj.config;
                this.media = obj.media;
                this.properties = obj.properties;
                this.pseudo = obj.pseudo;
                this.parent = obj.parent;
            }
        }
        return this;
    };
    // TocmClass Wrapper.
    var tocm = function (selector, media) {
        return new TocmClass(selector, media);
    };
    // CREATING MODULE WRAPPER.
    tocm.module = TocmClass.prototype = {
        // CREATING FUNCTION TO APPLY CHANGES.
        apply: function () {
            var key, obj = {};
            if (this.hasOwnProperty('name')) {
                for (key in this) {
                    if (this.hasOwnProperty(key)) {
                        obj[key] = this[key];
                    }
                }
                if (this.media !== 'none') {
                    TocmMedClass[this.media][this.name] = obj;
                } else {
                    TocmDefClass[this.name] = obj;
                }
                if (TocmAutoWrite === true) {
                    TocmBuilder.writeSCS(obj);
                }
            }
            return this;
        },
        write: function () {
            TocmBuilder.writeSCS();
            return this;
        }
    };
    // ATTACHING TOCM MAKER TO WINDOW OBJECT.
    window.TocmClass = tocm;
    
    // CREATING FUNCTION TO CREATE NEW CLASS.
    var TocmCreate = function (selector, props, media, auto) {
        var cls = {}, regs = TocmDefClass, obj;
        if (typeOf(selector) === 'string' && typeOf(props) === 'object') {
            // COLLECTING CSS PROPERTIES.
            cls.name = cls.family = selector;
            cls.properties = props;
            cls.pseudo = {};
            cls.config = {
                write_area: 'universal', // family <> universal <> independent.
                write_auto: true
            };
            cls.parent = {};
            
            // ADDING TO MEDIA SPESIFIC COLLECTION IF 'media' WAS DEFINED.
            if (typeOf(media) === 'string' && media !== 'none') {
                if ($media(media).hasOwnProperty('name') === false) {
                    return;
                }
                cls.media = media;
                if (typeOf(TocmMedClass[media]) === 'object') {
                    TocmMedClass[media][selector] = cls;
                } else {
                    TocmMedClass[media] = {};
                    TocmMedClass[media][selector] = cls;
                }
            } else {
                cls.media = 'none';
                TocmDefClass[selector] = cls;
            }
            // Writing CSS to Handler.
            //TocmBuilder.writeSCS(cls);
            var newclass;
            if (typeOf(media) === 'string' && media !== 'none') {
                newclass = new TocmClass(selector, media);
            } else {
                newclass = new TocmClass(selector);
            }
            return newclass;
        }
    };
    // CREATING FUNCTION TO CREATE BATCH OBJECT CLASSES.
    var TocmBatchCreate = function (name, object, cmedia, area, family, parent) {
        var key, xkey, newclass, media, newname, subclass, vobj = {}, vpsdo = {};
        if (typeOf(name) === 'string' && typeOf(object) === 'object') {
            // Parsing name and media.
            if (name.search('@') > -1) {
                name = name.replace(/\s+(\@)\s+/g, '@');
                name = name.split('@');
                media = name[1];
                name = name[0];
            } else {
                if (typeOf(cmedia) === 'string' && cmedia !== 'none') {
                    media = cmedia;
                } else {
                    media = 'none';
                }
            }
            
            // Parsing name string wether have a golbal identifier or not. E.g. $class('!.header');
            if (name.search('!') > -1) {
                name = name.replace('!', '');
                area = 'global';
            }
            
            // Enumerating Property and new object.
            if (typeOf(area) !== 'string' && area !== 'global') {
                newclass = new TocmCreate(name, {}, media, false);
                if (newclass.hasOwnProperty('name')) {
                    newclass.config.write_area = 'family';
                } else {
                    return;
                }
            } else {
                newclass = new TocmCreate(name, {}, media, true);
                if (!newclass.hasOwnProperty('name')) {
                    return;
                }
            }
            
            for (key in object) {
                if (object.hasOwnProperty(key)) {
                    if (typeOf(object[key]) === 'object') {
                        if (TocmRef.pseudo.indexOf(key) < 0) {
                            // If not pseudo, then create new object with adding parent name.
                            newname = name + ' ';
                            if (key.search('&') > -1) {
                                // If  name is multiple.
                                xkey = key.replace(/\s+(\&)\s+/g, '&');
                                xkey = xkey.split('&');
                                for (var i = 0; i < xkey.length - 1; ++i) {
                                    newname += xkey[i] + ', ' + name + ' ';
                                }
                                newname += xkey[xkey.length - 1];
                            } else {
                                newname += key;
                            }
                            if (typeOf(family) !== 'string') {
                                family = name;
                            }
                            subclass = new TocmBatchCreate(newname, object[key], media, area, family, newclass);
                        } else {
                            if (typeOf(vpsdo[key]) !== 'object') {
                                vpsdo[key] = object[key];
                            } else {
                                for (var vip in object[key]) {
                                    if (object[key].hasOwnProperty(vip)) {
                                        vpsdo[key][vip] = [object][key][vip];
                                    }
                                }
                            }
                        }
                    } else {
                        vobj[key] = object[key];
                    }
                }
            }
            if (typeOf(newclass) === 'object' && newclass.hasOwnProperty('name')) {
                if (typeOf(family) === 'string') {
                    newclass.family = family;
                } else {
                    newclass.family = name;
                }
                if (typeOf(parent) === 'object' && parent.hasOwnProperty('name')) {
                    newclass.parent = parent;
                }
                for (var po in vobj) {
                    if (vobj.hasOwnProperty(po)) {
                        newclass.properties[po] = vobj[po];
                    }
                }
                for (var ps in vpsdo) {
                    if (vpsdo.hasOwnProperty(ps)) {
                        newclass.pseudo[ps] = vpsdo[ps];
                    }
                }
                newclass.apply();
            }
            return newclass;
        }
    };

    // CREATING WRPAPPER //
    window.$glob = function (selector, props, media) {
        return new TocmBatchCreate(selector, props, media, 'global');
    };
    // CREATE A TOCM SELECTOR AND CREATOR WRAPPER.
    window.$class = window.Tocm = function (select, omedia, media) {
        // Ensure the selector/class pattern is string.
        if (typeOf(select) === 'string') {
            // If 'omedia' is string, then use it as media to select class.
            if (typeOf(omedia) === 'string') {
                return new TocmClass(select, omedia);
            }
            // Else if 'omedia' is object, then use it as object to create class.
            else if (typeOf(omedia) === 'object') {
                // If the 'media' is string, then use it as media to create class.
                if (typeOf(media) === 'string' && media !== 'none') {
                    return new TocmBatchCreate(select, omedia, media);
                }
                // Else, just create class as universal class.
                else {
                    return new TocmBatchCreate(select, omedia);
                }
            }
            // Else, just select class with no media.
            else {
                return new TocmClass(select);
            }
        }
    };
})(window);
