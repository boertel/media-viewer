var React = require('react');

var { Link } = require('react-router');

var PictureStore = require('../stores/picture_store');
var actions = require('../actions');

var Viewer = require('./viewer');
var Picture = require('./picture');


var Gallery = React.createClass({
    mixins: [ PictureStore.listenTo ],
    getInitialState: function () {
        return {
            pictures: []
        }
    },
    componentDidMount: function () {
        actions.pictures(() => {
            this.setState({
                pictures: PictureStore.all()
            });
        });
    },
    render: function () {
        var picturesList = this.state.pictures.map(function (picture, i) {
            return (
                <Link to="picture" params={{index: i}}>
                    <img src={picture} />
                </Link>
            );
        }, this);
        return (
            <div>
                {picturesList}
                <Viewer params={this.props.params} pictures={this.state.pictures} />
            </div>
        );
    }
});

module.exports = Gallery;
