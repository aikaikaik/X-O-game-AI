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
rl.question('p1 is on (random, or firstOpen)?: ',function(strp1){
  p1 = require('./players/'+strp1+'.js');
  rl.question('p2 in on(same)?: ',function(strp2){
    p2 = require('./players/'+strp2+'.js');
    game(p1,p2);
    rl.close();
  });
});
