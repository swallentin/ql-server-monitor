var Server = require('./Server'),
    ServerMonitor,
    EventEmitter = require('events').EventEmitter,
    util = require('util');

ServerMonitor = function () {
    EventEmitter.call(this);
    var self = this;
    this.servers = {};
};

util.inherits(ServerMonitor, EventEmitter);

ServerMonitor.prototype.add = function (server) {

    if(this.servers[server.name]) {
        console.log('Already added server', server.name);
        return;
    }

    this.servers[server.name] = server;
    this.emit("SERVER_ADDED", server);
    server.connect();
    var self = this;
    server.on("message", function (message)  {
        message = JSON.parse(message.toString());
        message.SERVER = server.getInformation();
        self.emit(message.TYPE, message);
    });
};

ServerMonitor.prototype.remove = function (name) {
    if (this.servers[name]) {
        this.servers[name].disconnect();
        this.emit("SERVER_REMOVED", this.servers[name]);
        delete this.servers[name];
    }
};

ServerMonitor.prototype.start = function (fn) {
    fn();
};

exports.create = function() {
    return new ServerMonitor();
};

