console = console || {'log':function(a){alert(a);}};
console.board = function(board){
  var text = '';
  var d=board.getData();
  for(var row = 0; row<d.length; row++){
    for(var sq = 0; sq<d[row].length; sq++){
      if(d[row][sq]===null){text+='-';}else{text+=d[row][sq];}
    }
    text+='\n';
  }
  console.log(text);
};
console.change = function(change){
  var text = '';
  for(var row = 0; row<3; row++){
    for(var sq = 0; sq<3; sq++){
      if(row===change.x &&  sq===change.y && typeof change.val === 'string'){text+=change.val;}else{
        if(row===change.x || sq===change.y){text+='+';}else{text+='-';}
      }
    }
    text+='\n';
  }
  console.log(text);
};
console.count = console.count || function(a){
  console.counters = console.counters || {};
  console.counters[a] = console.counters[a] || 0;
  console.counters[a]++;
  console.log(a+':'+console.counters[a]);
};
