var HID = require('node-hid');
var util = require('util');
var events = require('events');

var allDevices;
function getAllDevices()
{
    if (!allDevices) {
        allDevices = HID.devices(1133, 50726);
    }
    return allDevices;
}

function SpaceNavigator(index)
{
    if (!arguments.length) {
        index = 0;
    }

    var spaceNavs = getAllDevices();
    if (!spaceNavs.length) {
        throw new Error("No SpaceNavigator could be found");
    }
    if (index > spaceNavs.length || index < 0) {
        throw new Error("Index " + index + " out of range, only " + spaceNavs.length + " SpaceNavigators found");
    }
    this.hid = new HID.HID(spaceNavs[index].path);
    this.hid.on('data', this.interpretData.bind(this));
}

util.inherits(SpaceNavigator, events.EventEmitter);

SpaceNavigator.prototype.interpretData = function(data) {
    //http://www.mullist.com/2015/01/09/getting-node-hid-to-work-on-windows/
    //https://www.3dconnexion.com/forum/viewtopic.php?t=3983
    function parseData(xl, xh, zl, zh, yl, yh)
    {
        function adjust(x) { // we get an improperly parsed two's complement int
            return (x > 1000 ? 65536 - x : -x) / 350;
        }

        return {
            x: adjust(xl + (xh << 8)),
            y: adjust(yl + (yh << 8)),
            z: adjust(zl + (zh << 8))
        };
    }

    var transform = parseData.apply(parseData, data.slice(1));
    this.emit(data[0] === 1 ? 'translate': 'rotate', transform);
};

exports.SpaceNavigator = SpaceNavigator;
exports.deviceCount = function () { return getAllDevices().length; };