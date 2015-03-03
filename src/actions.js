var Dispatcher = require('./dispatcher');

var request = {
    get: function (path) {
        var pictures = [
            {
                "caption": "On 6th and W 53th St",
                "credit": "The Halal Guys",
                "datetime": "2014:08:25 14:22:54",
                "height": 1000,
                "marker": {
                    "coordinates": [
                        -73.9786388888889,
                        40.761922222222225
                    ],
                    "size": "small",
                    "symbol": ""
                },
                "src": "http://placehold.it/750x1000",
                "width": 750
            },
            {
                "caption": "",
                "credit": "",
                "datetime": "2014:08:25 17:26:53",
                "height": 680,
                "marker": {
                    "coordinates": [
                        -73.940675,
                        40.75107222222222
                    ],
                    "size": "small",
                    "symbol": "rail-metro"
                },
                "src": "http://placehold.it/1000x680",
                "width": 1000
            },
            {
                "caption": "Commute",
                "credit": "Brooklyn Subway Station",
                "datetime": "2014:08:25 17:27:03",
                "height": 750,
                "marker": {
                    "coordinates": [
                        -73.94065,
                        40.750908333333335
                    ],
                    "size": "small",
                    "symbol": "rail-metro"
                },
                "src": "http://placehold.it/1000x750",
                "width": 1000
            },
            {
                "caption": "",
                "credit": "Trois-Rivières",
                "datetime": "2014:09:01 16:10:00",
                "height": 1000,
                "marker": {
                    "coordinates": [
                        -72.5425861111111,
                        46.34213888888889
                    ],
                    "size": "small",
                    "symbol": "beer"
                },
                "src": "http://placehold.it/750x1000",
                "width": 750
            },
            {
                "caption": "Viande et frites après une après-midi sportive",
                "credit": "Trois-Rivières",
                "datetime": "2014:09:01 16:20:52",
                "height": 750,
                "marker": {
                    "coordinates": [
                        -72.54259444444445,
                        46.342175000000005
                    ],
                    "size": "small",
                    "symbol": "restaurant"
                },
                "src": "http://placehold.it/1000x750",
                "width": 1000
            }
        ];

        var data = [
            {
                type: 'text',
                key: 0,
                props: {
                    title: 'Day 1: ????',
                    text: 'Hello World!'
                }
            },
            {
                type: 'images',
                key: 1,
                props: {
                    pictures: pictures
                }
            },
            {
                type: 'text',
                key: 2,
                props: {
                    text: 'Pouet pouet pouet pouet'
                }
            },
            {
                type: 'images',
                key: 3,
                props: {
                    pictures: pictures
                }
            }
        ];
        return new Promise(function (resolve) {
            window.setTimeout(function () {
                resolve(data);
            }, 1000);
        });
    },
    post: function (path) {
        return new Promise(function (resolve) {
            window.setTimeout(function () {
                resolve();
            }, 1000);
        });
    }
};


var actions = {
    boxes: function () {
        request.get('/boxes').then(function (boxes) {
            Dispatcher.handleViewAction({
                actionType: 'boxesLoaded',
                boxes: boxes
            });
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
