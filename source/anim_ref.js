var anim = {
    // PARENT ANIMATION OBJECT -->
    // Config:
    name: 'HeadLine',
    duration: 0.5,
    easing: 'ease-in',
    delay: 0.2,
    plays: 1,
    direction: 'normal',
    state: 'running',
    callback: function () {}, // Function to call when the animation reaching duration count.
    
    // Timeline:
    '0%': {
        left: 10, top: 10
    },
    '0%-callback': function () {},
    '10%': {
        left: 20,
    },
    '100%': {
        left: -500
    },
    
    // CHILD ANIMATION OBJECT.
    '.title': {
        name: 'HeadLine-title',
        duration: 0.5,
        easing: 'ease-in-out',
        
        '0%': {
            left: 100
        },
        '100%': {
            left: 0
        }
    }
};