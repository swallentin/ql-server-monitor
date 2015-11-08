var serverMonitor = require('../lib/ServerMonitor').create(),
    Server = require('../lib/Server');

serverMonitor.add(Server.create({
    "name": "ql-sth-01 #1",
    "hostname": "5.150.254.201",
    "gameport": 27960,
    "rcon_port": 28960,
    "rcon_password": "",
    "stats_port": 27960,
    "stats_password": ""
}));