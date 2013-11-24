// CREATING CSS STRING BUILDER.
(function (window) {
    'use strict';
    var ClassBuilder = {};
    // FUNCTION TO CREATE CSS STRING.
    ClassBuilder.createCSS = function (obj, tab) {
        var ccss = TocmRef.ccss,
            xcss = TocmRef.xcss,
            css3 = TocmRef.css3,
            cstr = '',
            prop;

        if (typeOf(obj) === 'object') {
            obj = sortObject(obj);
            // CREATE CUSTOM TAB.
            if (typeOf(tab) !== 'string') {
                tab = '';
            }
            // Processing CSS Object.
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && obj[key] !== '') {
                    prop = key.replace(/_/g, '-').replace(/\$/g, '*');
                    if (typeOf(obj[key]) === 'number' && TocmRef.noint.indexOf(prop) < 0) {
                        obj[key] += 'px';
                    }
                    if (obj[key] !== null) {
                        if (ccss.indexOf(key) > -1) {
                            // Custom CSS Properties.
                            cstr += TocmRef.createCCSS(key, obj[key], tab);
                        } else if (xcss.indexOf(key) > -1) {
                            // Extended CSS Properties.
                            cstr += TocmRef.createXCSS(key, obj[key], tab);
                        } else if (css3.indexOf(key) > -1) {
                            // CSS3 Properties.
                            cstr += tab + prop + ': ' + obj[key] + '; ';
                            cstr += '-webkit-' + prop + ': ' + obj[key] + '; ';
                            cstr += '-moz-' + prop + ': ' + obj[key] + '; ';
                            cstr += '-o-' + prop + ': ' + obj[key] + '; ';
                            cstr += '-ms-' + prop + ': ' + obj[key] + ';\n';
                        } else {
                            cstr += tab + prop + ': ' + obj[key] + ';\n';
                        }
                    }
                }
            }
            return cstr;
        } else {
            return '';
        }
    };
    // FUNCTION TO WRITE CSS STRING TO HANDLER.
    ClassBuilder.writeDOM = function (name, media, value) {
        var node, head, chld, last;
        var find = function (path) {
            var xpeval = document.evaluate(path, document, null, XPathResult.ANY_TYPE, null);
            while (node = xpeval.iterateNext()) {
                return node;
            }
            return null;
        };
        if (typeOf(name) === 'string' && typeOf(media) === 'string' && typeOf(value) === 'string') {
            head = document.getElementsByTagName('head')[0];
            chld = head.children;
            last = lastNode(chld, 'style');
            node = find('//style[@id="' + name + '"][@data="' + media + '"]');
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
    ClassBuilder.writeSCS = function () {
        var defc = TocmDefClass, medc = TocmMedClass, key, fml, cls, dstr = '', mstr = '';
        var area, family, auto, pdstr = {}, pmdstr = {}, minfo, fmcstr, gcstr;
        // ENUMERATING DEFAULT CLASSES.
        for (key in defc) {
            if (defc.hasOwnProperty(key)) {
                area = defc[key].config.write_area; family = defc[key].family;
                if (area === 'family') {
                    if (typeOf(pdstr[family]) !== 'string') {
                        pdstr[family] = '';
                    }
                    pdstr[family] += TocmBuilder.writeCSS(defc[key], true);
                } else {
                    dstr += TocmBuilder.writeCSS(defc[key], true);
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
        for (key in medc) {
            if (medc.hasOwnProperty(key)) {
                for (cls in medc[key]) {
                    if (medc[key].hasOwnProperty(cls)) {
                        area = medc[key][cls].config.write_area; family = medc[key][cls].family;
                        if (area === 'family') {
                            if (typeOf(pmdstr[family]) !== 'string') {
                                pmdstr[family] = '';
                            }
                            pmdstr[family] += TocmBuilder.writeCSS(medc[key][cls], true);
                        } else {
                            mstr += TocmBuilder.writeCSS(medc[key][cls], true);
                        }
                    }
                }
                // WRITING GLOBAL CLASSES.
                if (mstr !== '') {
                    // GETTING MEDIA INFO.
                    minfo = $media(key); gcstr = '';
                    // OPENING MEDIA QUERIES.
                    gcstr += '\n\t@media ' + minfo.value + ' {\n';
                    // ADDING CSS STRING.
                    gcstr += mstr;
                    // CLOSING MEDIA QUERIES.
                    gcstr += '\t}\n';
                    TocmBuilder.writeDOM('Global Class', key, gcstr);
                    mstr = '';
                }
                // WRITING PRIVATE CLASSES.
                for (fml in pmdstr) {
                    if (pmdstr.hasOwnProperty(fml)) {
                        minfo = $media(key); fmcstr = '';
                        // OPENING MEDIA QUERIES.
                        fmcstr += '\n\t@media ' + minfo.value + ' {\n';
                        // ADDING CSS STRING.
                        fmcstr += pmdstr[fml];
                        // CLOSING MEDIA QUERIES.
                        fmcstr += '\t}\n';
                        TocmBuilder.writeDOM(fml, key, fmcstr);
                    }
                }
                pmdstr = {};
            }
        }
    };
    ClassBuilder.writeCSS = function (tclass, isget) {
        var stid, minfo, cstr = '', key, style, head, hcld, spos, psdo, cslist;
        var area = tclass.config.write_area, auto = tclass.config.write_auto, family = tclass.family, domid;
        if (typeOf(tclass) === 'object' && tclass.hasOwnProperty('name')) {
            if (tclass.media !== 'none') {
                minfo = $media(tclass.media);
                if (typeOf(minfo) === 'object') {
                    // OPENING CSSS MEDIA QUERIES.
                    // cstr += '\n\t@media ' + minfo.value + ' {\n';
                    // OPENING CSS SELECTOR.
                    cstr += '\t\t' + tclass.name + ' {\n';
                    // CREATING CSS STRING.
                    cstr += TocmBuilder.createCSS(tclass.properties, '\t\t\t');
                    // CLOSING CSS SELECTOR.
                    cstr += '\t\t}\n';
                    // CREATING PSEUDO IF EXISTS.
                    psdo = tclass.pseudo;
                    for (key in psdo) {
                        if (psdo.hasOwnProperty(key)) {
                            if (typeOf(psdo[key]) === 'object' && Object.keys(psdo[key]).length > 0) {
                                cstr += '\t\t' + tclass.name + ':' + key + ' {\n';
                                cstr += TocmBuilder.createCSS(psdo[key], '\t\t\t');
                                cstr += '\t\t}\n';
                            }
                        }
                    }
                    // CLOSING CSS MEDIA QUERIES.
                    // cstr += '\t}\n';
                    if (typeOf(isget) === 'boolean' && isget === true) {
                        return cstr;
                    } else {
                        // WRITING THE STYLE NODE.
                        if (auto === true) {
                            TocmBuilder.writeDOM(tclass.name, minfo.name, cstr);
                        }
                    }
                }
            } else {
                cstr += '\n\t' + tclass.name + ' {\n';
                cstr += TocmBuilder.createCSS(tclass.properties, '\t\t');
                cstr += '\t}\n';

                // CREATING PSEUDO IF EXISTS.
                psdo = tclass.pseudo;
                for (key in psdo) {
                    if (psdo.hasOwnProperty(key)) {
                        if (typeOf(psdo[key]) === 'object' && Object.keys(psdo[key]).length > 0) {
                            cstr += '\t' + tclass.name + ':' + key + ' {\n';
                            cstr += TocmBuilder.createCSS(psdo[key], '\t\t');
                            cstr += '\t}\n';
                        }
                    }
                }

                if (typeOf(isget) === 'boolean' && isget === true) {
                    return cstr;
                } else {
                    // WRITING THE STYLE NODE.
                    if (auto === true) {
                        TocmBuilder.writeDOM(tclass.name, 'universal', cstr);
                    }
                }
            }
        }
    };

    // ATTACHING CSS STRING BUILDER TO WINDOW OBJECT.
    window.TocmBuilder = ClassBuilder;
})(window);
