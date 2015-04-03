function Sizes (args) {
    for (var key in args) {
        var value = args[key];
        this[key] = value;
        this[key].aspect_ratio = value.width / value.height;
    }
}

Sizes.flexibility = 1.1;

Sizes.prototype.toArray = function () {
    var array = [];
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            array.push(this[key]);
        }
    }

    return array.sort(function (a, b) {
        return a.width > b.width;
    });
};

Sizes.prototype.closest = function (width, height) {
    var choosenOne = this.original,
        flexibility = Sizes.flexibility;

    var array = this.toArray();

    for (var i = 0; i < array.length - 1; i += 1) {
        var current = array[i],
            next = array[i + 1];
        if (current.width * flexibility >= width && width < next.width) {
            return current;
        }
    }

    return choosenOne;
};

function Photo (args) {
    for (var key in args) {
        this[key] = args[key];
    }

    if (this.sizes) {
        this.sizes = new Sizes(this.sizes);

        this.width = this.sizes.original.width;
        this.height = this.sizes.original.height;
        this.src = this.sizes.original.src;
        this.aspect_ratio = this.sizes.original.aspect_ratio;
    }
}


module.exports = Photo;
