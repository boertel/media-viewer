var React = require('react');

var Ratio = require('../mixins/ratio');


var Picture = React.createClass({
    mixins: [ Ratio ],
    render: function () {
        var { width, height } = this.ratio();
        var style = {
            display: 'inline-block',
            backgroundColor: '#b0b0b0',
            width: width,
            height: height
        };

        return (
            <div style={style}>
                <img src={this.props.src} width={width} height={height} />
            </div>
        );
    }
});

module.exports = Picture;
