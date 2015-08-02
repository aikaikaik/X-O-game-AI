//require
var nets = require('./nets.js');
var rls = require('readline-sync');
//require('./niceLog.js');
var compair = require('./compair.js');
var netToPlayer = require('./netXOplayer.js');
var fs = require('fs');

//varibles
var mutationRate = 0.2;
var hiddenLayerLen = 18;
var poolLen = 6;
var genNumber = rls.question('How many gens?: ');
var id = Math.floor(Math.random()*1000);
var saveEvery = Math.pow(12,4);

//setup
var net = nets.makeNet([18,hiddenLayerLen,9],function(){return Math.floor(Math.random()*10)/10;});
var pool = [];
for(var i = 0;  i < poolLen; i++){pool.push(net);}

var gen = function(){
  var randomIndex = function(other){var a = Math.floor(Math.random()*pool.length);if(a===other){return randomIndex(other);}else{return a;}};
  var p1index = randomIndex(NaN);
  var p2index = randomIndex(p1index);
  var betterPindex = compair([p1index,p2index].map(function(val){return netToPlayer(pool[val]);}),[p1index,p2index],100);
  var worsePindex = (betterPindex===p1index)?p2index:p1index;
  pool[worsePindex] = pool[betterPindex].mutate(mutationRate,function(val){return val+Math.floor((Math.random()*0.75-0.375)*100)/100;});
};

var main = function(){
  for(var i = 0; i < genNumber; i++){
    if(i%12===0){console.log('beginning generation number '+i);}
    gen();
    if(i%saveEvery===0){console.log('file Save');saveToFile(i);}
  }
  console.log('end of gens');
  saveToFile(i);
  console.log('end');
};

var saveToFile = function(i){
  var dirName = './run'+id+'/gen'+i;
  fs.mkdirSync(dirName);
  for(var i = 0; i < pool.length; i++){
    fs.writeFileSync(dirName+'/'+i+'.net.json',JSON.stringify(pool[i]));
  }
};

//run main
fs.mkdirSync('./run'+id);
main();
