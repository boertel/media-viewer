var Dispatcher = require('./dispatcher');

var request = {
    get: function (path, data) {
        var pictures = [
            {
                "type": "Picture",
                "props": {
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
                }
            },
            {
                "type": "Picture",
                "props": {
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
                }
            },
            {
                "type": "Picture",
                "props": {
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
                }
            },
            {
                "type": "Picture",
                "props": {
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
                }
            },
            {
                "type": "Picture",
                "props": {
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
            }
        ];

        var videos = [
            {
                "type": "Video",
                "props": {
                    "url": "//player.vimeo.com/video/108511228",
                    "title": "Piétons sur le Brooklyn Bridge",
                    "width": 500,
                    "height": 281
                }
            }
        ];

        var response = {};
        response['/boxes'] = function (d) {
               var r = {
                1: [
                    {
                        key: 0,
                        type: 'Text',
                        props: {
                            title: 'Day 1',
                            text: 'Départ 23h de SF, arrivée 8h du mat à New York. Il faut maintenant que j\'attende mon frère qui arrive à 12h. Question: que faire en attendant 4 heures à l\'aéroport ?'
                        }
                    },
                    {
                        "key": 1,
                        "type": "Gallery",
                        "props": {"media": pictures}
                    },
                    {
                        key: 2,
                        type: 'Text',
                        props: {
                            text: 'Pouet pouet pouet pouet'
                        }
                    }
                ],
                2: [
                    {
                        key: 3,
                        type: 'Text',
                        props: {
                            title: 'Day 2',
                            text: "Assez passé de temps dans l'aéroport, il est temps d'aller explorer la ville. Au programme de l'après midi: de la 33th st au sud de Central Park."
                        }
                    },
                    {
                        key: 5,
                        type: 'Text',
                        props: {
                            text: 'work'
                        }
                    },
                    {
                        "key": 4,
                        "type": "Gallery",
                        "props": {"media": [pictures[0]]}
                    }
                ]
            };
            return r[data.day];
        };

        response['/trip'] = function (d) {
            var r = {
                'newyork': {
                    slug: 'newyork',
                    days: 2
                }
            };
            return r[d.slug];
        };

        return new Promise(function (resolve) {
            window.setTimeout(function () {

                resolve(response[path](data));
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
    boxes: function (day) {
        var data = {
            day: day
        };
        request.get('/boxes', data).then(function (boxes) {
            Dispatcher.handleViewAction({
                actionType: 'boxesLoaded',
                day: day,
                boxes: boxes
            });
        });
    },
    trips: function (slug) {
        var data = {
            slug: slug
        };
        request.get('/trip', data).then(function (trip) {
            Dispatcher.handleViewAction({
                actionType: 'tripLoaded',
                trip: trip
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
