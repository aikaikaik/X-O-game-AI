var readline = require('readline');
var fs = require('fs');
require('./niceLog.js');
var mutate = require('./mutate.js');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('how many times?: ',function(x){
  var goodNetNames = JSON.parse(fs.readFileSync('./goodNets.json'));
  var goodNets = [];
  goodNetNames.forEach(function(val,i,arr){
    goodNets.push(JSON.parse(fs.readFileSync('./nets/'+val+'.net.json')));
  });
  for(var i = 0; i < x; i++){
    console.count('startMutation');
    goodNets = mutate(goodNets);
    //console.log(goodNets);
    console.count('endMutation');
  }
  for(var goodNet in goodNets){
    fs.writeFileSync('./nets/'+goodNets[goodNet].name+'.net.json',JSON.stringify(goodNets[goodNet]));
  }
});
