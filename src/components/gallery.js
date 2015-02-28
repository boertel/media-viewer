var React = require('react');

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
    render: function () {
        var i = 0;
        var ratio = 0;
        var margin = 10;
        var length = this.state.pictures.length;
        var width = this.state.width - (length - 1) * margin;

        this.state.pictures.forEach(function (picture) {
            ratio += parseFloat(picture.aspect_ratio);
        });

        var picturesList = this.state.pictures.map(function (picture, i) {
            var style = {
                display: 'inline'
            };
            style.marginRight = (i === length - 1) ? 0 : margin;
            return (
                <div style={style}>
                    <Link to="picture" params={{index: i++}}>
                        <Picture picture={picture} ratio={ratio} width={width} />
                    </Link>
                </div>
            );
        }, this);

        var viewer;
        if (this.props.params.index) {
            viewer = (
                <Viewer params={this.props.params} pictures={this.state.pictures} />
            );
        }

        return (
            <div>
                {picturesList}
                {viewer}
            </div>
        );
    }
});

module.exports = Gallery;
