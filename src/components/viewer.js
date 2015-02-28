var React = require('react');
var { Navigation, Link } = require('react-router');
var Picture = require('./picture');


var Viewer = React.createClass({
    mixins: [ Navigation ],
    componentDidMount: function () {
        window.addEventListener('keydown', this.keydown);
    },
    componentWillUnmount: function () {
        window.removeEventListener('keydown', this.keydown);
    },
    keydown: function (event) {
        var index = parseInt(this.props.params.index);
        if (event.which === 74 || event.which === 37) {
            index -= 1;
        }
        else if (event.which === 75 || event.which === 39) {
            index += 1;
        }
        if (index !== this.props.params.index
            && (index >= 0 && index < this.props.pictures.length)) {
            this.transitionTo('picture', {index: index});
        }
    },
    render: function () {
        var index = parseInt(this.props.params.index),
            picture = this.props.pictures[index];

        var style = {
            display: 'block'
        };
        if (this.props.params.index === undefined) {
            style.display = 'none';
        }
        return (
            <div style={style}>
                <Link to="gallery">Close</Link>
                <div>
                    <Picture picture={picture} />
                </div>
                <div>
                    <span>{ index + 1 }</span> - <span>{ this.props.pictures.length + 1 }</span>
                </div>
                <div>
                    <Link to='picture' params={{index: index - 1}}>Previous</Link>
                    <span> - </span>
                    <Link to='picture' params={{index: index + 1}}>Next</Link>
                </div>
            </div>
        );
    }
});

module.exports = Viewer;
