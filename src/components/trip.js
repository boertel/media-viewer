var React = require('react');
var { RouteHandler } = require('react-router');

var actions = require('../actions');
var TripStore = require('../stores/TripStore');

var Day = require('./day');
var Timeline = require('./timeline');
var Loader = require('./loader');


var Trip = React.createClass({
    mixins: [ TripStore.listenTo ],
    getInitialState: function () {
        return {
            trip: undefined
        };
    },
    componentDidMount: function () {
        // TODO this should be: this.props.params.trip
        actions.trips(this.props.params.trip);
    },
    _onChange: function () {
        this.setState({
            trip: TripStore.get(this.props.params.trip)
        });
    },
    render: function () {
        if (this.state.trip === undefined) {
            return <Loader />;
        }
        var numberOfDays = this.state.trip.days;

        return (
            <div>
                <Timeline {...this.props} length={numberOfDays} />
                <RouteHandler {...this.props} />
                <Timeline {...this.props} length={numberOfDays} />
            </div>
        );
    }
});

module.exports = Trip;
