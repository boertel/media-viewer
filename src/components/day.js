var React = require('react');

var BoxStore = require('../stores/BoxStore');
var actions = require('../actions');

var Images = require('./gallery');
var Text = require('./text');


var components = {
    images: Images,
    text: Text
};


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
    render: function () {
        var boxes = this.state.boxes.map(function (box, i) {
            var Component = components[box.type];
            return (
                <div>
                    <Component id={box.key} {...box.props} params={this.props.params} />
                </div>
            );
        }, this);

        return (
            <div>
                {boxes}
            </div>
        );
    }
});

module.exports = Day;
