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
  var turn = function(playFunc,player){
    console.count(player);
    var other =  (player==='O')?'X':'O';
    var change = playFunc(fakeBoard(board,player));
    console.change(change);
    change.val = ((change.val)==='me')?player:other;
    console.change(change);
    board.addSq(change);
    console.board(board);
  }
  var board = Board();
  console.board(board);
  turn(player1,'O');
  turn(player2,'X');
  turn(player1,'O');
};
