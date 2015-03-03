var ResizeMixin = {
    getInitialState() {
        return {
            windowWidth: 0,
            windowHeight: 0
        };
    },
    resize: function () {
        var node = this.getDOMNode();
        this.setState({
            windowWidth: node.offsetWidth,
            windowHeight: window.innerHeight
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

module.exports = ResizeMixin;
