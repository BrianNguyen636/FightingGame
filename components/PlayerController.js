class PlayerController {
  constructor(player, game) {
    this.player = player;
    this.game = game;

    this.yVelocity = 0;
    this.xVelocity = 0;

    this.grounded = false;
    this.prejump = 0;
    this.dashing = false;

    this.prejumpFrames = 5;
    this.fWalk = 150;
    this.bWalk = 150;
    this.dashSpeed = 8;
    this.dashAccel = 1;
    this.dashTimer = 0;
    this.dashDuration = 30;
    this.backdashTimer = 0;
    this.backdashDuration = 30;
    this.backdashVelocity = 8;

    this.jumpStrength = 11;
    this.gravity = 0.2;
    this.jumpDistance = 5;
  }

  updateState() {
    if (this.player.state == 6) {
      // ANY LOCK OUT STATES HERE
      this.prejump -= 1;
      if (this.prejump <= 0) {
        this.prejump = 0;
        this.player.state = 7;
      }
    } else if (this.dashing) {
      if (inputManager.latest.movement == 6 || inputManager.dash) {
        this.player.state = 4;
      } else {
        // this.player.state = 9;
        // this.dashTimer = this.dashDuration;
        this.dashing = false;
      }
    } else if (this.player.state == 5 && this.backdashTimer > 0) {
      this.backdashTimer -= 1;
    } else if (this.grounded) {
      //GROUNDED STATES
      this.player.state = 0;

      if (inputManager.down) {
        this.player.state = 1;
      } else {
        if (inputManager.right && !inputManager.left) {
          if ((this.player.facing = 0)) {
            this.player.state = 3;
          } else {
            this.player.state = 2;
          }
          //   this.dashing = inputManager.dashCheck(6) || inputManager.dash; //forward dash
          this.dashing = inputManager.dashCheck(6) || inputManager.dash;
        }
        if (inputManager.left && !inputManager.right) {
          if ((this.player.facing = 0)) this.player.state = 2;
          else this.player.state = 3;

          if (inputManager.dashCheck(4) || inputManager.dash) {
            //back dash
            this.player.state = 5;
            this.backdashTimer = this.backdashDuration;
          }
        }
        if (inputManager.up && !inputManager.upHold && this.prejump == 0) {
          //START THE JUMP
          this.player.state = 6;
          this.prejump = this.prejumpFrames;
        }
      }
    } else {
      //AIRBORNE STATES
      if (this.yVelocity >= 0) {
        this.player.state = 8;
      }
    }
  }

  updateMovement() {
    this.player.y += this.yVelocity;
    this.player.x += this.xVelocity;
    if (this.player.state == 2) {
      this.player.x += this.fWalk * gameEngine.clockTick;
    }
    if (this.player.state == 3) {
      this.player.x -= this.fWalk * gameEngine.clockTick;
    }
    // Handle dash state
    if (this.player.state == 4) {
      // If dashing, accelerate up to dash speed
      if (this.xVelocity < this.dashSpeed) {
        this.xVelocity += this.dashAccel;
        if (this.xVelocity > this.dashSpeed) this.xVelocity = this.dashSpeed;
      }
    }

    if (this.player.state == 5) {
      this.xVelocity = -this.backdashVelocity;
    }
    if (this.player.state == 7 && this.grounded) {
      // JUMP
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
    if (
      this.player.y + this.player.yBoxOffset >= floor &&
      this.yVelocity >= 0
    ) {
      //Check grounded
      this.yVelocity = 0;
    //   if (this.player.state != 4 && this.player.state != 5) this.xVelocity = 0;
      if (Math.abs(this.xVelocity) > 0 && this.player.state != 4 && this.player.state != 5) {
        if (this.xVelocity > 0) this.xVelocity -= 0.5;
        if (this.xVelocity < 0) this.xVelocity += 0.5;
        // console.log(this.xVelocity);
      }
      this.player.y = floor - this.player.yBoxOffset;
      this.grounded = true;
    }
  }

  update() {
    this.updateState();
    this.updateMovement();
  }
}
