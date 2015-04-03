var _ = require('lodash');

var makeStore = require('./makeStore');
var Dispatcher = require('../dispatcher');

var _markers = [];


var MapStore = makeStore({
    all: () => _markers
});

MapStore.dispatcherToken = Dispatcher.register(payload => {

    var action = payload.action;
    switch (action.actionType) {
        case 'markerAdded':
            _markers.push(action.marker);
        break;

        case 'markerRemoved':
            var markers = _markers.slice(0);
            markers.splice(markers.indexOf(action.marker), 1);
            _markers = markers;
        break;

        default:
            return true;
    }
    MapStore.emitChange();
    return true;
});

module.exports = MapStore;
