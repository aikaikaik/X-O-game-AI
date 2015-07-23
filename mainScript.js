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
var pnameToFunc = function(strp){return fromNetToFunc(JSON.parse(fs.readFileSync('./nets/'+strp+'.net.json')));};

var compair = function(p1,p2,strp1,strp2,gameNumber){
    //set up statistics numbers
    var gameEndBoards = [];
    var whoWonStats = {'X':0,'O':0,'=':0};
      //do the games
      for(var i = 0; i < gameNumber; i++){
        gameEndBoards.push(game(p1,p2,(i/2===Math.floor(i/2))?true:false));
        whoWonStats[gameEndBoards[i].whoWon()]++;
      }
      console.log('X won '+whoWonStats.X/gameNumber*100+'%');
      console.log('O won '+whoWonStats.O/gameNumber*100+'%');
      console.log('\'twas a match '+whoWonStats['=']/gameNumber*100+'%');
      if(gameNumber%2===0){
        var netData = JSON.parse(fs.readFileSync('./netData.json'));
        netData[strp1] = netData[strp1] || {};
        netData[strp1][strp2] = netData[strp1][strp2] || {'gameNumber':0.0,'me':0.0,'it':0.0,'=':0.0};
        netData[strp1][strp2].gameNumber += parseInt(gameNumber);
        netData[strp1][strp2].me+= parseInt(whoWonStats.X);
        netData[strp1][strp2].it   += parseInt(whoWonStats.O);
        netData[strp1][strp2]['=']+= parseInt(whoWonStats['=']);
        fs.writeFileSync('./netData.json',JSON.stringify(netData));
      }
};

var theThing = function(players,gameNumber){
  for(var a in players){
    for(var b in players){
      compair(pnameToFunc(players[a]),pnameToFunc(players[b]),players[a],players[b],gameNumber);
    }
  }
};

if(module.parent){module.exports = theThing;}else{rl.question('how many times?: ',function(gameNumber){theThing(['random','firstOpen','normal'],gameNumber);rl.close();});}
