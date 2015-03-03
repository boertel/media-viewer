var React = require('react');

var querystring = require('querystring');


var Video = React.createClass({
    render: function () {
        var options = {
            badge: 0,
            byline: 0,
            title: 0,
            portrait: 0
        };

        var width = this.props.width,
            height = this.props.height;

        if (this.props.ratio) {
            // same code as Picture, ratioMixin ?! or parent component ?
            var ratio = this.props.ratio / 0.7;
            width = Math.floor(this.props.windowWidth / ratio * this.props.aspect_ratio);
            // TODO handle when height is higher than the windowHeight
            height = Math.floor(this.props.windowWidth / ratio);
        }

        var url = this.props.url + '?' + querystring.stringify(options);

        return (
            <iframe
                src={url}
                width={width}
                height={height}
                allowFullScreen={true}
                frameBorder={0}>
            </iframe>
        );
    }
});

module.exports = Video;
