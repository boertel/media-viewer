var React = require('react');

var Picture = React.createClass({
    getDefaultProps: function () {
        return {
            width: 0
        };
    },
    render: function () {
        var width, height;

        if (this.props.ratio) {
            width = Math.floor(this.props.windowWidth / this.props.ratio * this.props.aspect_ratio);
            // TODO handle when height is higher than the windowHeight
            height = Math.floor(this.props.windowWidth / this.props.ratio);
        }

        return (
            <img src={this.props.src} width={width} height={height} />
        );
    }
});

module.exports = Picture;
