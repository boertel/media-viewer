var React = require('react');

var Marker = require('./marker');

var Markers = React.createClass({
    getInitialState: function () {
        return {
            markers: []
        };
    },
    createMarker: function (marker) {
        return L.mapbox.featureLayer({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: marker.coordinates
            },
            properties: {
                title: marker.title,
                description: marker.description,
                'marker-size': marker.size,
                'marker-color': marker.color,
                'marker-symbol': marker.symbol
            }
        })
    },
    render: function () {
        if (!this.props.map) {
            return null;
        }
        var markers = this.props.markers.map(function (marker) {
            var m = this.createMarker(marker);
            <Marker map={this.props.map} marker={m} />
            return m;
        }, this);

        //var group = L.featureGroup(markers);
        //this.props.map.fitBounds(group.getBounds(), {maxZoom: 14});

        return null;
    }
});

module.exports = Markers;
