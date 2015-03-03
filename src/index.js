var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler } = Router;
var { PropTypes } = React;

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

module.exports = function (element) {
    var routes = (
        <Route handler={App} path='/' name='day'>
            <DefaultRoute handler={Day} />
            <Route name='media' path='/:index' handler={Day} ignoreScrollBehavior={true} />
        </Route>
    );

    Router.run(routes, function (Handler, state) {
        if (state.params.index !== undefined) {
            state.params.index = parseInt(state.params.index, 10);
        }
        React.render(<Handler {...state} />, element);
    });
};
