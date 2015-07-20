//run with node.js
require('./niceLog.js');
var game = require('./game.js');
//players
var p1 = require('./player-random');
var p2 = require('./player-random');

game(p1,p2);
