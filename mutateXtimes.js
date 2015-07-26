var readline = require('readline');
require('./niceLog.js');
var mutate = require('./mutate.js');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('how many times?: ',function(x){
  for(var i = 0; i < x; i++){
    console.count('startMutation');
    mutate();
    console.count('endMutation');
  }
});
