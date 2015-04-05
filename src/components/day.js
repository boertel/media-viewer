var React = require('react');
var { RouteHandler } = require('react-router');

var BoxStore = require('../stores/BoxStore');
var actions = require('../actions');

var Loader = require('./loader');
var Viewer = require('./viewer');

// TODO circular dependency is causing issue
var components = require('./index');
components.Gallery = require('./gallery');


// TODO define propsType

var Day = React.createClass({
    mixins: [ BoxStore.listenTo ],
    getInitialState: function () {
        return {
            boxes: []
        };
    },
    componentDidMount: function () {
        actions.boxes(this.props.params.day);
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.params.day !== this.props.params.day) {
            actions.boxes(nextProps.params.day);
        }
    },
    _onChange: function () {
        this.setState({
            boxes: BoxStore.get(this.props.params.day)
        });
    },
    renderBoxes: function () {
        var boxes = this.state.boxes.map(function (box, i) {
            var Component = components[box.type];
            var key = 'box-' + i;
            return (
                <div key={key}>
                    <Component id={box.key} {...box.props} params={this.props.params} />
                </div>
            );
        }, this);
        return boxes;
    },
    render: function () {
        if (this.state.boxes === 'pending' || this.state.boxes.length === 0) {
            return <Loader />;
        }

        var boxes = this.renderBoxes();

        if (this.props.colors) {
            var style = {
                backgroundColor: this.props.colors[this.props.params.day]
            }
        }
        return (
            <div style={style}>
                {boxes}
                <RouteHandler {...this.props} />
            </div>
        );
    }
});

module.exports = Day;
