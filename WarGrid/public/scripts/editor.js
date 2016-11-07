// Color
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
  resetEditor();
}

function initConstants() {
  console.log("initConstants()");

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

function resetEditor() {
  console.log("resetEditor()");
  gridWidth = canvasWidth / cellLength;
  gridHeight = canvasHeight / cellLength;
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
