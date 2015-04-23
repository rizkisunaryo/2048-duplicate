var numbers=[];
var score=0;
var ROW_COUNT = 4;
var COLUMN_COUNT = 4;

var blockSize=50;
var fontSize=14;

$(function() { 
  var heightMod = Math.floor($(window).height() / (ROW_COUNT+1));
  var widthMod = Math.floor($(window).width() / COLUMN_COUNT);
  if (heightMod<widthMod) blockSize=heightMod;
  else blockSize=widthMod;
  fontSize = Math.floor(blockSize/2.5);
  console.log(blockSize+":"+heightMod+":"+widthMod);
  $('#tableContainer').css('width',(blockSize*COLUMN_COUNT)+'px');
  $('td').css('width',blockSize+'px');
  $('td').css('height',blockSize+'px');
  $('.tile').css('width',blockSize+'px');
  $('.tile').css('height',blockSize+'px');
  $('.tile').css('font-size',fontSize+'px');
  $('#score').css('font-size',fontSize+'px');
  $('#scoreNumber').css('font-size',fontSize+'px');

  init();
  swipeGesture('#bodyContainer');
});

function init() {
  score=0;
  $('#scoreNumber').html(score);
  initNumbers(numbers,ROW_COUNT,COLUMN_COUNT);
  addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
  addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
  paintTiles(numbers,ROW_COUNT,COLUMN_COUNT);
}

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
      var vGameOver = isGameOver(numbers,ROW_COUNT,COLUMN_COUNT);
      if (direction!=null && vGameOver==0) {
        moveTiles(direction,numbers,ROW_COUNT,COLUMN_COUNT);
        addRandomTile(numbers,ROW_COUNT,COLUMN_COUNT);
        paintTiles(numbers,ROW_COUNT,COLUMN_COUNT);
        $('#scoreNumber').html(score);
      }
      else if (vGameOver==1) {
        if (confirm("Score: "+score+"\nPlay again?") == true) {
            init();
        } 
      };
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold:0
  });
}

function isGameOver(pNumbers,pRowCount,pColumnCount) {
  var isGameOver=1;

  for (var row=0; row<=pRowCount-1; row++) {
    for (var col=0; col<=pColumnCount-1; col++) {
      if (pNumbers[row][col]==null) {
        isGameOver=0;
        col=pColumnCount;
        row=pRowCount;
      };
    }
  };

  return isGameOver;
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
        var html='<div class="tile" style="width:'+(blockSize-1)+'px; height:'+(blockSize-1)+'px; font-size:'+fontSize+'px; background-color:#000"><div>'+pNumbers[i1][i2]+'</div></div>';
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
    
    // // check the columns to be pulled right
    // for (var col=pColumnCount-2; col>=0; col--) {
    //   // for every row
    //   for (var row=0; row<=pRowCount-1; row++) {
    //     // if the cell is not null
    //     if (pNumbers[row][col]!=null) {
    //       // check cells from the left to rightest
    //       for (var existingCol=col+1; existingCol<=pColumnCount-1; existingCol++) {
    //         if (pNumbers[row][col]==pNumbers[row][existingCol]) {
    //           pNumbers[row][existingCol]=pNumbers[row][existingCol]+pNumbers[row][col];
    //           score+=pNumbers[row][existingCol];
    //           pNumbers[row][col]=null;
    //           existingCol=pColumnCount;
    //         }
    //         else if(pNumbers[row][existingCol]!=null) {
    //           existingCol=pColumnCount;
    //         }
    //       };
    //     }
    //   };
    // };

    // check every row
    for (var row=0; row<=pRowCount-1; row++) {
      // check from rightest, to 1 column before leftest
      for (var col=pColumnCount-1; col>=1; col--) {
        // if the cell is not null
        if (pNumbers[row][col]!=null) {
          // check cells from left after, to leftest
          // to find same number
          for (var sameCol=col-1; sameCol>=0; sameCol--) {
            if (pNumbers[row][col]==pNumbers[row][sameCol]) {
              pNumbers[row][col]=pNumbers[row][col]+pNumbers[row][sameCol];
              score+=pNumbers[row][col];
              pNumbers[row][sameCol]=null;
              col=sameCol;
              sameCol=-1;
            };
          };
        };
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
    // // check the columns to be pulled left
    // for (var col=1; col<=pColumnCount-1; col++) {
    //   // for every row
    //   for (var row=0; row<=pRowCount-1; row++) {
    //     // if the cell is not null
    //     if (pNumbers[row][col]!=null) {
    //       // check cells from the right to leftest
    //       for (var existingCol=col-1; existingCol>=0; existingCol--) {
    //         if (pNumbers[row][col]==pNumbers[row][existingCol]) {
    //           pNumbers[row][existingCol]=pNumbers[row][existingCol]+pNumbers[row][col];
    //           score+=pNumbers[row][existingCol];
    //           pNumbers[row][col]=null;
    //           existingCol=-1;
    //         }
    //         else if(pNumbers[row][existingCol]!=null) {
    //           existingCol=-1;
    //         }
    //       };
    //     }
    //   };
    // };

    // check every row
    for (var row=0; row<=pRowCount-1; row++) {
      // check from leftest, to 1 column before rightest
      for (var col=0; col<=pColumnCount-2; col++) {
        // if the cell is not null
        if (pNumbers[row][col]!=null) {
          // check cells from right after, to rightest
          // to find same number
          for (var sameCol=col+1; sameCol<=pColumnCount-1; sameCol++) {
            if (pNumbers[row][col]==pNumbers[row][sameCol]) {
              pNumbers[row][col]=pNumbers[row][col]+pNumbers[row][sameCol];
              score+=pNumbers[row][col];
              pNumbers[row][sameCol]=null;
              col=sameCol;
              sameCol=pColumnCount;
            };
          };
        };
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
    // // check the rows to be pulled up
    // for (var row=1; row<=pRowCount-1; row++) {
    //   // for every column
    //   for (var col=0; col<=pColumnCount-1; col++) {
    //     // if the cell is not null
    //     if (pNumbers[row][col]!=null) {
    //       // check cells from the up after, to top
    //       for (var existingRow=row-1; existingRow>=0; existingRow--) {
    //         if (pNumbers[row][col]==pNumbers[existingRow][col]) {
    //           pNumbers[existingRow][col]=pNumbers[existingRow][col]+pNumbers[row][col];
    //           score+=pNumbers[existingRow][col];
    //           pNumbers[row][col]=null;
    //           existingRow=-1;
    //         }
    //         else if(pNumbers[existingRow][col]!=null) {
    //           existingRow=-1;
    //         }
    //       };
    //     }
    //   };
    // };

    // check every column
    for (var col=0; col<=pColumnCount-1; col++) {
      // check from top, to 1 row before bottom
      for (var row=0; row<=pRowCount-2; row++) {
        // if the cell is not null
        if (pNumbers[row][col]!=null) {
          // check cells from down after, to bottom
          // to find same number
          for (var sameRow=row+1; sameRow<=pRowCount-1; sameRow++) {
            if (pNumbers[row][col]==pNumbers[sameRow][col]) {
              pNumbers[row][col]=pNumbers[row][col]+pNumbers[sameRow][col];
              score+=pNumbers[row][col];
              pNumbers[sameRow][col]=null;
              row=sameRow;
              sameRow=pRowCount;
            };
          };
        };
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
  else if (pDirection=='down') {
    // // check the rows to be pulled down
    // for (var row=pRowCount-2; row>=0; row--) {
    //   // for every column
    //   for (var col=0; col<=pColumnCount-1; col++) {
    //     // if the cell is not null
    //     if (pNumbers[row][col]!=null) {
    //       // check cells from the down after, to bottom
    //       for (var existingRow=row+1; existingRow<=pRowCount-1; existingRow++) {
    //         if (pNumbers[row][col]==pNumbers[existingRow][col]) {
    //           pNumbers[existingRow][col]=pNumbers[existingRow][col]+pNumbers[row][col];
    //           score+=pNumbers[existingRow][col];
    //           pNumbers[row][col]=null;
    //           existingRow=pRowCount;
    //         }
    //         else if(pNumbers[existingRow][col]!=null) {
    //           existingRow=pRowCount;
    //         }
    //       };
    //     }
    //   };
    // };

    // check every column
    for (var col=0; col<=pColumnCount-1; col++) {
      // check from bottom, to 1 row before top
      for (var row=pRowCount-1; row>=1; row--) {
        // if the cell is not null
        if (pNumbers[row][col]!=null) {
          // check cells from up after, to top
          // to find same number
          for (var sameRow=row-1; sameRow>=0; sameRow--) {
            if (pNumbers[row][col]==pNumbers[sameRow][col]) {
              pNumbers[row][col]=pNumbers[row][col]+pNumbers[sameRow][col];
              score+=pNumbers[row][col];
              pNumbers[sameRow][col]=null;
              row=sameRow;
              sameRow=-1;
            };
          };
        };
      };
    };
    // check the rows to be pulled down
    for (var row=pRowCount-2; row>=0; row--) {
      // for every column
      for (var col=0; col<=pColumnCount-1; col++) {
        // if the cell is not null
        if (pNumbers[row][col]!=null) {
          // check cells from the bottom
          for (var pulledRow=pRowCount-1; pulledRow>=row+1; pulledRow--) {
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
}