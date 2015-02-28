var Dispatcher = require('./dispatcher');

var request = {
    get: function (path) {
        var pictures = [
            'http://placehold.it/240x20',
            'http://placehold.it/240x120',
            'http://placehold.it/240x220',
            'http://placehold.it/240x320',
            'http://placehold.it/240x420'
        ];
        return new Promise(function (resolve) {
            window.setTimeout(function () {
                resolve(pictures);
            }, 1000);
        });
    }
};

var actions = {
    pictures: function (callback) {
        request.get('/pictures').then(function (pictures) {
            Dispatcher.handleViewAction({
                actionType: 'picturesLoaded',
                pictures: pictures
            });
            callback && callback();
        });
    }
};

module.exports = actions;
