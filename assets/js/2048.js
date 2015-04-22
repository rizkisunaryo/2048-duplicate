var numbers=[];
var column=[];
var ROW_COUNT = 4;
var COLUMN_COUNT = 4;

$(function() { 
  numbers[0] = column;
  numbers[0][0] = 8;
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

function paintNumbers(pNumbers,pRowCount,pColumnCount) {
  for (var i1=0; i1<=pRowCount-1; i1++) {
    for (var i2=0; i2<=pColumnCount-1; i2++) {
      if (typeof pNumbers[i1] !== 'undefined' && typeof pNumbers[i1][i2] !== 'undefined' && pNumbers[i1][i2]!=null) {
        var html='<div class="tile"><div>'+pNumbers[i1][i2]+'</div></div>';
        var selector = '#cell'+i1+''+i2;
        $(selector).html(html);
      }
    }
  }
}