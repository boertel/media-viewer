var makeStore = require('../make_store'),
    Dispatcher = require('../dispatcher');

var _pictures = [];


var PictureStore = makeStore({
    all: () => _pictures,
    get: (index) => _pictures[parseInt(index, 10)]
});

PictureStore.dispatcherToken = Dispatcher.register(payload => {
    var action = payload.action;
    switch (action.actionType) {
        case 'picturesLoaded':
            _pictures = action.pictures;
        break;
    }
    PictureStore.emitChange();
    return true;
});

module.exports = PictureStore;
