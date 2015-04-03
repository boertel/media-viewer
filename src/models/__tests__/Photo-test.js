jest.dontMock('../photo');

describe('Photo', function () {
    beforeEach(function () {
        this.data = {
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
        };
    });

    it('width is original width', function () {
        var Photo = require('../photo');

        var photo = new Photo(this.data);

        expect(photo.width).toEqual(this.data.sizes.original.width);
        expect(photo.height).toEqual(this.data.sizes.original.height);
    });

    it('sorted sizes', function () {
        var Photo = require('../photo'),
            photo = new Photo(this.data);

        var sortedSizes = photo.sizes.toArray();
        expect(sortedSizes[0].width < sortedSizes[1].width).toBeTruthy();
    });

    it('find closest size', function () {
        var Photo = require('../photo');

        var photo = new Photo(this.data);

        var width = 300,
            height = 400;

        var size = photo.getClosest(width, height);
        expect(size.width).toEqual(this.data.sizes.medium.width);
        expect(size.height).toEqual(this.data.sizes.medium.height);
    });
});

