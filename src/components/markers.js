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
        // when unmounting markers, markers will reach 0
        if (!this.props.map || this.props.markers.length == 0) {
            return null;
        }
        var components = [];
        var markers = this.props.markers.map(function (marker) {
            marker.color = this.props.color;
            var m = this.createMarker(marker);
            components.push(<Marker map={this.props.map} marker={m} />)
            return m;
        }, this);

        var group = L.featureGroup(markers);
        this.props.map.fitBounds(group.getBounds(), {maxZoom: 14});

        return <div>{components}</div>;
    }
});

module.exports = Markers;
