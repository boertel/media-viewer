var React = require('react');
var { Navigation, Link } = require('react-router');

var Resize = require('../mixins/resize');

var MediaStore = require('../stores/MediaStore');

var components = require('./index');


var Viewer = React.createClass({
    mixins: [ MediaStore.listenTo, Navigation, Resize ],
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
    _onChange: function () {
        this.setState({
            media: MediaStore.all()
        });
    },
    keydown: function (event) {
        var index = this.props.params.index;
        if (event.which === 74 || event.which === 37) {
            index -= 1;
        }
        else if (event.which === 75 || event.which === 39) {
            index += 1;
        }
        if (index !== this.props.params.index
            && this.limit(index)()) {
            this.transitionTo('media', {index: index});
        }
    },
    limit: function (index) {
        index = index || this.props.params.index
        return (function () {
            return (index >= 0 && index < this.state.media.length)
        }).bind(this)
    },
    render: function () {
        var index = this.props.params.index;
        var media = this.state.media;
        var medium = media[index] || {};

        // FIXME I fell that this is a HACK, to many empty render are happening
        if (medium.type === undefined) {
            return <div></div>;
        }

        var windowHeight = this.state.windowHeight * 0.7;
        // TODO handle ratio per medium or default
        var Component = components[medium.type];
        var component = <Component ratio={1} windowWidth={this.state.windowWidth} windowHeight={windowHeight} {...medium.props} />;

        var previousOnClick = this.limit(index - 1);
        var nextOnClick = this.limit(index + 1);
        return (
            <div>
                <Link to="day">Close</Link>
                <div>
                    {component}
                </div>
                <div>
                    <span>{ index + 1 }</span> - <span>{ media.length }</span>
                </div>
                <div>
                    <Link onClick={previousOnClick} to='media' params={{index: index - 1}}>Previous</Link>
                    <span> - </span>
                    <Link onClick={nextOnClick} to='media' params={{index: index + 1}}>Next</Link>
                </div>
            </div>
        );
    }
});

module.exports = Viewer;
