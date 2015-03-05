var React = require('react');
var { RouteHandler } = require('react-router');

var actions = require('../actions');

var Day = require('./day');
var Timeline = require('./timeline');


var Trip = React.createClass({
    componentDidMount: function () {
    },
    render: function () {
        var numberOfDays = 2;
        return (
            <div>
                <Timeline length={numberOfDays} />
                <RouteHandler {...this.props} />
                <Timeline length={numberOfDays} />
            </div>
        );
    }
});

module.exports = Trip;
