var React = require('react');
var { Link } = require('react-router');

var Timeline = React.createClass({
    propTypes: {
        length: React.PropTypes.number.isRequired
    },
    render: function () {
        var days = [];
        for (var i = 1; i <= this.props.length; i += 1) {
            var className = 'day',
                style = {};
            if ('colors' in this.props) {
                style = {
                    backgroundColor: this.props.colors[i - 1]
                };
            }
            days.push(
                <li key={i} className={className}>
                    <Link to='day' params={{trip: this.props.params.trip, day: i}} style={style}>{i}</Link>
                </li>
            );
        }

        return (
            <ul className='timeline'>
                <li>Days</li>
                {days}
            </ul>
        );
    }
});

module.exports = Timeline;
