var React = require('react');

var Ratio = require('../mixins/ratio');
var LazyLoad = require('./lazyLoad.js');
var actions = require('../actions');

var Picture = React.createClass({
    mixins: [ Ratio ],
    flexibility: 1.1,
    toArray: function () {
        var array = [];
        for (var key in this.props.sizes) {
            array.push(this.props.sizes[key]);
        }

        return array.sort(function (a, b) {
            return a.width > b.width;
        });
    },
    closest: function (width, height) {
        var choosenOne = this.props.sizes.original,
            flexibility = this.flexibility;

        var array = this.toArray();

        for (var i = 0; i < array.length - 1; i += 1) {
            var current = array[i],
                next = array[i + 1];
            if (current.width * flexibility >= width && width < next.width) {
                return current;
            }
        }

        return choosenOne;
    },
    // TODO both method should be in a mixin
    componentDidMount: function () {
        if (this.props.marker) {
            actions.addMarker(this.props.marker);
        }
    },
    componentWillUnmount: function () {
        if (this.props.marker) {
            actions.removeMarker(this.props.marker);
        }
    },
    render: function () {
        var { width, height } = this.ratio();

        var image = this.closest(width, height);

        return (
            <LazyLoad width={width} height={height}>
                <img src={image.src} width={width} height={height} />
            </LazyLoad>
        );
    }
});

module.exports = Picture;
