var EventEmitter = require('events').EventEmitter,
    xtend = require('xtend');

module.exports = function (options) {
    var CHANGE_EVENT = 'change';
    var events = {
        emitChange(actionType, d) {
            this.emit(CHANGE_EVENT, actionType, d);
        },
        addChangeListener(callback) {
            this.on(CHANGE_EVENT, callback);
        },
        removeChangeListener(callback) {
            this.off(CHANGE_EVENT, callback);
        },
        listenTo: {
            componentWillMount() {
                store.addChangeListener(this._onChange);
            },
            componentDidUnmount() {
                store.removeChangeListener(this._onChange);
            }
        }
    };

    var store = xtend(EventEmitter.prototype, xtend(options, events));
    return store;
};
