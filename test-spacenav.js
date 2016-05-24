var SpaceNavigator = require('.');

console.log('found ', SpaceNavigator.deviceCount(), ' spacenavs');

var spacenav = new SpaceNavigator.SpaceNavigator();

spacenav.on('translate', function (translation) {
    console.log('translate: ', JSON.stringify(translation));
});

spacenav.on('rotate', function (rotation) {
    console.log('rotate: ', JSON.stringify(rotation));
});