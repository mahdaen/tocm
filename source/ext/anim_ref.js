/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

$animation('.headline', {
    // CONFIGURATIONS.
    duration: 0.6,
    timing: 'ease-in-out',
    delay: 0.3,
    repeat: 1,
    direction: 'normal',
    state: 'running',
    complete: function () {},
    
    // TIMELINE.
    '0%': {
        left: 100
    },
    '10%': {
        left: 200
    },
    '100%': {
        left: '100%'
    },
    
    '.title': {
        '0%': {
            left: 200, top: 10
        },
        '100%': {
            left: -500, top: 0
        }
    }
});

$animation('.test-slide')
.set('.test', {
    duration: 2,
    
    '20%': {
        left: 20
    },
    
    '.sub-test': {
        duration: 0.4,
        
        '30%': {
            left: 20
        }
    }
});