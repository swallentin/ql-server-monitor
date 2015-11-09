var zmq = require('zmq'),
    uuid = require('uuid'),
    Server = function(settings) {
        this.id = uuid.v4();
        this.name = settings.name;
        this.hostname = settings.hostname;
        this.gameport = settings.gameport;

        this.rcon_port = settings.rcon_port;
        this.rcon_password = settings.rcon_password;
        this.rcon_socket = zmq.socket('dealer');

        this.stats_port = settings.stats_port;
        this.stats_password = settings.stats_password;
        this.stats_socket = zmq.socket('sub');
    };

Server.prototype.makeConnectionString = function (port) {
    return ['tcp://', this.hostname, ':', port].join('');
};

Server.prototype.connect = function () {

    if(this.rcon_password && this.rcon_password !== '') {
        this.rcon_socket.plain_username = 'rcon';
        this.rcon_socket.plain_password = this.rcon_password;
    }

    this.rcon_socket.connect(this.makeConnectionString(this.rcon_port));
    console.log("Rcon push connected to:", this.makeConnectionString(this.rcon_port), this.name);

    this.rcon_socket.send('say hello');

    if(this.stats_password && this.stats_password !== "") {
        this.stats_socket.plain_username = 'stats';
        this.stats_socket.plain_password =  this.stats_password;
    }
    this.stats_socket.connect(this.makeConnectionString(this.stats_port));
    this.stats_socket.subscribe('');

    console.log("Stats subscriber connected to:", this.makeConnectionString(this.stats_port), this.name);
};
Server.prototype.getInformation = function() {
  return {
      name: this.name,
      hostname: this.hostname,
      gameport: this.gameport
  };
};

Server.prototype.disconnect = function () {

    this.stats_socket.disconnect(this.makeConnectionString(this.rcon_port));
    console.log("Disconnected from", this.makeConnectionString(this.rcon_port), this.name);



    this.stats_socket.disconnect(this.makeConnectionString(this.stats_port));
    console.log("Unsubscribing from", this.makeConnectionString(this.stats_port), this.name);

};

Server.prototype.rcon = function (command) {
    this.rcon_socket.send(command);
};

Server.prototype.on = function(event, fn) {
    this.stats_socket.on(event, fn)
};

exports.create = function (settings) {
    return new Server(settings);
};
