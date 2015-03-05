var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler } = Router;
var { PropTypes } = React;

var _ = require('lodash');

var Day = require('./components/day');
var Trip = require('./components/trip');
var Timeline = require('./components/timeline');

var App = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired,
        query: PropTypes.object.isRequired
    },
    render: function () {
        return (
            <div>
                <RouteHandler {...this.props} />
            </div>
        );
    }
});

var parse = {
    index: function (value) {
        return parseInt(value, 10);
    },
    day: function (value) {
        return parseInt(value, 10);
    }
};

module.exports = function (element) {
    var routes = (
        <Route handler={App} path='/'>
            <Route name='trip' handler={Trip}>
                <Route name='day' path='/:day' handler={Day} ignoreScrollBehavior={true} />
                <Route name='media' path='/:day/:index' handler={Day} ignoreScrollBehavior={true} />
                <DefaultRoute handler={Trip} />
            </Route>
        </Route>
    );

    Router.run(routes, function (Handler, state) {
        _.forOwn(state.params, function (value, key) {
            if (parse[key] !== undefined) {
                state.params[key] = parse[key](value);
            }
        });

        React.render(<Handler {...state} />, element);
    });
};
