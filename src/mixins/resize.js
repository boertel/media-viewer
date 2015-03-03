module.exports = {
    getInitialState() {
        return {
            windowWidth: 0
        };
    },
    resize: function () {
        this.setState({
            windowWidth: this.getDOMNode().offsetWidth
        });
    },
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.windowWidth !== 0 && nextState.windowHeight !== 0;
    },
    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize);
    },
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
};
