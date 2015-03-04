var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler } = Router;
var { PropTypes } = React;

var _ = require('lodash');

var Day = require('./components/day.js');

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
    }
};

module.exports = function (element) {
    var routes = (
        <Route handler={App} path='/' name='day'>
            <DefaultRoute handler={Day} />
            <Route name='media' path='/:index' handler={Day} ignoreScrollBehavior={true} />
        </Route>
    );

    Router.run(routes, function (Handler, state) {
        _.forOwn(state.params, function (value, key) {
            if (parse[key] !== undefined) {
                value = parse[key](value);
            }
        });

        React.render(<Handler {...state} />, element);
    });
};
