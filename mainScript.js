//run with node.js
require('./niceLog.js');
var game = require('./game.js');
var fs = require('fs');
var fromNetToFunc = require('./runNet.js');
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
  p1 = fromNetToFunc(JSON.parse(fs.readFileSync('./nets/'+strp1+'.net.json')));
  rl.question('p2 in on(same)?: ',function(strp2){
    p2 = fromNetToFunc(JSON.parse(fs.readFileSync('./nets/'+strp2+'.net.json')));
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
        console.log('X('+strp1+') won '+whoWonStats.X/gameNumber*100+'%');
        console.log('O('+strp2+') won '+whoWonStats.O/gameNumber*100+'%');
        console.log('\'twas a match '+whoWonStats['=']/gameNumber*100+'%');
        rl.close();
      });
    });
  });
});
