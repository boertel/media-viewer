var Dispatcher = require('./dispatcher');

var request = require('./api');

var actions = {
    boxes: function (day) {
        var data = {
            day: day
        };
        request.get('/boxes', data)
    },
    trips: function (slug) {
        var data = {
            slug: slug
        };
        request.get('/trip', data);
    },
    addMarker: function (marker) {
        Dispatcher.handleViewAction({
            actionType: 'markerAdded',
            marker: marker
        });
    },
    removeMarker: function (marker) {
        Dispatcher.handleViewAction({
            actionType: 'markerRemoved',
            marker: marker
        });
    },
    pictures: function (id) {
        Dispatcher.handleViewAction({
            actionType: 'picturesLoaded',
            id: id
        });
    },
    add: function (picture) {
        request.post('/picture').then(function () {
            Dispatcher.handleViewAction({
                actionType: 'pictureAddedSuccess',
                picture: picture
            });
        });
        Dispatcher.handleViewAction({
            actionType: 'pictureAddedPending',
            picture: picture
        });
    }
};

module.exports = actions;
