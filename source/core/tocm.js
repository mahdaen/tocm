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
            if (typeOf(media) === 'string') {
                if (!TocmMedClass.hasOwnProperty(media) || !TocmMedClass[media].hasOwnProperty(name)) {
                    return;
                }
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
                if (name.search(/\@/) !== -1) {
                    name = name.replace(/\s?(\@)\s?/, '@');
                    name = name.split('@');
                    obj = new TocmSelector(name[0], name[1]);
                } else {
                    obj = TocmDefClass[name];
                }
            }
            // Returning selected object.
            return obj;
        } else {
            return;
        }
    };
    // CREATING FUNCTION TO CREATE NEW CLASS.
    var TocmClass = function (objname, props, media, delayed) {
        var old;
        if (typeOf(objname) === 'string' && typeOf(props) === 'object') {
            // SEARCHING EXISTING CLASS.
            if (typeOf(media) === 'string' && media !== 'none') {
                old = new TocmSelector(objname, media);
            } else {
                old = new TocmSelector(objname);
            }
            
            // COMBINING NEW CLASS WITH OLD CLASS.
            if (old.hasOwnProperty('name')) {
                old.properties = combine([old.properties, props]);
                this.pseudo = old.pseudo;
                this.properties = old.properties;
            } else {
                this.properties = props;
                this.pseudo = {};
            }
            // COLLECTING CSS PROPERTIES.
            $.log('TocmClass', 'Creating new class "' + objname + '".');

            this.name = this.family = objname;
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
            hide('config', this);
            hide('parent', this);
            
            // RETURNING THE CLASS.
            return this;
        } else {
            return;
        }
    };
    // CREATING FUNCTION TO CREATE BATCH OBJECT CLASSES.
    var TocmBatchClass = function (name, object, cmedia, area, family, parent) {
        var lastAuto = TocmConfig.autowrite;
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
                            // ASIGNING FAMILY NAME.
                            if (typeOf(family) !== 'string') {
                                family = name;
                            }
                            if (name !== '' && name !== ' ') {
                                newname = name; // ADDING THIS NAME AS PARENT NAME FOR NEW CLASS.
                            } else {
                                newname = '';
                            }
                            // PARSING MULTIPLE NAME USE.
                            if (proname.search('&') > -1 || proname.search(',') > -1) {
                                // If  name is multiple.
                                tempname = proname.replace(/\s?(\,)\s?/g, '&'); // REPLACING SPACE.
                                tempname = tempname.replace(/\s+(\&)\s+/g, '&'); // REPLACING SPACE.
                                tempname = tempname.split('&'); // SPLITING NAME.
                                // ENUMERATING PSEUDO IDENFIER (:).
                                for (var x = 0; x < tempname.length; ++x) {
                                    if (tempname[x].match(/^([\:]+)([a-zA-Z\d\-\_\(\)\[\]]+)$/)) {
                                        tempname[x] = name + tempname[x];
                                    } else {
                                        if (name !== '' && name !== ' ') {
                                            tempname[x] = name + ' ' + tempname[x];
                                        } else {
                                            tempname[x] = tempname[x];
                                        }
                                    }
                                }

                                TocmConfig.autowrite = false;
                                for (var i = 0; i < tempname.length; ++i) {
                                    tempname[i] = tempname[i].replace(/^(\s)/, '');
                                    subclass = new TocmBatchClass(tempname[i], object[proname], media, area, family, newclass);
                                }
                                $.log('TocmClass', 'Adding child-class "' + newname + '" to parent calss "' + name + '".', 'green');
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
                                // REMOVING SPACE IN BEGINING OF NAME.
                                newname = newname.replace(/^(\s)/, '');
                                // CREATING NEW CLASS INHERITING TO THIS CLASS.
                                $.log('TocmClass', 'Adding child-class "' + newname + '" to parent calss "' + name + '".', 'green');
    
                                TocmConfig.autowrite = false;
                                subclass = new TocmBatchClass(newname, object[proname], media, area, family, newclass);
                            }
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
            if (newclass.name === newclass.family && lastAuto === true) {
                TocmConfig.autowrite = true;
            }
            newclass.apply();
            // RETURNING CLASS.
            return newclass;
        }
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
                    TocmBuilder.writeSCS();
                }
            }
            return this;
        },
        write: function (turnauto) {
            TocmConfig.autowrite = true;
            TocmBuilder.writeSCS();
            return this;
        }
    };
    // HIDING CORE MODULE.
    lock('apply', Tocm.module);
    lock('write', Tocm.module);

    // CREATING MODULE SETTER.
    Tocm.defineModule = function (name, func) {
        if (typeOf(name) === 'string' && typeOf(func) === 'function') {
            Tocm.module[name] = func;
            lock(name, Tocm.module);
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
    Tocm.rebuild = function (turnauto) {
        if (turnauto === true) {
            TocmConfig.autowrite = true;
        }
        TocmBuilder.writeSCS();
    };
    lock('debugLayout', Tocm);
    lock('defineModule', Tocm);
    lock('rebuild', Tocm);

    // Adding listener to build the class when document ready to styling.
    if (TocmConfig.writeload === true) {
        $(document).ready(function () {
            Tocm.rebuild(true);
        });
    }
    // CREATING STYLE COLLECTOR.
    Tocm.collect = function () {
        var csstring = '';
        $('style[data]').each(function () {
            csstring += $(this).html();
        });
        return csstring;
    };
    lock('collect', Tocm);
})(window);

// CREATING TOCM MODULES.
(function (e) {
    'use strict';
    // MODULE TO ASSIGN PROPERTIES.
    e.module.set = function (objkey, value) {
        // DO ACTIONS ONLY IF THIS OBJECT IS TOCM CLASS.
        TocmConfig.autowrite = false;
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
        TocmConfig.autowrite = false;
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
        TocmConfig.autowrite = false;
        if (typeOf(name) === 'string') {
            if (typeOf(media) === 'string' && media !== '' && media !== 'none') {
                parent = e(name, media);
            } else {
                parent = e(name);
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
        TocmConfig.autowrite = false;
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
            newclass.config.write_area = this.config.write_area;
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
        var fclass = e(this.name + ' ' + name, this.media);
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
    var mod = ['set', 'on', 'copy', 'add', 'goTo', 'back'];
    for (var i = 0; i < mod.length; ++i) {
        lock(mod[i], e.module);
    }
})(Tocm);
