var React = require('react');

var Ratio = require('../mixins/ratio');

var querystring = require('querystring');


var Video = React.createClass({
    mixins: [ Ratio ],
    render: function () {
        var options = {
            badge: 0,
            byline: 0,
            title: 0,
            portrait: 0
        };


        var ratio = this.props.ratio / 0.7;
        var { width, height } = this.ratio(ratio);

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
