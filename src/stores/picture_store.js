var makeStore = require('../make_store');
var Dispatcher = require('../dispatcher');

var _pictures = {};
var _length = 0;


var PictureStore = makeStore({
    all: () => _pictures,
    get: (key) => _pictures[key]
});

PictureStore.dispatcherToken = Dispatcher.register(payload => {
    var action = payload.action;
    switch (action.actionType) {
        case 'boxesLoaded':
            var pictures = action.boxes.filter(function (box) {
                return box.type === 'images'
            });

            _pictures = pictures.reduce(function (o, picture) {
                picture.props.pictures.forEach(function (picture) {
                    picture.aspect_ratio = picture.width / picture.height;
                });
                o[picture.key] = {
                    pictures: picture.props.pictures,
                    length: _length
                }
                _length += picture.props.pictures.length;
                return o;
            }, {});
        break;

        case 'picturesLoaded':
        break;

        case 'pictureAddedPending':
            _pictures.push(action.picture);
        break;
    }
    PictureStore.emitChange();
    return true;
});

module.exports = PictureStore;
