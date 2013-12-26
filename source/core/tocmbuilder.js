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
            vend = TocmRef.vendor,
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
                    if (typeOf(object[index]) === 'number' && object[index] !== 0 && TocmRef.noint.indexOf(property) < 0) {
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
                        if (css3.indexOf(property) > -1) {
                            // Adding vendor prefix for CSS3 property.
                            for (var x = 0; x < vend.length; ++x) {
                                cssString += tab + vend[x] + property + ': ' + object[index] + ';\n';
                            }
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
        var node, head, chld, last, lnod;
        if (typeOf(name) === 'string' && typeOf(media) === 'string' && typeOf(value) === 'string') {
            last = $('style').last();
            node = $('style[id="' + name + '"][data="' + media + '"]')[0];
            if (node) {
                node.innerHTML = value;
            } else {
                node = document.createElement('style');
                $(node).attr({
                    id: name, data: media, type: 'text/css'
                }).html(value);

                if (last.length > 0) {
                    if (TocmConfig.sortprior === true) {
                        var isimp = last.attr('data').toLowerCase();
                        if (isimp === 'important') {
                            var uni = last.prev().attr('data').toLowerCase();
                            if (uni === 'universal') {
                                $(node).insertBefore($('style[data="universal"]').first());
                            } else {
                                $(node).insertBefore(last);
                            }
                        } else if (isimp === 'universal') {
                            $(node).insertBefore($('style[data="universal"]').first());
                        } else {
                            $(node).insertAfter(last);
                        }
                    } else {
                        $(node).insertAfter(last);
                    }
                } else {
                    $('head').append(node);
                }
            }
            // Keep the font class on top of style.
            var farr = [];
            $('style[data="font"]').each(function () {
                farr.push($(this).attr('id'));
            });
            farr.sort();
            for (var f = farr.length - 1; f >= 0; --f) {
                $('style#' + farr[f]).insertBefore($('style').first());
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
                    return cssString + '\n';
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
    window.TocmBuilder = TocmBuilder;
    lock('TocmBuilder');
})(window);
