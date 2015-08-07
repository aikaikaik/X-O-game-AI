require('./niceLog.js');
var game = require('./game.js');
var rls = require('readline-sync');
var netToPlayer = require('./netXOplayer.js');
var nets = require('./nets.js');
var fs = require('fs');
var compPname = process.argv[2] || rls.question('computer player?: ');
var compP = netToPlayer(nets.netFromJSON(fs.readFileSync(compPname)));

game(compP,function(board){console.board(board);return {'x':rls.question('x: '),'y':rls.question('y: ')};},true,true);
