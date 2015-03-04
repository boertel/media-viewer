var _ = require('lodash');

var React = require('react');
var { Link, Navigation } = require('react-router');

var Resize = require('../mixins/resize.js');

var MediaStore = require('../stores/MediaStore');
var actions = require('../actions');

var components = require('./index');


var Gallery = React.createClass({
    mixins: [ MediaStore.listenTo, Resize, Navigation ],
    getInitialState: function () {
        return {
            media: []
        };
    },
    componentDidMount: function () {
        window.addEventListener('keydown', this.keydown);
    },
    componentWillUnmount: function () {
        window.removeEventListener('keydown', this.keydown);
    },
    keydown: function (event) {
        if (event.which === 27) {
            this.transitionTo('day');
        }
    },
    _onChange: function () {
        this.setState(MediaStore.get(this.props.id));
    },
    renderRow: function (media) {
        var margin = 10;
        var length = media.length;
        var windowWidth = this.state.windowWidth - (length - 1) * margin;

        var ratio = media.reduce(function (prev, medium) {
            return prev + medium.props.aspect_ratio;
        }, 0);

        var mediaList = media.map(function (medium, i) {
            var style = {
                display: 'inline'
            };
            style.marginRight = (i === length - 1) ? 0 : margin;
            var Component = components[medium.type];
            var component = <Component {...medium.props} ratio={ratio} windowWidth={windowWidth} />
            return (
                <div style={style}>
                    <Link to="media" params={{index: this.counter++}}>
                        {component}
                    </Link>
                </div>
            );
        }, this);

        return (
            <div>{mediaList}</div>
        );
    },
    render: function () {
        // TODO props ? from the store ?
        var max = 4;
        this.counter = this.state.counter;

        // chunck dispatch could be store somewhere i.e: [1,2,1]
        var chunks = _.chunk(this.state.media, max);
        var rows = chunks.map(this.renderRow);

        return (
            <div>
                {rows}
            </div>
        );
    }
});

module.exports = Gallery;
