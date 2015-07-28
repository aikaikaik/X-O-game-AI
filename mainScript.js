//run with node.js
require('./niceLog.js');
var game = require('./game.js');
var fs = require('fs');
var fromNetToFunc = require('./runNet.js');
//var pnameToFunc = function(strp){return fromNetToFunc(JSON.parse(fs.readFileSync('./nets/'+strp+'.net.json')));};

var compair = function(p1,p2,p1func,p2func,gameNumber,netData){
    //set up statistics numbers
    var gameEndBoards = [];
    var whoWonStats = {'X':0,'O':0,'=':0};
      //do the games
      for(var i = 0; i < gameNumber; i++){
        gameEndBoards.push(game(fromNetToFunc(p1),fromNetToFunc(p2),(i/2===Math.floor(i/2))?true:false));
        whoWonStats[gameEndBoards[i].whoWon()]++;
      }
      //console.log('X won '+whoWonStats.X/gameNumber*100+'%');
      //console.log('O won '+whoWonStats.O/gameNumber*100+'%');
      //console.log('\'twas a match '+whoWonStats['=']/gameNumber*100+'%');
      if(gameNumber%2===0){
        netData[p1.name] = netData[p1.name] || {};
        netData[p1.name][p2.name] = netData[p1.name][p2.name] || {'gameNumber':0.0,'me':0.0,'it':0.0,'=':0.0};
        netData[p1.name][p2.name].gameNumber += parseInt(gameNumber);
        netData[p1.name][p2.name].me+= parseInt(whoWonStats.X);
        netData[p1.name][p2.name].it   += parseInt(whoWonStats.O);
        netData[p1.name][p2.name]['=']+= parseInt(whoWonStats['=']);
      }
      return netData;
};

var theThing = function(playersa,playersb,gameNumber){
  var netData = {};
  for(var a in playersa){
    for(var b in playersb){
      netData = compair(playersa[a],playersb[b],fromNetToFunc(playersa[a]),fromNetToFunc(playersb[b]),gameNumber,netData);
    }
  }
  return netData;
};

module.exports = theThing;
