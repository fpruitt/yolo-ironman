var graphics = new PIXI.Graphics();
var stage = new PIXI.Stage(0xEEE);
var renderer = PIXI.autoDetectRenderer(400, 300);
document.body.appendChild(renderer.view);
renderer.render(stage);
var texture = PIXI.Texture.fromImage("jack.jpg");
var jack = new PIXI.Sprite(texture);
jack.anchor.x = 0.5
jack.anchor.y = 0.5

jack.position.x = 200;
jack.position.y = 150;

jack.scale.x = 0.01
jack.scale.y = 0.01

stage.addChild(jack);

function animate()
{
	requestAnimFrame(animate);
	renderer.render(stage);
}

animate()