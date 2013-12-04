/*jshint boss:true*/
/*jshint undef:false*/

$class('.page', {
    padding: 20, background_color: '#ccc',
    
    '#test': {
        position: 'relative', display: 'inline-block', transition: 'all .3s ease-in', left: '40%'
    }
});

$animation('test-slide', {
    repeat: 3,
    
    '40%': {
        left: 0, font_size: '2em'
    },
    '80%': {
        left: '50%'
    },
    '100%': {
        left: '100%'
    },
    
    '#test': {
        duration: 5,
        delay: 0.3,
        
        '60%': {
            font_size: '1em', color: 'red', left: '80%'
        }
    }
});

$animation('.test-slide').onRun = function (e) {
    $log('TEST', 'Animation "' + e.animationName + '" Started.');
};
$animation('.test-slide').onEnd = function (e) {
    $log('TEST', 'Animation "' + e.animationName + '" Endded.');
};