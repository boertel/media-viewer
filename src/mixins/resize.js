module.exports = {
    getInitialState() {
        return {
            width: 0
        };
    },
    resize: function () {
        this.setState({
            width: this.getDOMNode().offsetWidth
        });
    },
    shouldComponentUpdate(nextProps, nextState) {
        //return nextState.width !== 0 && nextState.height !== 0;
        return true;
    },
    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize);
    },
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
};
