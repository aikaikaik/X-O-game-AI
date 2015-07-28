require('./niceLog.js');
var game = require('./game.js');

var fs = require('fs');

var fromNetToFunc = require('./runNet.js');

//readline
var rls = require('readline-sync');
var pfileNameToFunc = function(strp){return fromNetToFunc(JSON.parse(fs.readFileSync(strp)));};

var net = (process.argv.length>2)?pfileNameToFunc(process.argv[2]):pfileNameToFunc('./nets/'+rls.question('What net?: ')+'.net.json');

var user = function(b){

  console.board(b);

  return {'x':rls.question('x: '),'y':rls.question('y: ')};

};

game(net,user,true);
