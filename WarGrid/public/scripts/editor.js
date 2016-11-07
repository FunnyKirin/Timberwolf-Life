//cell code
var DEAD_CELL;
var LIVE_CELL;
var VOID_CELL;
var GHOST_CELL;
var SELECTED_CELL;


// Color
var EMPTY_COLOR;
var LIVE_COLOR;
var DEAD_COLOR;
var GHOST_COLOR;
var VOID_COLOR;
var GRID_LINES_COLOR;


//interface adjustments
var MAX_CELL_LENGTH;
var MIN_CELL_LENGTH;
var CELL_LENGTH_INC;
var CELL_LENGTH_X;
var CELL_LENGTH_Y;
var GRID_LINE_LENGTH_RENDERING_THRESHOLD;

// CANVAS VARIABLES
var canvasWidth;
var canvasHeight;
var canvas;
var canvas2D;

// GRID VARIABLES
var gridWidth;
var gridHeight;
var gameGrid;
var updateGrid;
var renderGrid;
var ghostGrid;
var brightGrid;

// RENDERING VARIABLES
var cellLength;

function initEditor() {
  console.log("initEditor()");
  initConstants();
  initCanvas();
  initEditorData();
  initEventHandlers();
  resetEditor();
}

function initConstants() {
  console.log("initConstants()");
  //THESE REPRESENT THE POSSIBLE STATS FOR EACH CELL
  DEAD_CELL = 0;
  LIVE_CELL = 1;
  GHOST_CELL = 2;
  VOID_CELL = 3;

  P1_LIVE_CELL = 11;
  P2_LIVE_CELL = 21;

  //COLORS FOR RENDERING
  EMPTY_COLOR = "#ffffff";
  LIVE_COLOR = [];
  DEAD_COLOR = [];
  LIVE_COLOR[1] = "#FF0000";
  DEAD_COLOR[1] = "#ff7272";
  LIVE_COLOR[2] = "#1c23ff";
  DEAD_COLOR[2] = "#7277ff";
  GHOST_COLOR = "rgba(255,0,0,0.5)";
  BRIGHT_COLOR = "#66ffff";
  VOID_COLOR = "#80bfff";

  //COLORS FOR RENDERING
  GRID_LINES_COLOR = "#CCCCCC";

  // CELL LENGTH CONSTANTS
  MAX_CELL_LENGTH = 32;
  MIN_CELL_LENGTH = 1;
  CELL_LENGTH_INC = 2;
  GRID_LINE_LENGTH_RENDERING_THRESHOLD = 8;
}

function initCanvas() {
  console.log("initCanvas()");
  canvas = document.getElementById("editor_canvas");
  canvas2D = canvas.getContext("2d");

  canvasWidth = canvas.width;
  canvasHeight = canvas.height;
}

function initEditorData(){
  console.log("initEditorData()");
  cellLength = 32;
}

function initEventHandlers(){
  canvas.onclick = respondToMouseClick;
}

function respondToMouseClick(event) {
  // GET THE PATTERN SELECTED IN THE DROP DOWN LIST
  var patternsList = document.getElementById("cell_type");
  console.log("patternsList: " + patternsList);
  var selectedPattern = patternsList.options[patternsList.selectedIndex].value;
  console.log("selectedPattern: " + selectedPattern);
  if (selectedPattern === "images/Void.png"){
    SELECTED_CELL = VOID_CELL;
  }

  if (selectedPattern === "images/P1_LIVE.png"){
    SELECTED_CELL = P1_LIVE_CELL;
  }

  if (selectedPattern === "images/P2_LIVE.png"){
    SELECTED_CELL = P2_LIVE_CELL;
  }
  // CALCULATE THE ROW, COL OF THE CLICK
  var canvasCoords = getRelativeCoords(event);
  var clickCol = Math.floor(canvasCoords.x / cellLength);
  var clickRow = Math.floor(canvasCoords.y / cellLength);

  setGridCell(renderGrid, clickRow, clickCol,SELECTED_CELL);
  console.log("renderGrid: " + renderGrid);
  renderCells();
}

function renderCells(){
  //SET THE PROPER RENDER COLOR
  for (var i = 0; i <= gridHeight; i++) {
    for (var j = 0; j < gridWidth; j++) {
      var cell = getGridCell(renderGrid, i, j);
      var leftNumber = Math.floor(cell / 10);
      var rightNumber = cell % 10;
      var x = j * cellLength;
      var y = i * cellLength;
      if (leftNumber > 0){
        if (rightNumber === 0){
          canvas2D.fillStyle = DEAD_COLOR[leftNumber];
          canvas2D.fillRect(x, y, cellLength, cellLength);
        } else {
          canvas2D.fillStyle = LIVE_COLOR[leftNumber];
          canvas2D.fillRect(x, y, cellLength, cellLength);
        }
      }

      if (rightNumber == 3) {
        canvas2D.fillStyle = VOID_COLOR;
        canvas2D.fillRect(x, y, cellLength, cellLength);
      }
    }
  }
}



function resetEditor() {
  console.log("resetEditor()");
  gridWidth = canvasWidth / cellLength;
  gridHeight = canvasHeight / cellLength;
  renderGrid = [];
  renderEdiotr();
}


function renderEdiotr(){
  console.log("renderEdiotr()");
  renderGridLines();
}



function renderGridLines() {
  console.log("renderGridLines()");
  canvas2D.strokeStyle = GRID_LINES_COLOR;

  //vertical LINES
  for (var i = 0; i < gridWidth; i++) {
    var x1 = i * cellLength;
    var y1 = 0;
    var x2 = x1;
    var y2 = canvasHeight;
    canvas2D.beginPath();
    canvas2D.moveTo(x1,y1);
    canvas2D.lineTo(x2,y2);
    canvas2D.stroke();
  }
  // HORIZONTAL LINES
  for (var j = 0; j < gridHeight; j++) {
    var x_1 = 0;
    var y_1 = j * cellLength;
    var x_2 = canvasWidth;
    var y_2 = y_1;
    canvas2D.moveTo(x_1, y_1);
    canvas2D.lineTo(x_2, y_2);
    canvas2D.stroke();
  }
}



function getGridCell(grid, row, col, value) {
  if (!isValidCell(row, col)) {
    return -1;
  }
  var index = (row * gridWidth) + col;
  return grid[index];
}

function setGridCell(grid, row, col, value) {
  if (!isValidCell(row, col)) {
    return;
  }
  var index = (row * gridWidth) + col;
  grid[index] = value;
}

function isValidCell(row, col) {
  // IS IT OUTSIDE THE GRID?
  if ((row < 0) || (col <0) || (row >= gridHeight) || (col >= gridWidth)){
    return false;
  }
  else{
    return true;
  }
}


function getRelativeCoords(event) {
  if (event.offsetX !== undefined && event.offsetY !== undefined) {
    return {
      x: event.offsetX,
      y: event.offsetY
    };
  }else {
    return {
      x: event.layerX,
      y: event.layerY
    };
  }
}
