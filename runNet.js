var getNodeVals = function(data,network){
  var nodeVals = [];
  var sum = 0;
  for(var node in network.nodes){
    nodeVals.push(0);
  }
  for(var edgeNum = 0; edgeNum< network.edges.length; edgeNum++){
    var edge  = network.edges[edgeNum];
    if(data[edge.lightOn.x][edge.lightOn.y]===edge.lightOn.val){
      nodeVals[edge.lightNodeNum]++;
      sum++;
    }
  }
  for(var nodeNum = 0; nodeNum < network.nodes.length; nodeNum++){
    nodeVals[nodeNum]=nodeVals[nodeNum]/sum;
  }
  return nodeVals;
};

var getProbBoard = function(network,nodeVals){
  var probBoard = [
    [0,0,0]
    ,[0,0,0]
    ,[0,0,0]
  ];
  for(var i = 0; i<9; i++){
    for(var nodeNum = 0; nodeNum < network.nodes.length; nodeNum++){
      probBoard[Math.floor(i/3)][i%3]+=network.nodes[nodeNum][Math.floor(i/3)][i%3]*nodeVals[nodeNum];
    }
  }
  return probBoard;
}

var getRandomSq = function(data,boardWeights) {
  var result = {'x':Math.floor(Math.random()*3),'y':Math.floor(Math.random()*3)};
  var random = Math.random();
  if(random<boardWeights[result.x][result.y] && data[result.x][result.y]===null){return result;}else{return getRandomSq(data,boardWeights);}
}

module.exports = function(network){
  return function(board){
    var data = board.getData();
    return getRandomSq(data,getProbBoard(network,getNodeVals(data,network)));
  };
};
