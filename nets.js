//Perceptron is the prototype of the perceptrons;
//the `this` key word will refere to the perceptron
var Perceptron = [];
// input layer -> output layer
Perceptron.run = function(inputLayer){
  var sigmoid = function(x){return 1/(1+Math.pow(Math.E,-x));};
  var outputLen = this[0].length;
  var inputLen = this.length;
  var result = [];
  console.assert(this.length===inputLayer.length,'bad data: this.length: '+this.length+'while inputLayer.length: '+inputLayer.length);
  for(var i = 0; i < outputLen; i++){
    var sum = this.reduce(function(pval,val,j,arr){return pval+val[i]*inputLayer[i];},0);
    result[i] = sigmoid(sum);
  }
  return result;
};
// mutationRate -> mutated net
Perceptron.mutate = function(mutationRate,mutationFunc){
  var result = this;
  for(var i = 0; i < this.length; i++){
    for(var j = 0; j < this[i].length; j++){
      if(Math.random()<mutationRate){result[i][j] = mutationFunc(this[i][j]);}
    }
  }
  return result;
};
var makePerceptron = function(lena,lenb,makeFunc){
  var perceptron = [];
  for(var a = 0; a < lena+1; a++){
    perceptron[a]=[];
    for(var b = 0; b < lenb; b++){
      perceptron[a][b]=makeFunc();
    }
  }
  perceptron.prototype = Perceptron;
  perceptron.__proto__ = perceptron.prototype;
  return perceptron;
};

//Net is the prototype of the nets;
//the `this` key word will refere to the net
var Net = [];
// input layer -> output layer
Net.run = function(inputLayer){
  var currentLayer = inputLayer;
  for(var i = 0; i < this.length; i++){
    currentLayer.push(-1);
    currentLayer = this[i].run(currentLayer);
  }
  return currentLayer;
};
// mutationRate -> mutated net
Net.mutate = function(mutationRate,mutationFunc){
  var result = this;
  for(var i = 0; i < this.length; i++){
    result[i] = this[i].mutate(mutationRate,mutationFunc);
  }
  return result;
};
module.exports.makeNet = function(layerLens,makeFunc){
  var net = [];
  for(var i = 0; i < layerLens.length-1; i++){
    net.push(makePerceptron(layerLens[i],layerLens[i+1],makeFunc));
  }
  net.prototype = Net;
  net.__proto__ = net.prototype;
  return net;
};
