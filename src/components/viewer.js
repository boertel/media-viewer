var React = require('react');
var { Navigation, Link } = require('react-router');

var Resize = require('../mixins/resize');

var MediaStore = require('../stores/MediaStore');

var components = require('./index');


var Viewer = React.createClass({
    mixins: [ MediaStore.listenTo, Navigation ],
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
            && (index >= 0 && index < this.state.media.length)) {
            this.transitionTo('media', {index: index});
        }
    },
    render: function () {
        var index = this.props.params.index;
        var media = this.state.media;
        var medium = media[index] || {};

        if (media.length === 0) {
            return null;
        }

        var Component = components[medium.type];
        var component = <Component ratio={1.7} width={this.state.width} {...medium.props} />;

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
                    <Link to='media' params={{index: index - 1}}>Previous</Link>
                    <span> - </span>
                    <Link to='media' params={{index: index + 1}}>Next</Link>
                </div>
            </div>
        );
    }
});

module.exports = Viewer;
