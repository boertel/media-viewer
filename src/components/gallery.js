var _ = require('lodash');

var React = require('react');
var { Link, Navigation } = require('react-router');

var Resize = require('../mixins/resize.js');

var PictureStore = require('../stores/picture_store');
var actions = require('../actions');

var Viewer = require('./viewer');
var Picture = require('./picture');



var Gallery = React.createClass({
    mixins: [ PictureStore.listenTo, Resize, Navigation ],
    getInitialState: function () {
        return {
            pictures: [],
            length: 0
        }
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
        this.setState(PictureStore.get(this.props.id));
    },
    renderRow(pictures) {
        var ratio = 0;
        var margin = 10;
        var length = pictures.length;
        var width = this.state.width - (length - 1) * margin;

        pictures.forEach(function (picture) {
            ratio += parseFloat(picture.aspect_ratio);
        });

        var picturesList = pictures.map(function (picture, i) {
            var style = {
                display: 'inline'
            };
            style.marginRight = (i === length - 1) ? 0 : margin;
            return (
                <div style={style}>
                    <Link to="picture" params={{index: this.number++}}>
                        <Picture picture={picture} ratio={ratio} width={width} />
                    </Link>
                </div>
            );
        }, this);

        return (
            <div>{picturesList}</div>
        );
    },
    render: function () {
        var max = 4;
        this.number = this.state.length;

        // chunck dispatch could be store somewhere i.e: [1,2,1]
        var chunks = _.chunk(this.state.pictures, max);
        var rows = chunks.map(this.renderRow);

        return (
            <div>
                {rows}
            </div>
        );
    }
});

module.exports = Gallery;
