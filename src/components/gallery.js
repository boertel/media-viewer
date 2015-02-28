var React = require('react');
var _ = require('lodash');

var { Link } = require('react-router');

var PictureStore = require('../stores/picture_store');
var actions = require('../actions');

var Viewer = require('./viewer');
var Picture = require('./picture');

var Resize = require('../mixins/resize.js');


var Gallery = React.createClass({
    mixins: [ PictureStore.listenTo, Resize ],
    getInitialState: function () {
        return {
            pictures: []
        }
    },
    componentDidMount: function () {
        actions.pictures();
    },
    _onChange: function () {
        this.setState({
            pictures: PictureStore.all()
        });
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
        this.number = 0;
        var max = 4;

        var chunks = _.chunk(this.state.pictures, max);
        var rows = chunks.map(this.renderRow);

        var viewer;
        if (this.props.params.index) {
            viewer = (
                <Viewer params={this.props.params} pictures={this.state.pictures} />
            );
        }

        return (
            <div>
                {rows}
                {viewer}
            </div>
        );
    }
});

module.exports = Gallery;
