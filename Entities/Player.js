class Player extends Character{
    constructor(game) {
        super("char", "Reimu", game, 
            400, 400, 
            378, 
            400, 700 - 378, 
            100);
        this.facing = 0;
        this.setController(new PlayerController(this, game));
    };

    loadAnimations() {
        this.makeAnimation(0, 0, 0, 1, 1); //IDLE
        this.makeAnimation(1, 1, 0, 1, 1); //CROUCH
        this.makeAnimation(2, 2, 0, 1, 1); //WALK F
        this.makeAnimation(3, 3, 0, 1, 1); //WALK B
        this.makeAnimation(4, 4, 0, 1, 1); //DASH
        this.makeAnimation(5, 5, 0, 1, 1); //BACKDASH
    };

    updateBB() {
        switch(this.state) {
            default:
                if (this.facing == 0) {
                    
                } else {
                    
                }
            break;
        } 
    };

    hurt(other) {
        if (this.invuln <= 0 ) {
            this.health -= 1;
            this.invuln = 2;
            this.state = 6;
            this.controller.knockback(this.BB.midX - other.BB.midX);
        }
    };

    getAttackDuration() {
        return this.controller.attackDuration;
    }

    updateAttackBox() {
        let time = this.animations[0][4].totalTime;
        if (this.controller.attackDuration > 2/7 * time) {
            if (this.facing == 0) {
                this.attackBox = new BoundingBox(this.x + 110* 1.5, this.y, 90* 1.5, 120* 1.5);
            } else {
                this.attackBox = new BoundingBox(this.x, this.y, 90* 1.5, 120* 1.5);
            }
        } else this.attackBox = null;
    };

    update() {
        this.controller.update();
        this.updateBB();
    };

    draw(ctx) {
        // this.drawShadow(ctx);
        if (this.invuln > 0 && !this.dead()) ctx.globalAlpha = 0.5;
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y);
        ctx.globalAlpha = 1;

        if (this.game.boxView) {
            ctx.strokeStyle = "yellow";
            ctx.beginPath();
            
            ctx.rect(this.BB.x, this.BB.y, this.BB.width, this.BB.height)
            
            ctx.stroke();
            if (this.attackBox != null) {
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.rect(this.attackBox.x, this.attackBox.y, this.attackBox.width, this.attackBox.height)
                ctx.stroke();
            }
        }
    };
}