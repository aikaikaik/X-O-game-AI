//require
var nets = require('./nets.js');
var rls = require('readline-sync');
require('./niceLog.js');
var game = require('./game.js');
var netToPlayer = require('./netXOplayer.js');
var fs = require('fs');

//varibles
var mutationRate = 0.1;
var hiddenLayerLen = 18;
var mutationNum = 3;
var genNumber = rls.question('How many gens?: ');
var id = Math.floor(Math.random()*1000);
var saveEvery = Math.pow(12,4);
var mutateFunc = function(val){
  var r = Math.random()*2-1;
  if(Math.random()<(1/(1+r*r)-0.4)){
    return r+val;
  }else{
    return mutateFunc(val);
  }
};
var mainNet = nets.makeNet([18,hiddenLayerLen,9],function(){return Math.random()*2-1;});
var randomPlayer = function(b){
  var result = {'x':Math.floor(Math.random()*3),'y':Math.floor(Math.random()*3)};
  if(b.getData()[result.x][result.y]===null){
    return result;
  }else{
    return randomPlayer(b);
  }
};
//main code
//compair parent & childs, return child fitness
var compair = function(n){
  return function(player,child){
    var childData = 0;
    var winnerAvatar = '';
    for(var i = 0; i < n; i++){
      winnerAvatar = (i%2===0)?game(player,netToPlayer(child),true).whoWon():game(netToPlayer(child),player,false).whoWon();
      if(winnerAvatar!=='X'){childData++;}
    }
    return (childData/n);
  };
}(500);
//gen
var gen = function(parentNet,player){
  //vars
  var childs = [];
  var childFitness = [];
  var bestChild;
  var bestChildIndex;
  var bestChildFitness = 0;
  //push childs
  for(var j = 0; j < mutationNum; j++){
    childs.push(parentNet.mutate(mutationRate,mutateFunc));
    childFitness.push(compair(player,childs[j]));
  }
  //push parent
  childs.push(parentNet);
  childFitness.push(compair(player,childs[mutationNum]));
  //get max
  childFitness.forEach(function(val,i,arr){if(val>bestChildFitness){bestChildIndex=i;bestChildFitness=val;}});
  bestChild = childs[bestChildIndex];
  dataObj.push([i,bestChildFitness]);
  //return max
  return bestChild;
};

//runnning code
//save to file
var saveToFile = function(net,i){
  var fileName = './v2.5_nets/run'+id+'/gen'+i+'.json';
  fs.writeFileSync(fileName,JSON.stringify(net));
};
//run
fs.mkdirSync('./v2.5_nets/run'+id);
fs.writeFileSync('./v2.5_nets/run'+id+'/data.json','[]');
var dataObj = [];
for(var i = 0; i < genNumber; i++){
  mainNet = gen(mainNet,randomPlayer);
  if(i%60===0){console.log(i);}
  if(i%saveEvery===0){saveToFile(mainNet,i);}
  if(i%288===0){
    fs.writeFileSync('./v2.5_nets/run'+id+'/data.json',JSON.stringify(dataObj));
  }
}
saveToFile(mainNet,genNumber-1);
