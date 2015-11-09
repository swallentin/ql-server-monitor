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

    if(this.servers[server.id]) {
        console.log('Already added server', server.id);
        return;
    }

    this.servers[server.id] = server;
    this.emit("SERVER_ADDED", server);
    this.on("rcon", function (message) {
        server.emit(message);
    });
    server.connect();
    var self = this;
    server.on("message", function (message)  {
        message = JSON.parse(message.toString());
        message.SERVER = server.getInformation();
        self.emit(message.TYPE, message);
    });
    return server.id;
};

ServerMonitor.prototype.rcon = function (id, command) {
    var server = this.get(id);
    if(server) {
        server.rcon(command);
    }
};

ServerMonitor.prototype.get = function (id) {
    return this.servers[id] ? this.servers[id] : null;
};

ServerMonitor.prototype.getIdByHostnameAndGameport = function(hostname, gameport) {
    var self = this,
        id = null;
    Object.keys(this.servers).forEach(function(key){
        var server = self.servers[key];
        if(server.hostname === hostname && server.gameport === gameport) {
            id = server.id;
        }
    });
    return id;
};

ServerMonitor.prototype.remove = function (id) {
    if (this.servers[id]) {
        this.servers[id].disconnect();
        this.emit("SERVER_REMOVED", this.servers[id]);
        delete this.servers[id];
    }
};

ServerMonitor.prototype.start = function (fn) {
    fn();
};

exports.create = function() {
    return new ServerMonitor();
};

