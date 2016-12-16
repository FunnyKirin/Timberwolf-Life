//
var Bot = function() {
    this.grid = [];
    this.victory = false;
};

Bot.prototype.loadMap = function(grid) {
    this.grid = grid;
};

Bot.prototype.level = function(level) {
    switch (level) {
        case 1: this.level1(); break;
        case 2: this.level2(); break;
        case 3: this.level3(); break;
        case 4: this.level4(); break;
        case 5: this.level5(); break;
        case 6: this.level6(); break;
        case 7: this.level7(); break;
        case 8: this.level8(); break;
        case 9: this.level9(); break;
        default: console.log("lol the program shouldn't be here");
    }
};

Bot.prototype.level1 = function() {

};
Bot.prototype.level2 = function() {

};
Bot.prototype.level3 = function() {

};
Bot.prototype.level4 = function() {

};
Bot.prototype.level5 = function() {

};
Bot.prototype.level6 = function() {

};
Bot.prototype.level7 = function() {

};
Bot.prototype.level8 = function() {

};
Bot.prototype.level9 = function() {

};
