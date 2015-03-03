var React = require('react');

var BoxStore = require('../stores/BoxStore');
var actions = require('../actions');

var Viewer = require('./viewer');
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
    renderBoxes: function () {
        var boxes = this.state.boxes.map(function (box, i) {
            var Component = components[box.type];
            return (
                <div>
                    <Component id={box.key} {...box.props} params={this.props.params} />
                </div>
            );
        }, this);
        return boxes;
    },
    renderViewer: function () {
        var viewer;

        var pictures = this.state.boxes.filter(function (box) {
            return box.type === 'images';
        }).map(function (box) {
            return box.props.pictures;
        })
        if (pictures.length > 0) {
            pictures = pictures.reduce(function (a, b) {
                return a.concat(b);
            });

            if (this.props.params.index) {
                viewer = (
                    <Viewer params={this.props.params} pictures={pictures} />
                );
            }
        }
        return viewer;
    },
    render: function () {
        var boxes = this.renderBoxes();
        var viewer = this.renderViewer();

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
