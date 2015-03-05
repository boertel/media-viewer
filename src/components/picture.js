var React = require('react');

var Ratio = require('../mixins/ratio');
var LazyLoad = require('./lazyLoad.js');

var Picture = React.createClass({
    mixins: [ Ratio ],
    render: function () {
        var { width, height } = this.ratio();

        return (
            <img src={this.props.src} width={width} height={height} />
        );
    }
});

module.exports = Picture;
