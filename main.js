var Board = function(){
  var boardData = [
    [null,null,null]
    ,[null,null,null]
    ,[null,null,null]
  ];
  return {
    getData: function() {return boardData;},
    addSq: function(obj) {var sqVal = boardData[obj.x][obj.y]; if(typeof sqVal !== 'string' && sqVal === null && (obj.val==='X' || obj.val==='O')){boardData[obj.x][obj.y]=obj.val}},
    whoWon: function() {
      var didWon = function(player){
        var playerRow = [player,player,player];
        //rows
        for(var row = 0; row < 3; row++){
          if(boardData[row][0]===player&&boardData[row][1]===player&&boardData[row][2]===player){return true;}
        }
        //columns
        for(var colNum = 0; colNum < 3; colNum++){
          if(boardData[0][colNum]===player&&boardData[1][colNum]===player&&boardData[2][colNum]===player){return true;}
        }
        ///
        if(boardData[0][0]===player&&boardData[1][1]===player&&boardData[2][2]===player){return true;}
        if(boardData[0][2]===player&&boardData[1][1]===player&&boardData[2][0]===player){return true;}
        //else...
        return false;
      }
      if(didWon('X')){return 'X';}
      if(didWon('O')){return 'O';}
      for(var row = 0; row<3; row++){
        for(var sq = 0; sq<3; sq++){
          if(boardData[row][sq]===null){return false;}
        }
      }
      return '=';
    }
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
    if(board.getData()[change.x][change.y]){console.error('over-riding')}
    console.change(change);
    change.val = ((change.val)==='me')?player:other;
    console.change(change);
    board.addSq(change);
    console.board(board);
    console.log(board.whoWon());
  }
  var board = Board();
  console.board(board);
  for(var i = 0; i<10; i++){
    turn(player1,'O');
    turn(player2,'X');
  }
};
