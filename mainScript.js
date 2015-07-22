//run with node.js
require('./niceLog.js');
var game = require('./game.js');
//readline
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
//players
var p1;
var p2;
rl.question('p1 is on (e.g. "./player-random.js")?: ',function(strp1){
  p1 = require(strp1);
  rl.question('p2 in on(same)?: ',function(strp2){
    p2 = require(strp2);
    game(p1,p2);
    rl.close();
  });
});
