var RatioMixin = {
    ratio: function (ratio) {
        var width = this.props.width,
            height = this.props.height;

        ratio = ratio || this.props.ratio;

        if (ratio) {
            width = Math.floor(this.props.windowWidth / ratio * this.props.aspect_ratio);
            height = Math.floor(this.props.windowWidth / ratio);
            if (height > this.props.windowHeight) {
                height = this.props.windowHeight;
                width = Math.floor(height * this.props.aspect_ratio);
            }
        }

        return {
            width: width,
            height: height
        };
    }
};

module.exports = RatioMixin;
