var boardToInput = function(board){
  var result = [];
  for(var i = 0; i < 9; i++){
    result.push((board[Math.floor(i/3)][i%3]==='me')?1:0);
  }
  for(var i = 0; i < 9; i++){
    result.push((board[Math.floor(i/3)][i%3]==='it')?1:0);
  }
  return result;
};
var onlyNull = function(output,board){
  var result = output;
  for(var i = 0; i < 9; i++){
    if(board[Math.floor(i/3)][i%3]!==null){result[i]=0;}
  }
  return result;
};
var outputToChange = function(output){
  var sum = output.reduce(function(pval,val,i,arr){return pval+val},0);
  var randomNum = Math.random()*sum;
  var sumLoop = 0;
  for(var i  = 0; i < output.length; i++){
    sumLoop += output[i];
    if(randomNum <= sumLoop){return {'x':Math.floor(i/3),'y':i%3};}
  }
};
var isAll = function(array,val){
  for(var i = 0; i < array.length; i++){
    if(array[i]!==val){return false;}
  }
  return true;
};
module.exports = function(net){
  return function(board){
    var boardData = board.getData();
    var output = onlyNull(net.run(boardToInput(boardData)),boardData);
    if(isAll(output,0)){output=onlyNull([1,1,1,1,1,1,1,1,1],boardData);}
    return outputToChange(output);
  }
};
