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
  if(boardWeights[0][0] !== boardWeights[0][0]){boardWeights = [[1,1,1],[1,1,1],[1,1,1]];}
  var sum = boardWeights.reduce(function(pval,val,i,arr){
    return pval+val.reduce(function(pval2,val2,i2,arr2){
      return (data[i][i2]===null)?pval2+val2:pval2
    },0);
  },0);
  var weight_sum = 0;
  var randomNum = Math.random()*sum;
  for(var x = 0; x < 3; x++){
    for(var y = 0; y < 3; y++){
      if(data[x][y]===null){
        weight_sum += boardWeights[x][y];
        //console.board({getData:function(){return boardWeights;}});
        //console.log('x:'+x+', y'+y+', weight_sum:'+weight_sum+', randomNum:'+randomNum+', sum:'+sum);
        if (randomNum <= weight_sum) {
          return {'x':x,'y':y};
        }
      }
    }
  }
};

module.exports = function(network){
  return function(board){
    var data = board.getData();
    return getRandomSq(data,getProbBoard(network,getNodeVals(data,network)));
  };
};
