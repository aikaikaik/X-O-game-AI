var compairAll = require('./mainScript.js');
var fs = require('fs');
var mutateNetFile = function(netName){
  var netNameToNet = function(netName){return JSON.parse(fs.readFileSync('./nets/'+netName+'.net.json'));};
  var mutate = function(network){
    if(Math.random()<0.2){var id = Math.floor(Math.random()*network.edges.length);network.edges.push(network.edges[id]); return network;}
    if(Math.random()<0.2){var id = Math.floor(Math.random()*network.edges.length);network.edges.splice(id, 1); return network;}
    if(Math.random()<0.2){var id = Math.floor(Math.random()*network.edges.length);network.edges[id].lightOn.x=Math.floor(Math.random()*3);network.edges[id].lightOn.y=Math.floor(Math.random()*3); return network;}

    if(Math.random()<0.2){var id1 = Math.floor(Math.random()*network.nodes.length);var id2 = Math.floor(Math.random()*network.nodes.length);network.nodes[id1]=network.nodes[id2]; return network;}
    if(Math.random()<0.2){var id = Math.floor(Math.random()*network.nodes.length);for(var i = 0; i < 9; i++){network.nodes[id][Math.floor(i/3)][i%3]=1-network.nodes[id][Math.floor(i/3)][i%3];}return network;}
    if(Math.random()<0.2){var id = Math.floor(Math.random()*network.nodes.length);for(var i = 0; i < 9; i++){network.nodes[id][Math.floor(i/3)][i%3]=(0.1111+network.nodes[id][Math.floor(i/3)][i%3])/2;}return network;}
    if(Math.random()<0.2){var id = Math.floor(Math.random()*network.nodes.length);var newId = network.nodes.length; network.nodes.push(network.nodes[id]); for(var i = 0; i < network.edges.length; i++){var edge = network.edges[i]; if(edge.val===id){edge.lightNodeNum=newid; network.edges.push(edge);}}; return network;}
    return network;
  };
  var name = netName+Math.floor(Math.random()*10000);
  var newNet = mutate(netNameToNet(netName));
  fs.writeFileSync('./nets/'+name+'.net.json',JSON.stringify(newNet));
  netNames.push(name);
  fs.writeFileSync('./nets.json',JSON.stringify(netNames));
};
var netNames = JSON.parse(fs.readFileSync('nets.json'));
var goodNets = JSON.parse(fs.readFileSync('goodNets.json'));
goodNets.forEach(function(val,i,arr){
  mutateNetFile(val);
});
fs.writeFileSync('./netData.json',JSON.stringify({}));
compairAll(goodNets,netNames,400);
var netData = JSON.parse(fs.readFileSync('netData.json'));
goodNets.forEach(function(val,i,arr){
  var min = 2;
  var minNetName = '';
  for(var i in netNames){
    var dObj = netData[val][netNames[i]];
    var dNum = dObj.me/dObj.gameNumber;
    if(dNum<min){min = dNum; minNetName=netNames[i];}
  }
  if(goodNets.indexOf(minNetName)===-1){goodNets.push(minNetName);}
});
fs.writeFileSync('./goodNets.json',JSON.stringify(goodNets));
