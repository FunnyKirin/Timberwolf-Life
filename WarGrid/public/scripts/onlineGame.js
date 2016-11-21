var room;
var loadMapName;
//PlayerData
var playerIndex;
var currentPlayer;
var cellNumber = 0;
var territory = 0;
var ghostTrigger = 1;
//Cell code
var DEAD_CELL;
var LIVE_CELL;
var VOID_CELL;
var GHOST_CELL;
//Color var
var EMPTY_COLOR;
var LIVE_COLOR;
var DEAD_COLOR;
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
var gameGrid;
var updateGrid;
var renderGrid;
var ghostGrid;
var ghostUpdateGrid;
var ghostRenderGrid;
var brightGrid;
// RENDERING VARIABLES
var cellLength;
var ghostInterval;
var setVoidCellInterval;
var mouseIsDown;

function initGameOfLife() {
    checkSetup();
    //init firebase
    initFirebase();
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

    initUI();
    //Start first Turn;
}

function initConstants() {
    // THESE REPRESENT THE TWO POSSIBLE STATES FOR EACH CELL
    DEAD_CELL = 0;
    LIVE_CELL = 1;
    GHOST_CELL = 2;
    VOID_CELL = 3;
    // COLORS FOR RENDERING
    EMPTY_COLOR = "#ffffff";
    LIVE_COLOR = [];
    DEAD_COLOR = [];
    LIVE_COLOR[1] = "#FF0000";
    DEAD_COLOR[1] = "#ff7272";
    LIVE_COLOR[2] = "#1c23ff";
    DEAD_COLOR[2] = "#7277ff";
    GRID_LINES_COLOR = "#CCCCCC";
    TEXT_COLOR = "#7777CC";
    GHOST_COLOR = "rgba(231, 237, 59, 0.4)";
    BRIGHT_COLOR = "#66ffff";
    VOID_COLOR = "#9B7653";
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
    ghostGrid = [];
    ghostRenderGrid = [];
    ghostUpdateGrid = [];
    //firebase names;
    //loadMapName=    window.location.search.substring(1);
}

function initFirebase() {
    // Shortcuts to Firebase SDK features.
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    var url = window.location.search.substring(1);
    room = database.ref().child("lobby").child(url);
    room.once('value', function (snapshot) {
        currentPlayer = snapshot.val().currentPlayer;
        renderGrid = snapshot.val().grid;
        renderGame();
        swapGrids();
        //get player Index
        if (auth.currentUser.uid == snapshot.val().owner) {
            playerIndex = 1;
        }
        else if (auth.currentUser.uid == snapshot.val().challenger) {
            playerIndex = 2;
        }
        if (snapshot.val().currentPlayer == playerIndex) {
            nextTurn();
        }
        //alert("you are player " + playerIndex);
    });
    // Initiates Firebase auth and listen to auth state changes.
    //this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
    room.on('value', function (snapshot) {
        //alert(snapshot.val().currentPlayer + " + " + currentPlayer);
        //switch player
        if (snapshot.val().currentPlayer != currentPlayer) {
            currentPlayer = snapshot.val().currentPlayer;
            renderGrid = snapshot.val().grid;
            renderGame();
            swapGrids();
            if (currentPlayer == playerIndex) {
                nextTurn();
            }
        }
    });
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


function initGameOfLifeData() {
    // INIT THE TIMING DATA
    timer = null;
    fps = MAX_FPS;
    frameInterval = MILLISECONDS_IN_ONE_SECOND / fps;
    // INIT THE CELL LENGTH
    cellLength = 64;
}
/*
 * This function initializes all the event handlers, registering
 * the proper response methods.
 */
function initEventHandlers() {
    canvas.onclick = respondToMouseClick;
    $("#confirmButton").click(confirmMove);
    //click ghostButton will enable/disable ghostcells
    $("#ghostButton").click(function () {
        ghostTrigger = ghostTrigger === 1 ? 2 : 1;
        //re-render game after clicking.
        renderGame();
        renderGhostRenderCells();
        renderGhost();
        renderGridLines();
    });
    $("#resetButton").click(function () {
        cellNumber = getCellNumber(territory);
        ghostGrid = [];
        //re-render game after clicking.
        renderGame();
        renderGhostRenderCells();
        renderGhost();
        renderGridLines();
    });
}
/* This function initilizes all UI texts
 */
function initUI() {
    $("#text").text("Cell left: " + cellNumber);
    //reset game UI
}
/*
 * This function handle mouse click event, cells will only be placed on ghost grid
 * until the player click confirm.
 */
function respondToMouseClick(event) {
    // CALCULATE THE ROW,COL OF THE CLICK
    var canvasCoords = getRelativeCoords(event);
    var clickCol = Math.floor(canvasCoords.x / cellLength);
    var clickRow = Math.floor(canvasCoords.y / cellLength);
    //get cells from update grid and ghost cell
    var cell = getGridCell(updateGrid, clickRow, clickCol);
    var ghostCell = getGridCell(ghostGrid, clickRow, clickCol);
    //check if there is already a cell in ghost grid,
    // if not:
    if (cell != LIVE_CELL + playerIndex * 10) {
        if (ghostCell != LIVE_CELL + playerIndex * 10) {
            //check if the player can place a cell at that position.
            if (cellNumber > 0 && cell != VOID_CELL) {
                //check if the position is next to the player's territory.
                var cellType = determineCellType(clickRow, clickCol);
                var cellsToCheck = cellLookup[cellType];
                var boolean = 0;
                for (var counter = 0; counter < (cellsToCheck.numNeighbors * 2); counter += 2) {
                    var neighborCol = clickCol + cellsToCheck.cellValues[counter];
                    var neighborRow = clickRow + cellsToCheck.cellValues[counter + 1];
                    var index = (neighborRow * gridWidth) + neighborCol;
                    var neighborValue = updateGrid[index];
                    var rightNumber = neighborValue % 10;
                    var leftNumber = Math.floor(neighborValue / 10);
                    if (leftNumber == playerIndex) {
                        boolean = 1;
                    }
                }
                //it is!
                if (boolean == 1) {
                    setGridCell(ghostGrid, clickRow, clickCol, LIVE_CELL + playerIndex * 10);
                    cellNumber--;
                }
            }
        }
        // if so, remove that cell. (so players can undo their moves before they confirm)
        else {
            setGridCell(ghostGrid, clickRow, clickCol, 0);
            cellNumber++;
        }
    }
    //reset game UI
    renderGame();
    renderGhostRenderCells();
    renderGhost();
    renderGridLines();
    initUI();
}
//These function will be used to render ghost cells
function renderGhost() {
    renderGhostCells();
}

function renderGhostCells() {
    // SET THE PROPER RENDER COLOR
    // RENDER THE LIVE CELLS IN THE GRID
    for (var i = 0; i <= gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            var cell = getGridCell(ghostGrid, i, j);
            //leftNumber = player index
            var leftNumber = Math.floor(cell / 10);
            //rightNumber = cell type
            var rightNumber = cell % 10;
            var x = j * cellLength;
            var y = i * cellLength;
            if (leftNumber == playerIndex) {
                if (rightNumber == 1) {
                    canvas2D.fillStyle = LIVE_COLOR[playerIndex];
                    canvas2D.fillRect(x, y, cellLength, cellLength);
                }
            }
            if (ghostTrigger == 1) {
                var cell = getGridCell(ghostRenderGrid, i, j);
                //leftNumber = player index
                var leftNumber = Math.floor(cell / 10);
                //rightNumber = cell type
                var rightNumber = cell % 10;
                var x = j * cellLength;
                var y = i * cellLength;
                if (leftNumber == playerIndex) {
                    if (rightNumber == 1) {
                        canvas2D.fillStyle = GHOST_COLOR;
                        canvas2D.fillRect(x, y, cellLength, cellLength);
                    }
                }
            }
            /*
             //if the cell is a player's living/ dead cell
             if (leftNumber > 0) {
             //it is a deadcell
             if (rightNumber === 0) {
             canvas2D.fillStyle = DEAD_COLOR[leftNumber];
             canvas2D.fillRect(x, y, cellLength, cellLength);
             }
             //it is a living cell
             else {
             canvas2D.fillStyle = LIVE_COLOR[leftNumber];
             canvas2D.fillRect(x, y, cellLength, cellLength);
             }
             }
             //it is a void cell

             if (rightNumber == 3) {
             canvas2D.fillStyle = VOID_COLOR;
             canvas2D.fillRect(x, y, cellLength, cellLength);
             }
             */
        }
    }
}

function renderGhostRenderCells() {
    ghostUpdateGrid = [];
    ghostRenderGrid = [];
    // SET THE PROPER RENDER COLOR
    // RENDER THE LIVE CELLS IN THE GRID
    for (var i = 0; i <= gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            var cell = getGridCell(updateGrid, i, j);
            setGridCell(ghostUpdateGrid, i, j, cell);
            cell = getGridCell(ghostGrid, i, j);
            if (cell / 10 > 0) {
                setGridCell(ghostUpdateGrid, i, j, cell);
            }
        }
    }
    updateGame(ghostUpdateGrid, ghostRenderGrid);
}
/*
 Comfirm Movement
 Send socket to server
 */
function confirmMove() {
    if (currentPlayer == playerIndex) {
        //place cells from ghost grid to update grid and render grid
        for (var i = 0; i <= gridHeight; i++) {
            for (var j = 0; j < gridWidth; j++) {
                var cell = getGridCell(ghostGrid, i, j);
                if (cell - playerIndex * 10 === LIVE_CELL) {
                    if (cell - playerIndex * 10 === LIVE_CELL) {
                        setGridCell(updateGrid, i, j, LIVE_CELL + playerIndex * 10);
                        setGridCell(renderGrid, i, j, LIVE_CELL + playerIndex * 10);
                    }
                }
            }
        }
        //update and render the game
        ghostGrid = [];
        updateGame(updateGrid, renderGrid);
        renderGame();
        writeMap(updateGrid);
        //check if current player win
        if (checkVictory()) {
            alert("player " + playerIndex + " win!");
        }
        //nextTurn();
        //go to next turn
        
        cellNumber = 0;
        initUI();
    }
}
//send map info to database after pressing confirm
function writeMap(grid) {
    room.child("grid").transaction(function (currentData) {
        return grid;
    });
    room.child("currentPlayer").transaction(function (currentData) {
        currentData = currentData === 1 ? 2 : 1;
        return currentData;
    });
}
//check if current player achieved victory.
function checkVictory() {
    for (var i = 0; i <= gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            var cell = getGridCell(updateGrid, i, j);
            var leftNumber = Math.floor(cell / 10);
            if (leftNumber != -1) {
                if (cell != VOID_CELL && leftNumber != playerIndex) {
                    console.log(leftNumber + " " + playerIndex);
                    return 0;
                }
            }
        }
    }
    return 1;
}
//goto next turn
function nextTurn() {
    territory = 0;
    //switch Player
    //playerIndex = playerIndex === 1 ? 2 : 1;
    //Caluculate the amount of cell the current player can place
    for (var i = 0; i <= gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            var cell = getGridCell(renderGrid, i, j);
            var leftNumber = Math.floor(cell / 10);
            if (leftNumber === playerIndex) {
                territory++;
            }
        }
    }
    //amount of cell current player can place.
    cellNumber = getCellNumber(territory);
    initUI();
}
//calculalte amount of cells player can place
function getCellNumber(territory) {
    return Math.floor(4 + territory / 5);
}

function CellType(initNumNeighbors, initCellValues) {
    this.numNeighbors = initNumNeighbors;
    this.cellValues = initCellValues;
}

function initCellLookup() {
    // WE'LL PUT ALL THE VALUES IN HERE
    cellLookup = [];
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
/*
 * This function resets the grid containing the current state of the
 * Game of Life such that all cells in the game are dead.
 */
function resetGameOfLife() {
    // RESET ALL THE DATA STRUCTURES TOO
    gridWidth = canvasWidth / cellLength;
    gridHeight = canvasHeight / cellLength;
    updateGrid = [];
    renderGrid = [];
    gameGrid = [];
    // INIT THE CELLS IN THE GRID
    for (var i = 0; i < gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            setGridCell(updateGrid, i, j, DEAD_CELL);
            setGridCell(renderGrid, i, j, DEAD_CELL);
        }
    }
    // RENDER THE CLEARED SCREEN
    renderGame();
}

function updateGame(updateGrid, renderGrid) {
    // GO THROUGH THE UPDATE GRID AND USE IT TO CHANGE THE RENDER GRID
    for (var i = 0; i < gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            // HOW MANY NEIGHBORS DOES THIS CELL HAVE?
            var numLivingNeighbors = calcLivingNeighbors(i, j, updateGrid);
            // CALCULATE THE ARRAY INDEX OF THIS CELL
            // AND GET ITS CURRENT STATE
            var index = (i * gridWidth) + j;
            var testCell = updateGrid[index];
            //leftNumber = player index
            var leftNumber = Math.floor(testCell / 10);
            //rightNumber = cell type
            var rightNumber = testCell % 10;
            // check if the cell belongs to current player.
            if (leftNumber == playerIndex) {
                // CASES
                // 1) IT'S ALIVE
                if (rightNumber === LIVE_CELL) {
                    // 1a FEWER THAN 2 LIVING NEIGHBORS
                    if (numLivingNeighbors < 2) {
                        // IT DIES FROM UNDER-POPULATION
                        renderGrid[index] = DEAD_CELL + 10 * playerIndex;
                    }
                    // 1b MORE THAN 3 LIVING NEIGHBORS
                    else if (numLivingNeighbors > 3) {
                        // IT DIES FROM OVERCROWDING
                        renderGrid[index] = DEAD_CELL + 10 * playerIndex;
                    }
                    // 1c 2 OR 3 LIVING NEIGHBORS, WE DO NOTHING
                    else {
                        renderGrid[index] = LIVE_CELL + 10 * playerIndex;
                    }
                }
                // 2) IT'S DEAD
                else if (rightNumber === 0) {
                    // become a live cell
                    if (numLivingNeighbors === 3) {
                        renderGrid[index] = LIVE_CELL + 10 * leftNumber;
                    }
                    // still a dead cell
                    else {
                        renderGrid[index] = DEAD_CELL + 10 * leftNumber;
                    }
                }
            }
            //make sure it is not a void cell
            else if (testCell != VOID_CELL) {
                // if it is an empty cell
                if (numLivingNeighbors === 3) {
                    //become a live cell
                    renderGrid[index] = LIVE_CELL + 10 * playerIndex;
                }
                else if (testCell == DEAD_CELL) {
                    {
                        //still a dead cell
                        renderGrid[index] = DEAD_CELL;
                    }
                }
            }
        }
    }
}

function renderGame() {
    // CLEAR THE CANVAS
    canvas2D.clearRect(0, 0, canvasWidth, canvasHeight);
    // RENDER THE GRID LINES, IF NEEDED
    if (cellLength >= GRID_LINE_LENGTH_RENDERING_THRESHOLD) renderGridLines();
    // RENDER THE GAME CELLS
    renderCells();
    //renderGhosts();
    renderGridLines();
    //renderVoidCell();
    swapGrids();
    // THE GRID WE RENDER THIS FRAME WILL BE USED AS THE BASIS
    // FOR THE UPDATE GRID NEXT FRAME
}

function renderCells() {
    // SET THE PROPER RENDER COLOR
    // RENDER THE LIVE CELLS IN THE GRID
    for (var i = 0; i <= gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            var cell = getGridCell(renderGrid, i, j);
            var leftNumber = Math.floor(cell / 10);
            var rightNumber = cell % 10;
            var x = j * cellLength;
            var y = i * cellLength;
            if (leftNumber > 0) {
                if (rightNumber === 0) {
                    canvas2D.fillStyle = DEAD_COLOR[leftNumber];
                    canvas2D.fillRect(x, y, cellLength, cellLength);
                }
                else {
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

function renderGridLines() {
    // SET THE PROPER COLOR
    canvas2D.strokeStyle = GRID_LINES_COLOR;
    // VERTICAL LINES
    for (var i = 0; i < gridWidth; i++) {
        var x1 = i * cellLength;
        var y1 = 0;
        var x2 = x1;
        var y2 = canvasHeight;
        canvas2D.beginPath();
        canvas2D.moveTo(x1, y1);
        canvas2D.lineTo(x2, y2);
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
/*
 * We need one grid's cells to determine the grid's values for
 * the next frame. So, we update the render grid based on the contents
 * of the update grid, and then, after rending, we swap them, so that
 * the next frame we'll be progressing the game properly.
 */
function swapGrids() {
    var temp = updateGrid;
    updateGrid = renderGrid;
    renderGrid = temp;
    for (var i = 0; i <= gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            var cell = getGridCell(updateGrid, i, j);
            var leftNumber = Math.floor(cell / 10);
            var rightNumber = cell % 10;
            if (leftNumber > 0) {
                setGridCell(renderGrid, i, j, cell);
            }
            if (rightNumber === VOID_CELL) {
                setGridCell(renderGrid, i, j, cell);
            }
        }
    }
}
/*
 * Accessor method for getting the cell value in the grid at
 * location (row, col).
 */
function getGridCell(grid, row, col) {
    // IGNORE IF IT'S OUTSIDE THE GRID
    if (!isValidCell(row, col)) {
        return -1;
    }
    var index = (row * gridWidth) + col;
    return grid[index];
}
/*
 * Mutator method for setting the cell value in the grid at
 * location (row, col).
 */
function setGridCell(grid, row, col, value) {
    // IGNORE IF IT'S OUTSIDE THE GRID
    if (!isValidCell(row, col)) {
        return;
    }
    var index = (row * gridWidth) + col;
    grid[index] = value;
}
/*
 * A cell's type determines which adjacent cells need to be tested
 * during each frame of the simulation. This method tests the cell
 * at (row, col), and returns the constant representing which of
 * the 9 different types of cells it is.
 */
function determineCellType(row, col) {
    if ((row === 0) && (col === 0)) return TOP_LEFT;
    else if ((row === 0) && (col === (gridWidth - 1))) return TOP_RIGHT;
    else if ((row === (gridHeight - 1)) && (col === 0)) return BOTTOM_LEFT;
    else if ((row === (gridHeight - 1)) && (col === (gridHeight - 1))) return BOTTOM_RIGHT;
    else if (row === 0) return TOP;
    else if (col === 0) return LEFT;
    else if (row === (gridHeight - 1)) return RIGHT;
    else if (col === (gridWidth - 1)) return BOTTOM;
    else return CENTER;
}
/*
 * This method counts the living cells adjacent to the cell at
 * (row, col). This count is returned.
 * playerNumber: int
 */
function calcLivingNeighbors(row, col, updateGrid) {
    var numLivingNeighbors = 0;
    // DEPENDING ON THE TYPE OF CELL IT IS WE'LL CHECK
    // DIFFERENT ADJACENT CELLS
    var cellType = determineCellType(row, col);
    var cellsToCheck = cellLookup[cellType];
    for (var counter = 0; counter < (cellsToCheck.numNeighbors * 2); counter += 2) {
        var neighborCol = col + cellsToCheck.cellValues[counter];
        var neighborRow = row + cellsToCheck.cellValues[counter + 1];
        var index = (neighborRow * gridWidth) + neighborCol;
        var neighborValue = updateGrid[index];
        var rightNumber = neighborValue % 10;
        var leftNumber = Math.floor(neighborValue / 10);
        if (rightNumber == 1 && leftNumber == playerIndex) {
            numLivingNeighbors++;
        }
    }
    return numLivingNeighbors;
}
/*
 * This function tests to see if (row, col) represents a
 * valid cell in the grid. If it is a valid cell, true is
 * returned, else false.
 */
function isValidCell(row, col) {
    // IS IT OUTSIDE THE GRID?
    if ((row < 0) || (col < 0) || (row >= gridHeight) || (col >= gridWidth)) {
        return false;
    }
    // IT'S INSIDE THE GRID
    else {
        return true;
    }
}
// HELPER METHODS FOR THE EVENT HANDLERS
/*
 * This function gets the mouse click coordinates relative to
 * the canvas itself, where 0,0 is the top, left corner of
 * the canvas.
 */
function getRelativeCoords(event) {
    if (event.offsetX !== undefined && event.offsetY !== undefined) {
        return {
            x: event.offsetX
            , y: event.offsetY
        };
    }
    else {
        return {
            x: event.layerX
            , y: event.layerY
        };
    }
}
// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
        alert('You have not configured and imported the Firebase SDK. ' + 'Make sure you go through the codelab setup instructions.');
    }
    else if (config.storageBucket === '') {
        alert('Your Firebase Storage bucket has not been enabled. Sorry about that. This is ' + 'actually a Firebase bug that occurs rarely. ' + 'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' + 'and make sure the storageBucket attribute is not empty. ' + 'You may also need to visit the Storage tab and paste the name of your bucket which is ' + 'displayed there.');
    }
};
