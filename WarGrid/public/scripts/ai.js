// Bot
var Bot = function() {
    this.grid = updateGrid;
    this.cells = getCellNumber(updateGrid);
    this.victory = false;
};

Bot.prototype.loadMap = function(grid) {
    this.grid = grid;
    this.cells = getCellNumber();
};

Bot.prototype.level = function(level) {
    for (var i = 0; i < this.grid.length; i++) {
        var index = Math.floor((Math.random() * this.cells));
    }
};
