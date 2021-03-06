var _ = require('lodash');

var makeStore = require('./makeStore');
var Dispatcher = require('../dispatcher');

var _media = [];

var MediaStore = makeStore({
    all: function () {
        return _.flatten(_media.map(function (medium) {
            return medium.props.media;
        }));
    },
    get: function (key) {
        // TODO not found
        return _.find(_media, function (medium) {
            return medium.key === key;
        }).props;
    }
});


MediaStore.dispatcherToken = Dispatcher.register(payload => {
    var action = payload.action;
    switch (action.actionType) {
        case 'get:/boxes':
            if (action.response === 'pending') {
                return true;
            }
            var _counter = 0;
            var nextMedia = action.response.filter(function (box) {
                return box.type === 'Gallery';
            });
            nextMedia.forEach(function (box) {
                box.props.counter = 0;
                box.props.media.forEach(function (medium) {
                    if (medium.props.sizes) {
                        medium.props.src = medium.props.sizes.original.src;
                        medium.props.width = medium.props.sizes.original.width;
                        medium.props.height = medium.props.sizes.original.height;
                        medium.props.aspect_ratio = medium.props.width / medium.props.height;
                    }
                });
                box.props.counter = _counter;
                _counter += box.props.media.length;
            });
            _media = _media.concat(nextMedia);
        break;

        default:
            return true;
    }
    MediaStore.emitChange();
    return true;
});

module.exports = MediaStore;
