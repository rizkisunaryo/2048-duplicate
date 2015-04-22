var numbers=[];
var ROW_COUNT = 4;
var COLUMN_COUNT = 4;

$(function() { 
  initNumbers(numbers,ROW_COUNT,COLUMN_COUNT);
  addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
  addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
  addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
  addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
  addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
  addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
  addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
  addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
  addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
  addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
  paintTiles(numbers,ROW_COUNT,COLUMN_COUNT);

  swipeGesture('#bodyContainer');
});

function initNumbers(pNumbers,pRowCount,pColumnCount) {
  for (var row=0; row<=pRowCount-1; row++) {
    var anArray=[];
    pNumbers[row]=anArray;
    for (var col=0; col<=pColumnCount-1; col++) {
      pNumbers[row][col]=null;
    };
  };
}

function swipeGesture(pSwapArea) {
  //Enable swiping...
  $(pSwapArea).swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      moveTiles(direction,numbers,ROW_COUNT,COLUMN_COUNT);
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold:0
  });
}

function addRandomTile(pNumbers,pRowCount,pColumnCount) {
  var row = Math.floor((Math.random() * (pRowCount-1)) + 0.5);
  var col=Math.floor((Math.random() * (pColumnCount-1)) + 0.5);
  if (pNumbers[row][col]!=null) {
    addRandomTile(pNumbers,pRowCount,pColumnCount);
  }
  else {
    pNumbers[row][col]=2;
  }
}

function paintTiles(pNumbers,pRowCount,pColumnCount) {
  for (var i1=0; i1<=pRowCount-1; i1++) {
    for (var i2=0; i2<=pColumnCount-1; i2++) {
      var selector = '#cell'+i1+''+i2;
      if (pNumbers[i1][i2]!=null) {
        var html='<div class="tile"><div>'+pNumbers[i1][i2]+'</div></div>';
        $(selector).html(html);
      }
      else {
        $(selector).html('');
      }
    }
  }
}

function moveTiles(pDirection,pNumbers,pRowCount,pColumnCount) {
  if (pDirection=='right') {
    // check the columns to be pulled right
    for (var col=pColumnCount-2; col>=0; col--) {
      // for every row
      for (var row=0; row<=pRowCount-1; row++) {
        // if the cell is not null
        if (pNumbers[row][col]!=null) {
          // check cells from the left to rightest
          for (var existingCol=col+1; existingCol<=pColumnCount-1; existingCol++) {
            if (pNumbers[row][col]==pNumbers[row][existingCol]) {
              pNumbers[row][existingCol]=pNumbers[row][existingCol]+pNumbers[row][col];
              pNumbers[row][col]=null;
              existingCol=pColumnCount;
            }
          };
        }
      };
    };
    for (var col=pColumnCount-2; col>=0; col--) {
      for (var row=0; row<=pRowCount-1; row++) {
        if (pNumbers[row][col]!=null) {
          // check cells from the rightest
          for (var pulledCol=pColumnCount-1; pulledCol>col; pulledCol--) {
            if (pNumbers[row][pulledCol]==null) {
              pNumbers[row][pulledCol]=pNumbers[row][col];
              pNumbers[row][col]=null;
              pulledCol=col;
            }
          };
        }
      };
    };
  }
  else if (pDirection=='left') {
    // check the columns to be pulled left
    for (var col=1; col<=pColumnCount-1; col++) {
      // for every row
      for (var row=0; row<=pRowCount-1; row++) {
        // if the cell is not null
        if (pNumbers[row][col]!=null) {
          // check cells from the right to leftest
          for (var existingCol=col-1; existingCol>=0; existingCol--) {
            if (pNumbers[row][col]==pNumbers[row][existingCol]) {
              pNumbers[row][existingCol]=pNumbers[row][existingCol]+pNumbers[row][col];
              pNumbers[row][col]=null;
              existingCol=-1;
            }
          };
        }
      };
    };
    // check the columns to be pulled left
    for (var col=1; col<=pColumnCount-1; col++) {
      // for every row
      for (var row=0; row<=pRowCount-1; row++) {
        // if the cell is not null
        if (pNumbers[row][col]!=null) {
          // check cells from the leftest
          for (var pulledCol=0; pulledCol<=col-1; pulledCol++) {
            if (pNumbers[row][pulledCol]==null) {
              pNumbers[row][pulledCol]=pNumbers[row][col];
              pNumbers[row][col]=null;
              pulledCol=col;
            }
          };
        }
      };
    };
  }
  else if (pDirection=='up') {
    // check the rows to be pulled up
    for (var row=1; row<=pRowCount-1; row++) {
      // for every column
      for (var col=0; col<=pColumnCount-1; col++) {
        // if the cell is not null
        if (pNumbers[row][col]!=null) {
          // check cells from the up after, to top
          for (var existingRow=row-1; existingRow>=0; existingRow--) {
            if (pNumbers[row][col]==pNumbers[existingRow][col]) {
              pNumbers[existingRow][col]=pNumbers[existingRow][col]+pNumbers[row][col];
              pNumbers[row][col]=null;
              existingRow=-1;
            }
          };
        }
      };
    };
    // check the rows to be pulled up
    for (var row=1; row<=pRowCount-1; row++) {
      // for every column
      for (var col=0; col<=pColumnCount-1; col++) {
        // if the cell is not null
        if (pNumbers[row][col]!=null) {
          // check cells from the top
          for (var pulledRow=0; pulledRow<=row-1; pulledRow++) {
            if (pNumbers[pulledRow][col]==null) {
              pNumbers[pulledRow][col]=pNumbers[row][col];
              pNumbers[row][col]=null;
              pulledRow=row;
            }
          };
        }
      };
    };
  }
  paintTiles(pNumbers,pRowCount,pColumnCount);
}