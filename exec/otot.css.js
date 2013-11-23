TocmAutoWrite = false;
window.$batch = function (name, object, family, parent) {
    var key, xkey, newclass, media, newname, subclass, vobj = {}, vpsdo = {};
    if (typeOf(name) === 'string' && typeOf(object) === 'object') {
        // Parsing name and media.
        if (name.search('@') > -1) {
            name = name.replace(/\s+(\@)\s+/g, '@');
            name = name.split('@');
            media = name[1];
            name = name[0];
        } else {
            media = 'none';
        }
        // Enumerating Property and new object.
        newclass = $priv(name, {}, media);
        
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
                        subclass = $batch(newname, object[key], family, newclass);
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


// TESTING OBJECT //
$batch('.content@mobile', {
    width: 100,
    height: 100,
    background_image: linear_gradient('0deg, #fff, #ccc'),
    // Applying Pseudo.
    hover: {
        color: '#000',
        font_size: 30
    },
    // ADDING SUB CONTENT //
    '.sub-content': {
        float: 'left', margin: 0,
        '.thrid-level@mobile': {
            width: 300,
            hover: {
                color: '#333'
            }
        },
        '.third-level': {
            padding: 100,
            clear: 'both'
        },
        '.third-level & .fourth-level': {
            width: 200
        },
        '.sixth-level & .fourth-level': {
            margin: 100,
            padding: 100
        }
    },
    '.foot': {
        display: 'none'
    }
});
