var React = require('react');


var Text = React.createClass({
    render: function () {
        var title, subtitle, text;
        if (this.props.title) {
            title = <h2>{this.props.title}</h2>;
        }
        if (this.props.subtitle) {
            subtitle = <h3>{this.props.subtitle}</h3>;
        }
        if (this.props.text) {
            text = <p>{this.props.text}</p>;
        }
        return (
            <div>
                {title}
                {subtitle}
                {text}
            </div>
        );
    }
});

module.exports = Text;
