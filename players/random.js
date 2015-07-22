var player_random = function(board){
  var data = board.getData();
  var simple_random = function(){
    return {'x':Math.floor(Math.random()*3),'y':Math.floor(Math.random()*3)};
  };
  var result = simple_random();
  console.change(result);
  if(data[result.x][result.y]===null){return result;}else{return player_random(board);}
};
module.exports = player_random;
