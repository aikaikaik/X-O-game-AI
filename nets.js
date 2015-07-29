//Net is the prototype of the nets;
//the `this` key word will refere to the net
var Net = [];
Net.run = function(){

};
Net.mutate = function(mutationRate){

};
module.exports.Net = Net;
module.exports.makeNet = function(layerLens,makeFunc){
  var net = [];
  var makePerceptron = function(lena,lenb){
    var perceptron = [];
    for(var a = 0; a < lena+1; a++){
      perceptron[a]=[];
      for(var b = 0; b < lenb; b++){
        perceptron[a][b]=makeFunc();
      }
    }
    return perceptron;
  };
  for(var i = 0; i < layerLens.length-1; i++){
    net.push(makePerceptron(layerLens[i],layerLens[i+1]));
  }
  net.prototype = Net;
  net.__proto__ = net.prototype;
  return net;
};
