var Dispatcher = require('flux').Dispatcher,
    xtend = require('xtend/mutable'),
    async = require('async');


var queue = async.queue(function (task, callback) {
    var payload = {
        source: task.source,
        action: task.action
    };
    AppDispatcher.dispatch(payload);
    callback();
}, 1); // only one worker, one event at a time


var AppDispatcher = xtend(new Dispatcher(), {
    handleServerAction: function (action) {
        queue.push({source : 'SERVER_ACTION', action : action});
    },
    handleViewAction: function (action) {
        queue.push({source: 'VIEW_ACTION', action : action});
    }
});

module.exports = AppDispatcher;
