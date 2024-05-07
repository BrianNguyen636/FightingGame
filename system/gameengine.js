// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
        this.boxView = false;
    };

    init(ctx, player) {
        this.ctx = ctx;
        inputManager.startInput();
        this.timer = new Timer();
        this.entities = [];
        this.addEntity(player);
        this.player = player;
    };

    start() {
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    reset() {
        this.init(this.ctx, new Player(this));
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    addEntity(entity) {
        this.entities.push(entity);
    };



    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            let entity = this.entities[i];
            entity.draw(this.ctx, this);
        }
    };



    update() {
        let entitiesCount = this.entities.length;
        
        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];
            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        for (let i = entitiesCount - 1; i >= 0; --i) {
            let entity = this.entities[i];
            if (entity.removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };


    pause() {
        if (!this.paused && !this.startMenu) {
            this.paused = true;
            this.menuController.selected = 0;
            ASSET_MANAGER.playSound("Pause");
            ASSET_MANAGER.pauseBGM();
        }
    };

    loop() {

        inputManager.update();
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();

    };

};