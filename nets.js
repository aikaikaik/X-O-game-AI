//Perceptron is the prototype of the perceptrons;
//the `this` key word will refere to the perceptron
var Perceptron = [];
// input layer -> output layer
Perceptron.run = function(inputLayer){

};
// mutationRate -> mutated net
Perceptron.mutate = function(mutationRate){

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

};
// mutationRate -> mutated net
Net.mutate = function(mutationRate){

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
