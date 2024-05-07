class PlayerController {
    constructor(player, game) {
        this.player = player;
        this.game = game;

        this.yVelocity = 0;
        this.xVelocity = 0;

        this.grounded = false;

        this.fWalk = 300;
        this.bWalk = 300;
        this.dashSpeed = 400;
        this.gravity = 4200;
    };
    

    updateState() {
        this.player.state = 0;
        if (inputManager.down) {
            this.player.state = 1;
        } else {
            if (inputManager.right) {
                if (this.player.facing = 0) {
                    this.player.state = 3;
                } else {
                    this.player.state = 2;
                }
            }
            if (inputManager.left) {
                if (this.player.facing = 0) {
                    this.player.state = 2;
                } else {
                    this.player.state = 3;
                }
            }
        }
    };

    updateMovement() {
        this.yVelocity += this.gravity * gameEngine.clockTick; //Gravity
        if (this.player.state == 2) {
            this.player.x += this.fWalk * gameEngine.clockTick;
        }
        if (this.player.state == 3) {
            this.player.x -= this.fWalk * gameEngine.clockTick;
        }
    };

    update() {
        this.updateState();
        this.updateMovement();
    };
}