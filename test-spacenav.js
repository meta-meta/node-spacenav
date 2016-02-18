var SpaceNavigator = require('.');

var spacenav;
for (var i = 0; i < SpaceNavigator.deviceCount(); i++) {

    console.log('opening SpaceNavigator', i);

    spacenav = new SpaceNavigator.SpaceNavigator(i);

    spacenav.on('translate', function (translation) {
        console.log('translate: ', JSON.stringify(translation));
    });

    spacenav.on('rotate', function (rotation) {
        console.log('rotate: ', JSON.stringify(rotation));
    });
}