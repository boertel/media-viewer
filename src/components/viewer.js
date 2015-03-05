var React = require('react');
var { Navigation, Link } = require('react-router');

var Resize = require('../mixins/resize');

var MediaStore = require('../stores/MediaStore');

var Loader = require('./loader');
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
        this._onChange();
    },
    componentWillUnmount: function () {
        window.removeEventListener('keydown', this.keydown);
    },
    _onChange: function () {
        // TODO weird, should be something done in the DidMount (mixin listenTo is doing it for us?)
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
        else if (event.which === 27) {
            this.transitionTo('day', {day: this.props.params.day});
            return;
        }
        if (index !== this.props.params.index
            && this.limit(index)()) {
            this.transitionTo('media', {day: this.props.params.day, index: index});
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

        if (media.length === 0) {
            return <Loader />
        }

        var medium = media[index] || {};

        var windowHeight = this.state.windowHeight * 0.7;
        // TODO handle ratio per medium or default
        var Component = components[medium.type];
        var component = <Component ratio={1} windowWidth={this.state.windowWidth} windowHeight={windowHeight} {...medium.props} />;

        var previousOnClick = this.limit(index - 1);
        var nextOnClick = this.limit(index + 1);
        return (
            <div>
                <Link to='day' params={{day: this.props.params.day}}>Close</Link>
                <div>
                    {component}
                </div>
                <div>
                    <span>{ index + 1 }</span> - <span>{ media.length }</span>
                </div>
                <div>
                    <Link onClick={previousOnClick} to='media' params={{day: this.props.params.day, index: index - 1}}>Previous</Link>
                    <span> - </span>
                    <Link onClick={nextOnClick} to='media' params={{day: this.props.params.day, index: index + 1}}>Next</Link>
                </div>
            </div>
        );
    }
});

module.exports = Viewer;
