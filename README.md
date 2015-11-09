A simple and minimalistic server monitor and management for Quake Live Dedicated Server.

```js
var ServerMonitor = require('ql-server-monitor'),
	Server = ServerMonitor.Server,
	monitor = ServerMonitor.create();

var id = monitor.add(Server.create({
	name: 'chucksus',
	hostname: '10.0.1.15',
	gameport: 27960,
	rcon_port: 28960,
	rcon_password: 'rcon',
	stats_port: 27960,
	stats_password: 'stats'
}));

id = monitor.getIdByHostnameAndGameport('10.0.1.15', 27960);

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
	monitor.on(event, function (data) {
		console.log(data.TYPE);
	});
});

monitor.rcon(id, 'map cure');
```

# Installation
```
$ npm install ql-server-monitor
```

# Features
* Monitor multiple servers for all statistics events emitted from Quake Live zmq stats publisher.
* Support for emitting RCON commands to monitored servers.

# Upcoming features
* Unit-tests
* Loading server settings from .json configuration file
* Simplyfied usage of library
* Improve server monitoring stability, re-connect/retry when connections fail, notifications on connection success and fails, configurable retry/reconnect settings.
* Ability to create server networks and/or group servers by tag in order to issue Rcon commands selectivly.