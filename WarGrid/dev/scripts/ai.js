//
var Bot = function() {
    this.grid = [];
};

Bot.prototype.loadMap = function(grid) {
    this.grid = grid;
};

Bot.prototype.level = function(level) {
    switch (level) {
        case 1: Bot.level1(); break;
        case 2: Bot.level2(); break;
        case 3: Bot.level3(); break;
        case 4: Bot.level4(); break;
        case 5: Bot.level5(); break;
        case 6: Bot.level6(); break;
        case 7: Bot.level7(); break;
        case 8: Bot.level8(); break;
        case 9: Bot.level9(); break;
        default: console.log("lol the program shouldn't be here");
    }
};

Bot.level1 = function() {

};
Bot.level2 = function() {

};
Bot.level3 = function() {

};
Bot.level4 = function() {

};
Bot.level5 = function() {

};
Bot.level6 = function() {

};
Bot.level7 = function() {

};
Bot.level8 = function() {

};
Bot.level9 = function() {

};
