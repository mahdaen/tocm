var y = {
    'div id="some" class="thing"' : {
        'span class="thing"' : 'Lorem ipsum dolor',
        'a href="index.php"' : {
            'img' : 'src="img/icon.png"'
        }
    }
};

$.class('.rad', {
    background_image: gradient({
        linear1: gradval('90deg', [rgb('#d84d4d', 0.2), rgb('#4aace0', 0.6), rgb('#3abe2f', 0.2)]),
        linear2: gradval('180deg', [rgb('#d84d4d', 0.2), rgb('#4aace0', 0.6), rgb('#3abe2f', 0.2)]),
        linear3: gradval('170deg', [rgb('#d84d4d', 0.2), rgb('#4aace0', 0.6), rgb('#3abe2f', 0.2)]),
        linear4: gradval('45deg', [rgb('#d84d4d', 0.2), rgb('#4aace0', 0.6), rgb('#3abe2f', 0.2)]),
        radial1: gradval([rgb('#d84d4d', 0.2), rgb('#3abe2f', 0.6)])
    })
});



var rad = {
    background-image: linear-gradient(90deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), linear-gradient(180deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), linear-gradient(170deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), linear-gradient(45deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), radial-gradient(rgba(216, 77, 77, 0.2), rgba(58, 190, 47, 0.6)); -webkit-linear-gradient(90deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -webkit-linear-gradient(180deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -webkit-linear-gradient(170deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -webkit-linear-gradient(45deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -webkit-radial-gradient(rgba(216, 77, 77, 0.2), rgba(58, 190, 47, 0.6)); -moz-linear-gradient(90deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -moz-linear-gradient(180deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -moz-linear-gradient(170deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -moz-linear-gradient(45deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -moz-radial-gradient(rgba(216, 77, 77, 0.2), rgba(58, 190, 47, 0.6)); -o-linear-gradient(90deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -o-linear-gradient(180deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -o-linear-gradient(170deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -o-linear-gradient(45deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -o-radial-gradient(rgba(216, 77, 77, 0.2), rgba(58, 190, 47, 0.6)); -ms-linear-gradient(90deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -ms-linear-gradient(180deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -ms-linear-gradient(170deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -ms-linear-gradient(45deg, rgba(216, 77, 77, 0.2), rgba(74, 172, 224, 0.6), rgba(58, 190, 47, 0.2)), -ms-radial-gradient(rgba(216, 77, 77, 0.2), rgba(58, 190, 47, 0.6))
};
