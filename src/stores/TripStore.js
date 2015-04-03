var makeStore = require('./makeStore');
var Dispatcher = require('../dispatcher');

var _trips = {};

var TripStore = makeStore({
    get: (slug) => _trips[slug]
});

TripStore.dispatcherToken = Dispatcher.register(payload => {
    var action = payload.action;

    switch (action.actionType) {
        case 'get:/trip':
            // TODO where should pending be handle ? action, store, components ? should there be different actionType -SUCCESS and -PENDING
            _trips[action.queryParams.slug] = action.response;
        break;

        default:
            return true;
    }
    TripStore.emitChange();
    return true;
});

module.exports = TripStore;
