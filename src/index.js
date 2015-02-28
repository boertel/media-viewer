var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler } = Router;
var { PropTypes } = React;

var Viewer = require('./components/viewer.js'),
    Gallery = require('./components/gallery.js');

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
        <Route handler={App} path='/' name='gallery'>
            <DefaultRoute handler={Gallery} />
            <Route name='picture' path='/:index' handler={Gallery} />
        </Route>
    );

    Router.run(routes, function (Handler, state) {
        React.render(<Handler {...state} />, element);
    });
};
