var makeStore = require('./makeStore');
var Dispatcher = require('../dispatcher');

var _trips = {};

var TripStore = makeStore({
    get: (slug) => _trips[slug]
});

TripStore.dispatcherToken = Dispatcher.register(payload => {
    var action = payload.action;

    switch (action.actionType) {
        case 'tripLoaded':
            _trips[action.trip.slug] = action.trip;
            TripStore.emitChange();
        break;
    }
    return true;
});

module.exports = TripStore;
