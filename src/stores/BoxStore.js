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
        case 'boxesLoaded':
            _boxes[action.day] = action.boxes;
            BoxStore.emitChange();
        break;
    }
    return true;
});

module.exports = BoxStore;
