var React = require('react');
var actions = require('../actions');


var Marker = React.createClass({
    componentDidMount: function () {
        this.props.marker.addTo(this.props.map);
    },
    componentWillUnmount: function () {
        this.props.map.removeLayer(this.props.marker);
    },
    render: function () {
        return null;
    }
});

module.exports = Marker;
