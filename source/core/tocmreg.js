/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

// CREATING TOCM REGISTRY.
(function(window) {
    'use strict';
    // CREATING TOCM CONFIGURATIONS.
    window.TocmConfig = {
        autowrite: true,
        sortclass: false,
        showdebug: true,
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

