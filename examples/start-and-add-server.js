var monitor = require('../lib/ServerMonitor').create(),
    Server = require('../lib/Server'),
    serverGUID = monitor.add(Server.create({
        name: 'My Server',
        hostname: '10.0.1.15',
        gameport: 27960,
        rcon_port: 28960,
        rcon_password: 'rcon',
        stats_port: 27960,
        stats_password: 'stats'
    }));

serverGUID = monitor.getIdByHostnameAndGameport('10.0.1.15', 27960);

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

monitor.rcon(serverGUID, 'map cure');

