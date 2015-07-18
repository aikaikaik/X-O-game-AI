var Board = function(){
  var boardData = [
    [null,null,null]
    ,[null,null,null]
    ,[null,null,null]
  ];
  return {
    getData: function() {return boardData;},
    addSq: function(obj) {var sqVal = boardData[obj.x][obj.y]; if(typeof sqVal !== 'string' && sqVal === null && (obj.val==='X' || obj.val==='O')){boardData[obj.x][obj.y]=obj.val}}
  };
};
var fakeBoard = function(board,player){
  return {
    getData () {
      var fakedata = board.getData();
      for(var row = 0; row<board.data().length; row++){
        for(var sq = 0; sq<board.data()[0].length; sq++){
          switch(board.data()[row][sq]){
            case null:
              fakedata[row][sq]=null;
            break;
            case player:
              fakedata[row][sq]='me';
            break;
            default:
              fakedata[row][sq]='it';
            break;
          }
        }
      }
      return fakedata;
    }
  };
};
var game = function(player1,player2){
  var board = Board();
  console.log(board.getData());
  var player = 'O';
  var other = 'X'
  var change = player1(fakeBoard(board,player));
  console.log(change);
  change.val = ((change.val)==='me')?player:other;
  console.log(change);
  board.addSq(change);
  console.log(board.getData());
};
