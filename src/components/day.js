var React = require('react');

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
        actions.boxes();
    },
    _onChange: function () {
        this.setState({
            boxes: BoxStore.all()
        });
    },
    renderBoxes: function () {
        var boxes = this.state.boxes.map(function (box, i) {
            var Component = components[box.type];
            return (
                <div>
                    <Component id={box.key} key={box.key} {...box.props} params={this.props.params} />
                </div>
            );
        }, this);
        return boxes;
    },
    render: function () {
        if (this.state.boxes.length === 0) {
            return <Loader />;
        }

        var boxes = this.renderBoxes();
        // TODO Viewer needs to be close to document.body to avoid wrappers position relative
        var viewer = <Viewer params={this.props.params} />

        return (
            <div>
                <div>
                    {boxes}
                </div>
                <div>
                    {viewer}
                </div>
            </div>
        );
    }
});

module.exports = Day;
