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
    addPicture: function (i) {
        return () => actions.add("http://placehold.it/40x" + (i + 1) + "00");
    },
    _onChange: function () {
        this.setState({
            pictures: PictureStore.all()
        });
    },
    render: function () {
        var i = 0;
        var ratio = 0;

        this.state.pictures.forEach(function (picture) {
            ratio += parseFloat(picture.aspect_ratio);
        });

        var picturesList = this.state.pictures.map(function (picture) {
            return (
                <Link to="picture" params={{index: i++}}>
                    <Picture picture={picture} ratio={ratio} width={this.state.width} />
                </Link>
            );
        }, this);

        picturesList.push(<a href="#" onClick={this.addPicture(i)}>Add</a>);

        return (
            <div>
                {picturesList}
                <Viewer params={this.props.params} pictures={this.state.pictures} />
            </div>
        );
    }
});

module.exports = Gallery;
