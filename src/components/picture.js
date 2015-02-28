var React = require('react');

var Picture = React.createClass({
    getDefaultProps: function () {
        return {
            picture: {},
            width: 0
        };
    },
    render: function () {
        var width, height;
        var picture = this.props.picture;

        if (this.props.ratio) {
            width = Math.floor(this.props.width / this.props.ratio * picture.aspect_ratio);
            // TODO handle when height is higher than the windowHeight
            height = Math.floor(this.props.width / this.props.ratio);
        }

        return (
            <img src={picture.src} width={width} height={height} />
        );
    }
});

module.exports = Picture;
