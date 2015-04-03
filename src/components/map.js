var React = require('react');
var _ = require('lodash');

var MapStore = require('../stores/MapStore');

var Markers = require('../components/markers');


var Map = React.createClass({
    mixins: [ MapStore.listenTo ],
    getInitialState: function () {
        return {
            markers: []
        };
    },
    componentDidMount: function () {
        L.mapbox.accessToken = this.props.accessToken;
        var options = {
            zoomControl: false
        };
        this.map = L.mapbox.map('map', this.props.mapId, options);
        //new L.Control.Zoom({ position: 'topright' }).addTo(map);
    },
    _onChange: function () {
        this.setState({
            markers: MapStore.all()
        });
    },
    render: function () {
        var style = {
            height: 200
        };
        return (
            <div>
                <div id='map' style={style}></div>
                <Markers map={this.map} markers={this.state.markers} />
            </div>
        );
    }
});

module.exports = Map;
