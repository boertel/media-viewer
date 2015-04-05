var React = require('react'),
    Halogen = require('halogen');

var Loader = React.createClass({
    render: function () {
        var color = '#CCCCCC';
        return (
            <div><Halogen.ClipLoader color={color}/></div>
        );
    }
});

module.exports = Loader;
