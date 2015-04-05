var pictures = [
    {
        "type": "Picture",
        "props": {
            "caption": "On 6th and W 53th St",
            "credit": "The Halal Guys",
            "datetime": "2014:08:25 14:22:54",
            "marker": {
                "coordinates": [
                    -73.9786388888889,
                    40.761922222222225
                ],
                "size": "small",
                "symbol": ""
            },
            "sizes": {
                "original": {
                    "width": 750,
                    "height": 1000,
                    "src": "http://placehold.it/750x1000"
                },
                "medium": {
                    "width": 375,
                    "height": 500,
                    "src": "http://placehold.it/500x375"
                },
                "small": {
                    "width": 284,
                    "height": 379,
                    "src": "http://placehold.it/284x379"
                }
            }
        }
    },
    {
        "type": "Picture",
        "props": {
            "caption": "",
            "credit": "",
            "datetime": "2014:08:25 17:26:53",
            "marker": {
                "coordinates": [
                    -73.940675,
                    40.75107222222222
                ],
                "size": "small",
                "symbol": "rail-metro"
            },
            "sizes": {
                "original": {
                    "src": "http://placehold.it/1000x680",
                    "width": 1000,
                    "height": 680
                }
            }
        }
    },
    {
        "type": "Picture",
        "props": {
            "caption": "Commute",
            "credit": "Brooklyn Subway Station",
            "datetime": "2014:08:25 17:27:03",
            "marker": {
                "coordinates": [
                    -73.94065,
                    40.750908333333335
                ],
                "size": "small",
                "symbol": "rail-metro"
            },
            "sizes": {
                "original": {
                    "src": "http://placehold.it/1000x750",
                    "height": 750,
                    "width": 1000
                }
            }
        }
    },
    {
        "type": "Picture",
        "props": {
            "caption": "",
            "credit": "Trois-Rivières",
            "datetime": "2014:09:01 16:10:00",
            "marker": {
                "coordinates": [
                    -72.5425861111111,
                    46.34213888888889
                ],
                "size": "small",
                "symbol": "beer"
            },
            "sizes": {
                "original": {
                    "src": "http://placehold.it/750x1000",
                    "height": 1000,
                    "width": 750
                }
            }
        }
    },
    {
        "type": "Picture",
        "props": {
            "caption": "Viande et frites après une après-midi sportive",
            "credit": "Trois-Rivières",
            "datetime": "2014:09:01 16:20:52",
            "marker": {
                "coordinates": [
                    -72.54259444444445,
                    46.342175000000005
                ],
                "size": "small",
                "symbol": "restaurant"
            },
            "sizes": {
                "original": {
                    "src": "http://placehold.it/1000x750",
                    "height": 750,
                    "width": 1000
                }
            }
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
    return r[d.day];
};

var colors = [
    "#f1f075"
    ,"#eaf7ca"
    ,"#c5e96f"
    ,"#a3e46b"
    ,"#7ec9b1"
    ,"#b7ddf3"
    ,"#63b6e5"
    ,"#1087bf"
    ,"#548cba"
    ,"#677da7"
    ,"#9c89cc"
    ,"#c091e6"
    ,"#d27591"
    ,"#f86767"
    ,"#e7857f"
];

response['/trip'] = function (d) {
    var r = {
        'newyork': {
            slug: 'newyork',
            days: 2,
            colors: colors
        }
    };
    return r[d.slug];
};

var Dispatcher = require('./dispatcher');

function dispatch (key, response, params) {
    var payload = {
        actionType: key,
        response: response,
        queryParams: params
    };

    Dispatcher.handleViewAction(payload);
}

var request = function (method, path, data) {
    return new Promise(function (resolve) {
        window.setTimeout(function () {
            resolve(response[path](data));
        }, 1000);
    });
    //.catch(Components.utils.reportError);
};


var methods = ['get', 'post'];

methods.forEach(function (method) {
    request[method] = function () {
        var args = Array.prototype.slice.apply(arguments);
        args.unshift(method);
        return request.apply(this, args);
    };
});


var Api = function (method, path, data) {
    var key = method + ':' + path;
    // make the call synchronous for actions,
    // they will receive pending, and then the response when we receive it
    dispatch(key, 'pending', data);
    // abort calls from this key
    return request[method](path, data).then(function (response) {
        dispatch(key, response, data);
    });
};

methods.forEach(function (method) {
    Api[method] = function () {
        var args = Array.prototype.slice.apply(arguments);
        args.unshift(method);
        return Api.apply(this, args);
    };
});

module.exports = Api;
