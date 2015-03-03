var makeStore = require('../make_store'),
    Dispatcher = require('../dispatcher');


var _boxes = [];

var BoxStore = makeStore({
    all: () => _boxes
});

BoxStore.dispatcherToken = Dispatcher.register(payload => {
    var action = payload.action;

    switch (action.actionType) {
        case 'boxesLoaded':
            _boxes = action.boxes;
        break;
    }
    BoxStore.emitChange();
    return true;
});

module.exports = BoxStore;
