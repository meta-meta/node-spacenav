```
npm install
node test-spacenav
```

##Usage
```
import SpaceNavigator from 'node-spacenav';

const spacenav = new SpaceNavigator.SpaceNavigator();

spacenav.on('translate', (translation) => {
    console.log('translate: ', JSON.stringify(translation));
});

spacenav.on('rotate', (rotation) => {
    console.log('rotate: ', JSON.stringify(rotation));
});

```
