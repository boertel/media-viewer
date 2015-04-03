var React = require('react');
var { RouteHandler } = require('react-router');

var actions = require('../actions');
var TripStore = require('../stores/TripStore');

var Timeline = require('./timeline');
var Loader = require('./loader');
var Map = require('./map');


var Trip = React.createClass({
    mixins: [ TripStore.listenTo ],
    getInitialState: function () {
        return {
            trip: undefined
        };
    },
    componentDidMount: function () {
        actions.trips(this.props.params.trip);
    },
    _onChange: function () {
        this.setState({
            trip: TripStore.get(this.props.params.trip)
        });
    },
    render: function () {
        // TODO WRONG, this.state.status === 'pending'
        if (this.state.trip === "pending" || this.state.trip === undefined) {
            return <Loader />;
        }
        var numberOfDays = this.state.trip.days;

        return (
            <div>
                <Timeline {...this.props} length={numberOfDays} />
                <Map accessToken='pk.eyJ1IjoiYm9lcnRlbCIsImEiOiJFV0tXLTQ4In0.4PRhZjzKIuWuhy2ytRi7Eg' mapId='boertel.h95nl1fe' />
                <RouteHandler {...this.props} />
                <Timeline {...this.props} length={numberOfDays} />
            </div>
        );
    }
});

module.exports = Trip;
