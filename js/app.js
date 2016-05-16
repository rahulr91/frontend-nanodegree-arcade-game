var score = 0;
var level = 0;
var win = 0;
// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = 250;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if(this.x >500) {
        this.x = -100;
    }

    this.x += dt*(this.speed+level);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

player.prototype.update = function(dt) {


};

player.prototype.checkLevelUp = function() {
    if(win > 0 && win % 5 == 0){
        level += 100;
    }
}

player.prototype.win = function() {

    score += 10;
    win++;
    player.checkLevelUp();
    console.log(score);
    player._reset();

}

player.prototype._reset = function() {
    this.x = 200;
    this.y = 400;
}

player.prototype.lost = function() {

    score = 0;
    level = 0;
    win = 0;
    this._reset();
}

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "30px Arial";
    var lev = level/100 + 1;
    ctx.fillText("Score: "+score+ "                   Level: "+lev, 50, 100);
};
player.prototype.handleInput = function(direction) {
    if (direction == 'left') {
        if(this.x <= 0) {
            this.x += 50;
        }
        this.x -= 50; console.log("x:"+this.x);
    }
    if (direction == 'right') {
        if(this.x >= 400) {

            this.x -= 50;
        }
        this.x += 50; console.log("x:"+this.x);
    }
    if (direction == 'up') {
        if(this.y <= 0) {
            this.y += 50;
        }
        this.y -= 50; console.log("y:"+this.y);
    }
    if (direction == 'down') {
        if(this.y >= 400) {
            this.y -= 50;
        }
        this.y += 50; console.log("y:"+this.y);
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(0,145),
    new Enemy(-100,60),
    new Enemy(-150,230),
    new Enemy(0,60),
    new Enemy(-50,230),
    new Enemy(-250,145)
    // new Enemy(,145)
];
var player = new player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
