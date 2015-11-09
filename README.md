A simple and minimalistic server monitor and management for Quake Live Dedicated Server.

```js
var ServerMonitor = require('ql-server-monitor');
	Server = ServerMonitor.Server;


var monitor = ServerMonitor.create();
monitor.add(Server.create({
    name: 'ql-sth-01 #1 #topdog.io',
    hostname: '5.150.254.201',
    gameport: 27960,
    rcon_port: 28960,
    rcon_password: '',
    stats_port: 27960,
    stats_password: ''
}));
[
    'PLAYER_CONNECT',
    'PLAYER_DISCONNECT',
    'PLAYER_SWITCHTEAM',
    'PLAYER_MEDAL',
    'PLAYER_DEATH',
    'MATCH_STARTED',
    'ROUND_OVER',
    'PLAYER_STATS',
    'MATCH_REPORT'
].forEach(function (event) {
    serverMonitor.on(event, function (data) {
        console.log(data);
    });
});
```

# Installation
```
$ npm install ql-server-monitor
```

# Features
* Monitor multiple servers for all statistics events emitted from Quake Live DS ZMQ.

# Upcoming features
* Support for monitoring and emitting RCON events using Quake Live DS Rcon zmq feature.
* Unit-tests
* Loading server settings from .json configuration file
* Simplyfied usage of library
* Improve server monitoring stability, re-connect/retry when connections fail, notifications on connection success and fails, configurable retry/reconnect settings.
* Ability to create server networks and/or group servers by tag in order to issue Rcon commands selectivly.