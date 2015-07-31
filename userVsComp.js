require('./niceLog.js');
var game = require('./game.js');
var rls = require('readline-sync');
var netToPlayer = require('./netXOplayer.js');
var nets = require('./nets.js');
var fs = require('fs');

var compP = netToPlayer(nets.netFromJSON(fs.readFileSync(rls.question('computer player?: '))));

game(compP,function(board){console.board(board);return {'x':rls.question('x: '),'y':rls.question('y: ')};});
