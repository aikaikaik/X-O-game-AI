var game = require('./game.js');
var getPlayerIndex = function(isXfirst,avatar){return ((avatar==='X'&&isXfirst)||(avatar==='O'&&!isXfirst));};
module.exports = function(funcsArr,funcNamesArr,gameNumber){
  var data = [0,0];
  for(var i = 0; i < gameNumber; i++){
    var winnerAvatar = game(funcsArr[0],funcsArr[1],i%2===0).whoWon();
    if(winnerAvatar==='X'||winnerAvatar==='O'){data[getPlayerIndex(i%2===0,winnerAvatar)]++;}
  }
  if(data[0]>data[1]){return funcNamesArr[0];}else{return funcNamesArr[1];}
};
