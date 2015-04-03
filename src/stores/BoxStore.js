var makeStore = require('./makeStore'),
    Dispatcher = require('../dispatcher');


var _boxes = {};

var BoxStore = makeStore({
    all: () => _boxes,
    get: (index) => _boxes[index]
});

BoxStore.dispatcherToken = Dispatcher.register(payload => {
    var action = payload.action;

    switch (action.actionType) {
        case 'get:/boxes':
            _boxes[action.queryParams.day] = action.response;
        break;

        default:
            return true;
    }
    BoxStore.emitChange();
    return true;
});

module.exports = BoxStore;
