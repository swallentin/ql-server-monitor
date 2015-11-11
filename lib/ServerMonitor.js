var ServerMonitor,
    EventEmitter = require('events').EventEmitter,
    util = require('util');

ServerMonitor = function (log) {
    EventEmitter.call(this);
    this.servers = {};
    this.log = log || console;
};

util.inherits(ServerMonitor, EventEmitter);

ServerMonitor.prototype.add = function (server) {

    if(this.servers[server.id]) {
        this.log.info('Already added server', server.id);
        return;
    }

    this.servers[server.id] = server;
    this.emit("server:added", server);
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
        this.emit("server:removed", this.servers[id]);
        delete this.servers[id];
    }
};

exports.createMonitor = function(log) {
    return new ServerMonitor(log);
};

