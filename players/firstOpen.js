var fromNumToChange = function(num){
  return {'x':Math.floor(num/3),'y':num-Math.floor(num/3)};
};
var thePlayer = function(board,num){
  var data = board.getData();
  var result = fromNumToChange(num);
  if(data[result.x][result.y]===null){return result;}else{return thePlayer(board,num+1);}
};
module.exports = function(board){return thePlayer(board,0);};
