const gameEngine = new GameEngine();
const inputManager = new InputManager();
const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./assets/ReimuSprites.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	const player = new Player(gameEngine);
	inputManager.setCtx(ctx);
	gameEngine.init(ctx, player);
	gameEngine.start();
});
