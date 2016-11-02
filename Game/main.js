//Cell code
var DEAD_CELL;
var LIVE_CELL;
var VOID_CELL;
var GHOST_CELL;

//Color var
var LIVE_COLOR1;
var LIVE_COLOR2;
var DEAD_COLOR1;
var DEAD_COLOR2;
var GHOST_COLOR;
var VOID_COLOR;
var GRID_LINES_COLOR;
var TEXT_COLOR;
var BRIGHT_COLOR;

//algorithm var
var TOP_LEFT;
var TOP_RIGHT;
var BOTTOM_LEFT;
var BOTTOM_RIGHT;
var TOP;
var BOTTOM;
var LEFT;
var RIGHT;
var CENTER;

//FPS setting(no need)
var MILLISECONDS_IN_ONE_SECOND;
var MAX_FPS;
var MIN_FPS;
var FPS_INC;
var FPS_X;
var FPS_Y;

//interface adjustments
var MAX_CELL_LENGTH;
var MIN_CELL_LENGTH;
var CELL_LENGTH_INC;
var CELL_LENGTH_X;
var CELL_LENGTH_Y;
var GRID_LINE_LENGTH_RENDERING_THRESHOLD;

// FRAME RATE TIMING VARIABLES
var timer;
var fps;
var frameInterval;

// CANVAS VARIABLES
var canvasWidth;
var canvasHeight;
var canvas;
var canvas2D;

// GRID VARIABLES
var gridWidth;
var gridHeight;
var updateGrid1;
var updateGrid2;
var renderGrid;

var ghostGrid;
var brightGrid;

// RENDERING VARIABLES
var cellLength;

var ghostInterval;
var setVoidCellInterval;
var mouseIsDown;

function initGameOfLife() {
    // INIT ALL THE CONSTANTS, i.e. ALL THE
    // THINGS THAT WILL NEVER CHANGE
    initConstants();

    // INIT THE RENDERING SURFACE
    initCanvas();

    // INIT ALL THE GAME-RELATED VARIABLES
    initGameOfLifeData();

    // INIT THE LOOKUP TABLES FOR THE SIMULATION
    initCellLookup();

    // SETUP THE EVENT HANDLERS
    initEventHandlers();

    // RESET EVERYTHING, CLEARING THE CANVAS
    resetGameOfLife();
}

function initConstants() {
    // THESE REPRESENT THE TWO POSSIBLE STATES FOR EACH CELL
    DEAD_CELL = 0;
    LIVE_CELL = 1;
    GHOST_CELL = 2;
    VOID_CELL = 3;
    // COLORS FOR RENDERING
    LIVE_COLOR1 = "#FF0000";
    DEAD_COLOR1 = "#ff7272";
    LIVE_COLOR2 = "#1c23ff";
    DEAD_COLOR2 = "#7277ff";
    GRID_LINES_COLOR = "#CCCCCC";
    TEXT_COLOR = "#7777CC";
    GHOST_COLOR = "rgba(255, 0, 0, 0.5)";
    BRIGHT_COLOR = "#66ffff";
    VOID_COLOR = "#80bfff";

    // THESE REPRESENT THE DIFFERENT TYPES OF CELL LOCATIONS IN THE GRID
    TOP_LEFT = 0;
    TOP_RIGHT = 1;
    BOTTOM_LEFT = 2;
    BOTTOM_RIGHT = 3;
    TOP = 4;
    BOTTOM = 5;
    LEFT = 6;
    RIGHT = 7;
    CENTER = 8;

    // FPS CONSTANTS
    MILLISECONDS_IN_ONE_SECOND = 1000;
    MAX_FPS = 33;
    MIN_FPS = 1;
    FPS_INC = 1;

    // CELL LENGTH CONSTANTS
    MAX_CELL_LENGTH = 32;
    MIN_CELL_LENGTH = 1;
    CELL_LENGTH_INC = 2;
    GRID_LINE_LENGTH_RENDERING_THRESHOLD = 8;

    // RENDERING LOCATIONS FOR TEXT ON THE CANVAS
    FPS_X = 20;
    FPS_Y = 450;
    CELL_LENGTH_X = 20;
    CELL_LENGTH_Y = 480;
}

function initCanvas() {
    // GET THE CANVAS
    canvas = document.getElementById("game_canvas");

    // GET THE 2D RENDERING CONTEXT
    canvas2D = canvas.getContext("2d");

    // INIT THE FONT FOR TEXT RENDERED ON THE CANVAS. NOTE
    // THAT WE'LL BE RENDERING THE FRAME RATE AND ZOOM LEVEL
    // ON THE CANVAS
    canvas2D.font = "24px Arial";

    // NOTE THAT THESE DIMENSIONS SHOULD BE THE
    // SAME AS SPECIFIED IN THE WEB PAGE, WHERE
    // THE CANVAS IS SIZED
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
}

function initGameOfLifeData(){
    // INIT THE TIMING DATA
    timer = null;
    fps = MAX_FPS;
    frameInterval = MILLISECONDS_IN_ONE_SECOND / fps;

    // INIT THE CELL LENGTH
    cellLength = 20;
}

function initCellLookup()
{
    // WE'LL PUT ALL THE VALUES IN HERE
    cellLookup = new Array();

    // TOP LEFT
    var topLeftArray = new Array(1, 0, 1, 1, 0, 1);
    cellLookup[TOP_LEFT] = new CellType(3, topLeftArray);

    // TOP RIGHT
    var topRightArray = new Array(-1, 0, -1, 1, 0, 1);
    cellLookup[TOP_RIGHT] = new CellType(3, topRightArray);

    // BOTTOM LEFT
    var bottomLeftArray = new Array(1, 0, 1, -1, 0, -1);
    cellLookup[BOTTOM_LEFT] = new CellType(3, bottomLeftArray);

    // BOTTOM RIGHT
    var bottomRightArray = new Array(-1, 0, -1, -1, 0, -1);
    cellLookup[BOTTOM_RIGHT] = new CellType(3, bottomRightArray);

    // TOP
    var topArray = new Array(-1, 0, -1, 1, 0, 1, 1, 1, 1, 0);
    cellLookup[TOP] = new CellType(5, topArray);

    // BOTTOM
    var bottomArray = new Array(-1, 0, -1, -1, 0, -1, 1, -1, 1, 0);
    cellLookup[BOTTOM] = new CellType(5, bottomArray);

    // LEFT
    var leftArray = new Array(0, -1, 1, -1, 1, 0, 1, 1, 0, 1);
    cellLookup[LEFT] = new CellType(5, leftArray);

    // RIGHT
    var rightArray = new Array(0, -1, -1, -1, -1, 0, -1, 1, 0, 1);
    cellLookup[RIGHT] = new CellType(5, rightArray);

    // CENTER
    var centerArray = new Array(-1, -1, -1, 0, -1, 1, 0, 1, 1, 1, 1, 0, 1, -1, 0, -1);
    cellLookup[CENTER] = new CellType(8, centerArray);
}
