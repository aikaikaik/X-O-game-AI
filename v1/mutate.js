var main = function(goodNets){
var compairAll = require('./mainScript.js');
var fs = require('fs');
var mutateNet = function(net){
  //var netNameToNet = function(netName){return JSON.parse(fs.readFileSync('./nets/'+netName+'.net.json'));};
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
  var newNet = mutate(net);
  newNet.name =  Math.floor(Math.random()*10000);
  //fs.writeFileSync('./nets/'+name+'.net.json',JSON.stringify(newNet));
  nets.push(newNet);
  //fs.writeFileSync('./nets.json',JSON.stringify(netNames));
};
var nets = [];
var nets = goodNets;
goodNets.forEach(function(val,i,arr){
  mutateNet(goodNets[i]);
});
var netData = compairAll(goodNets,nets,400);
//console.log(netData);
goodNets.forEach(function(val,i,arr){
  var min = 2;
  var minNet = {};
  for(var j in nets){
    var dObj = netData[val.name][nets[j].name];
    var dNum = dObj.me/dObj.gameNumber;
    if(dNum<min){min = dNum; minNet=nets[i];}
  }
  if(goodNets.indexOf(minNet)===-1){goodNets.push(minNet);}
});
if(goodNets.length>4){goodNets=goodNets.slice(Math.floor(goodNets.length/2));}
/*for(var goodNet in goodNets){
  fs.writeFileSync('./nets/'+goodNets[goodNet].name+'.net.json',JSON.stringify(goodNets[goodNet]));
}*/
//fs.writeFileSync('./nets.json',JSON.stringify(goodNets));
return goodNets;
};

if(module.parent){module.exports = main;}
