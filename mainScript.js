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
    //how meny times?
    rl.question('how many games do you want?: ',function(gameNumber){
      //set up statistics numbers
      var gameEndBoards = [];
      var whoWonStats = {'X':0,'O':0,'=':0};
      rl.question('do you want to replace who\'s first and who\'s last player?("no" for no, and anything else for yes): ',function(toRepStr){
        var toRepBool = (toRepStr==='no')?false:true;
        //do the games
        for(var i = 0; i < gameNumber; i++){
          gameEndBoards.push(game(p1,p2,(!toRepBool || i/2===Math.floor(i/2))?true:false));
          whoWonStats[gameEndBoards[i].whoWon()]++;
        }
        console.log('X(p1) won '+whoWonStats.X/gameNumber*100+'%');
        console.log('O(p2) won '+whoWonStats.O/gameNumber*100+'%');
        console.log('\'twas a match '+whoWonStats['=']/gameNumber*100+'%');
        rl.close();
      });
    });
  });
});
