class PlayerController {
    constructor(player, game) {
        this.player = player;
        this.game = game;

        this.yVelocity = 0;
        this.xVelocity = 0;

        this.grounded = false;
        this.prejump = 0;

        this.prejumpFrames = 5;
        this.fWalk = 200;
        this.bWalk = 200;
        this.dashSpeed = 400;

        this.jumpStrength = 11;
        this.gravity = 0.20;
        this.jumpDistance = 5;
    };

    updateState() {
        if (this.player.state == 6) { // ANY LOCK OUT STATES HERE
            this.prejump -= 1;
            if (this.prejump <= 0) {
                this.prejump = 0;
                this.player.state = 7;
            }
        }
        else if (this.grounded) { //GROUNDED STATES
            this.player.state = 0;

            if (inputManager.down) {
                this.player.state = 1;
            } else {
                if (inputManager.right) {
                    if (this.player.facing = 0) this.player.state = 3;
                    else this.player.state = 2;
                }
                if (inputManager.left) {
                    if (this.player.facing = 0) this.player.state = 2;
                    else this.player.state = 3;
                }
                if ((inputManager.up && !inputManager.upHold) && this.prejump == 0) { //START THE JUMP
                    this.player.state = 6;
                    this.prejump = this.prejumpFrames;
                }
            }
        } else { //AIRBORNE STATES
            if (this.yVelocity >= 0) {
                this.player.state = 8;
            }
        }


        
    };

    updateMovement() {
        this.player.y += this.yVelocity;
        this.player.x += this.xVelocity;
        if (this.player.state == 2) { this.player.x += this.fWalk * gameEngine.clockTick;}
        if (this.player.state == 3) { this.player.x -= this.fWalk * gameEngine.clockTick;}

        if (this.player.state == 7 && this.grounded) { // JUMP
            this.grounded = false;
            this.yVelocity = -this.jumpStrength;
            if (inputManager.right) {
                this.xVelocity = this.jumpDistance;
            }
            if (inputManager.left) {
                this.xVelocity = -this.jumpDistance;
            }
        }

        if (!this.grounded) this.yVelocity += this.gravity; //Gravity
        if (this.player.y + this.player.yBoxOffset >= floor && this.yVelocity >= 0) { //Check grounded
            this.yVelocity = 0;
            this.xVelocity = 0;
            this.player.y = floor - this.player.yBoxOffset;
            this.grounded = true;
        }
    };

    update() {
        this.updateState();
        this.updateMovement();
    };
}