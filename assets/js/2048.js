var numbers=[];
var ROW_COUNT = 4;
var COLUMN_COUNT = 4;

$(function() { 
  for (var i=0; i<=ROW_COUNT-1; i++) {
    var column=[];
    numbers[i]=column;
  };
  // numbers[0][0] = 8;
  addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
  paintNumbers(numbers,ROW_COUNT,COLUMN_COUNT);
  

  //Enable swiping...
  $("#bodyContainer").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      $('#score').text("You swiped " + direction );  
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold:0
  });
});

function addRandomTile(pNumbers,pRowCount,pColumnCount) {
  var row = Math.floor((Math.random() * (pRowCount-1)) + 0.5);
  var col=Math.floor((Math.random() * (pColumnCount-1)) + 0.5);
  if (typeof pNumbers[row] !== 'undefined' && typeof pNumbers[row][col] !== 'undefined' && pNumbers[row][col]!=null) {
    addRandomTile(pNumbers,pRowCount,pColumnCount);
  }
  else {
    console.log(row+":"+col);
    pNumbers[row][col]=2;
  }
}

function paintNumbers(pNumbers,pRowCount,pColumnCount) {
  for (var i1=0; i1<=pRowCount-1; i1++) {
    for (var i2=0; i2<=pColumnCount-1; i2++) {
      if (typeof pNumbers[i1] !== 'undefined' && typeof pNumbers[i1][i2] !== 'undefined' && pNumbers[i1][i2]!=null) {
        var html='<div class="tile"><div>'+pNumbers[i1][i2]+'</div></div>';
        var selector = '#cell'+i1+''+i2;
        console.log(selector);
        $(selector).html(html);
      }
    }
  }
}