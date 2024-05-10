class Player extends Character {
  constructor(game) {
    super("char", "Reimu", game, 400, 400, 378, 400, 700 - 378, 100);
    this.facing = 0;
    this.setController(new PlayerController(this, game));
  }

  loadAnimations() {
    this.makeAnimation(0, 0, 0, 1, 1); //IDLE
    this.makeAnimation(1, 1, 0, 1, 1); //CROUCH
    this.makeAnimation(2, 2, 0, 1, 1); //WALK F
    this.makeAnimation(3, 3, 0, 1, 1); //WALK B
    this.makeAnimation(4, 4, 0, 1, 1); //DASH
    this.makeAnimation(5, 5, 0, 1, 1); //BACKDASH

    this.makeAnimation(6, 6, 0, 1, 1); //PREJUMP
    this.makeAnimation(7, 6, 1, 1, 1); //JUMP
    this.makeAnimation(8, 6, 2, 1, 1); //FALL
    this.makeAnimation(9, 4, 0, 1, 1); //DASH DECELARATION
  }

  updateBB() {
    switch (this.state) {
      default:
        if (this.facing == 0) {
        } else {
        }
        break;
    }
  }

  update() {
    this.controller.update();
    this.updateBB();
  }

  draw(ctx) {
    // this.drawShadow(ctx);
    this.animations[this.facing][this.state].drawFrame(
      this.game.clockTick,
      ctx,
      this.x,
      this.y
    );

    if (this.game.boxView) {
      ctx.strokeStyle = "yellow";
      ctx.beginPath();

      ctx.rect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);

      ctx.stroke();
    }
  }
}
