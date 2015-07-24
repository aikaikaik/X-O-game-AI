require('./niceLog.js');
var game = require('./game.js');
var fs = require('fs');
var fromNetToFunc = require('./runNet.js');
//readline
var rls = require('readline-sync');
var pnameToFunc = function(strp){return fromNetToFunc(JSON.parse(fs.readFileSync('./nets/'+strp+'.net.json')));};
var net = pnameToFunc(rls.question('What net?: '));
var user = function(b){
  return {'x':rls.question('x: '),'y':rls.question('y: ')};
};
game(net,user,true);
