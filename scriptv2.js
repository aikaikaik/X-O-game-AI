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
//main code
//compair parent & childs, return child fitness
var compair = function(n){
  return function(parent,child){
    var childData = 0;
    for(var i = 0; i < n; i++){
      var winnerAvatar = (i%2===0)?game(netToPlayer(parent),netToPlayer(child),true).whoWon():game(netToPlayer(child),netToPlayer(parent),false).whoWon();
      var childAvatar = 'O';
      if(winnerAvatar===childAvatar){childData++;}
    }
    return childData/n;
  };
}(100);
//gen
var gen = function(parent){
  //vars
  var childs = [];
  var childFitness = [];
  var bestChild;
  var bestChildIndex;
  var bestChildFitness = 0;
  //push childs
  for(var i = 0; i < mutationNum; i++){
    childs.push(parent.mutate(mutationRate,mutateFunc));
    childFitness.push(compair(parent,childs[i]));
  }
  //push parent
  childs.push(parent);
  childFitness.push(compair(parent,childs[mutationNum]));
  //get max
  childFitness.forEach(function(val,i,arr){if(val>bestChildFitness){bestChildIndex=i;bestChildFitness=val;}});
  bestChild = childs[bestChildIndex];
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
for(var i = 0; i < genNumber; i++){
  mainNet = gen(mainNet);
  if(i%60===0){console.log(i);}
  if(i%saveEvery===0){saveToFile(mainNet,i);}
}
saveToFile(mainNet,genNumber-1);
