var DEAD_CELL;
var LIVE_CELL;
var VOID_CELL;
var GHOST_CELL;
var SELECTED_CELL;
var P1_DEAD_CELL;
var P2_DEAD_CELL;

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

//database relate
var database;
var creator;
var mapName;

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
var testGrid;
var ghostGrid;
var brightGrid;

//button
var loadmap;
var resizeButton;
var imageElement;
var mapImg;
var key;

// RENDERING VARIABLES
var cellLength;

var LOAD_MAP_SELECTOR_ID = 'load-map-options';

function initEditor() {
    checkSetup();
    initFirebase();
    initConstants();
    initCanvas();
    initButton();
    initEditorData();
    initEventHandlers();
    resetEditor();
    initGrid();
    initSelectorContent();
}

function initConstants() {
    //THESE REPRESENT THE POSSIBLE STATS FOR EACH CELL
    EMPTY_CELL = 0;
    LIVE_CELL = 1;
    GHOST_CELL = 2;
    VOID_CELL = 3;

    P1_LIVE_CELL = 11;
    P2_LIVE_CELL = 21;
    P1_DEAD_CELL = 10;
    P2_DEAD_CELL = 20;

    //COLORS FOR RENDERING
    EMPTY_COLOR = "#f1f1f1";
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
    MAX_CELL_LENGTH = 64;
    MIN_CELL_LENGTH = 1;
    CELL_LENGTH_INC = 2;
    GRID_LINE_LENGTH_RENDERING_THRESHOLD = 8;
}

function initCanvas() {
    canvas = document.getElementById("editor_canvas");
    canvas2D = canvas.getContext("2d");

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
}

function initButton() {
    mapNameInput = document.getElementById("mapName");
    mapLevelInput = document.getElementById("mapLevel");

    loadmapInput = document.getElementById("loadMapField");

    rowInput = document.getElementById("resizeRow");
    columnInput = document.getElementById("resizeColumn");
    resizeButton = document.getElementById("resizeButton");

    save = document.getElementById("save_button");

    resetButton = document.getElementById("reset_button");
}

function initEditorData() {
    cellLength = 64;
}

function initGrid() {
    gridWidth = canvasWidth / cellLength;
    gridHeight = canvasHeight / cellLength;
    for (var i = 0; i <= gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            setGridCell(renderGrid, i, j, EMPTY_CELL);
        }
    }
}

function initFirebase() {
    this.db = firebase.database();
}

function initEventHandlers() {
    save.onclick = respondToSaveMap;
    canvas.onclick = respondToMouseClick;
    resizeButton.onclick = respondToResizeMap;
    resetButton.onclick = respondToResetEditor;
}

function respondToMouseClick(event) {
    // GET THE PATTERN SELECTED IN THE DROP DOWN LIST
    var patternsList = document.getElementById("cell_type");
    console.log("patternsList: " + patternsList);
    var selectedPattern = patternsList.options[patternsList.selectedIndex].value;
    console.log("selectedPattern: " + selectedPattern);
    if (selectedPattern === "images/Void.png") {
        SELECTED_CELL = VOID_CELL;
    }

    if (selectedPattern === "images/P1_LIVE.png") {
        SELECTED_CELL = P1_LIVE_CELL;
    }

    if (selectedPattern === "images/P2_LIVE.png") {
        SELECTED_CELL = P2_LIVE_CELL;
    }
    if (selectedPattern === "images/EMPTY_CELL.png") {
        SELECTED_CELL = EMPTY_CELL;
    }
    if (selectedPattern === "images/P1_DEAD.png") {
        SELECTED_CELL = P1_DEAD_CELL;
    }
    if (selectedPattern === "images/P2_DEAD.png") {
        SELECTED_CELL = P2_DEAD_CELL;
    }
    // CALCULATE THE ROW, COL OF THE CLICK
    var canvasCoords = getRelativeCoords(event);
    var clickCol = Math.floor(canvasCoords.x / cellLength);
    var clickRow = Math.floor(canvasCoords.y / cellLength);

    setGridCell(renderGrid, clickRow, clickCol, SELECTED_CELL);
    console.log("renderGrid: " + renderGrid);
    renderCells();
}

function respondToLoadMap() {
    var mapName = $('#' + LOAD_MAP_SELECTOR_ID).val();
    var mapRef = firebase.database().ref().child('campaign');
    mapRef.child(mapName).on('value', function(snapshot) {
        rowInput.value = snapshot.val().x;
        respondToResizeMap();
        renderGrid = snapshot.val().data;
        renderCells();
    });
}

function respondToResizeMap() {
    var customRow = rowInput.value;

    if ((customRow <= 16) && (customRow >= 4)) {
        if ((canvasWidth % customRow) !== 0) {
            console.log("need to change canvas width!");
            while ((canvasWidth % customRow) !== 0) {
                canvasWidth += 1;
            }
            canvas.width = canvasWidth;
            console.log("new canvas width: " + canvasWidth);
        }
    } else {
        window.alert("Please enter a number between 4 and 32");
        return false;
    }

    cellLength = canvasWidth / customRow;
    canvas2D.clearRect(0, 0, canvasWidth, canvasHeight);
    resetEditor();

}

function respondToSaveMap() {
    //add progress bar feature.
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 10);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            document.getElementById("progressbar_num").innerHTML = width * 1 + '%';
        }
    }

    if (playerId) {
        var mapName = mapNameInput.value;
        var mapLevel = mapLevelInput.value;

        mapName = mapName.replace(/^\s+/, '').replace(/\s+$/, '');
        if (mapName === '') { // name of the map
            // text was all whitespace
            console.log("Empty Field");
            return false;
        }


        if (mapLevel === '') { // level of the map
            // text was all whitespace
            console.log("Empty Field");
            return false;
        }
        mapLevel = parseInt(mapLevel);

        if (key !== null) {
            dbref = this.db.ref().child('campaign/' + key);
            dbref.update({
                map: mapName,
                data: renderGrid,
                x: gridWidth,
                y: gridWidth
            });
        } else {
            // database reference
            db.ref().child('campaign').once('value', function(snapshot) {
                // conditionalize this so the image doesn't change when a map name exists
                var storageRef = firebase.storage().ref();
                mapImg = canvas.toDataURL("image/png");
                console.log(mapImg);
                storageRef.child('images/' + mapName).putString(mapImg, 'data_url');

                // saves the actual map
                if (!snapshot.hasChild(mapName)) {
                    db.ref().child('campaign/' + mapName).set({
                        map: mapName,
                        level: mapLevel,
                        data: renderGrid,
                        x: gridWidth,
                        y: gridWidth,
                        story: ''
                    });
                } else {
                    alert("The map name already exists");
                }
            });
        }
    } else {
        alert('You must first log in to use this feature');
    }
}

function respondToLoadAMap() {
    var loadMapName = loadmapInput.value;
    dbref = this.db.ref().child('campaign');
    dbref.child(loadMapName).on("value", function(snapshot) {
        rowInput.value = snapshot.val().x;
        respondToResizeMap();
        mapNameInput.value = snapshot.val().map;
        mapNameInput.disabled = true;
        renderGrid = snapshot.val().data;
        renderCells();
    });
}

function respondToResetEditor() {
    initEditor();
}

function renderCells() {
    //SET THE PROPER RENDER COLOR
    for (var i = 0; i <= gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            var cell = getGridCell(renderGrid, i, j);
            var leftNumber = Math.floor(cell / 10);
            var rightNumber = cell % 10;
            var x = j * cellLength;
            var y = i * cellLength;
            if (leftNumber > 0) {
                if (rightNumber === 0) {
                    console.log("DEAD_COLOR");
                    console.log("leftNumber: " + leftNumber);
                    canvas2D.fillStyle = DEAD_COLOR[leftNumber];
                    canvas2D.fillRect(x, y, cellLength, cellLength);
                } else {
                    canvas2D.fillStyle = LIVE_COLOR[leftNumber];
                    canvas2D.fillRect(x, y, cellLength, cellLength);
                }
            } else {
                if (rightNumber === 0) {
                    canvas2D.fillStyle = EMPTY_COLOR;
                    canvas2D.fillRect(x, y, cellLength, cellLength);
                }
            }

            if (rightNumber == 3) {
                canvas2D.fillStyle = VOID_COLOR;
                canvas2D.fillRect(x, y, cellLength, cellLength);
            }

        }
    }
    renderGridLines();
}

function resetEditor() {
    gridWidth = canvasWidth / cellLength; // width goes back to default
    gridHeight = canvasHeight / cellLength; // height goes back to default
    mapNameInput.value = ''; // name field clear
    mapNameInput.disabled = false;
    mapLevelInput.value = ''; // level field clear
    mapLevelInput.disabled = false;
    key = null;
    renderGrid = [];
    initGrid();
    testGrid = [];
    console.log("Canvas Width: " + gridWidth);
    console.log("Canvas Height: " + gridHeight);

    renderGridLines();
    renderCells();
}

function renderGridLines() {
    // canvas style
    canvas2D.strokeStyle = GRID_LINES_COLOR;

    // vertical lines
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

    // horizontal lines
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
    if ((row < 0) || (col < 0) || (row >= gridHeight) || (col >= gridWidth)) {
        return false;
    } else {
        return true;
    }
}


function getRelativeCoords(event) {
    if (event.offsetX !== undefined && event.offsetY !== undefined) {
        return {
            x: event.offsetX,
            y: event.offsetY
        };
    } else {
        return {
            x: event.layerX,
            y: event.layerY
        };
    }
}

function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions.');
    } else if (config.storageBucket === '') {
        window.alert('Your Firebase Storage bucket has not been enabled. Sorry about that. This is ' +
            'actually a Firebase bug that occurs rarely. ' +
            'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
            'and make sure the storageBucket attribute is not empty. ' +
            'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
            'displayed there.');
    }
}

function initSelectorContent() {
    var mapRef = firebase.database().ref('campaign'); // maps reference
    mapRef.once("value", function(snapshot) {
        var optionHTML = '<option value="" disabled selected>Load Existing Map</option>';
        snapshot.forEach(function(data) {
            optionHTML += '<option value="' + data.key + '">' + data.key + '</option>';
        });
        $("#" + LOAD_MAP_SELECTOR_ID).html(optionHTML);
        $("#" + LOAD_MAP_SELECTOR_ID).change(respondToLoadMap);
    });
}
