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

var Loop = function(func) {
    (function loop(time) {
    	func(Math.min((Date.now() - time) / 1000, 1))
        window.requestAnimationFrame(loop.bind(null, Date.now()))
    })(Date.now())
}

var Input = {
    data: {/*keys go here*/},
    isHammered: function(key) {
        return this.data[key] === true
    },
    hammer: function(key) {
        this.data[key] = true
    },
    unhammer: function(key) {
        delete this.data[key]
    }
}

document.addEventListener("keydown", function(event) {
    if(!Input.isHammered(event.keyCode)) {
        Input.hammer(event.keyCode)
    }
})

document.addEventListener("keyup", function(event) {
	Input.unhammer(event.keyCode)
})

var speed = 1

Loop(function(delta)
{
	if(Input.isHammered(87)
	|| Input.isHammered(38)) {
		jack.position.y -= speed
	}
	if(Input.isHammered(83)
	|| Input.isHammered(40)) {
		jack.position.y += speed
	}
	if(Input.isHammered(65)
	|| Input.isHammered(37)) {
		jack.position.x -= speed
	}
	if(Input.isHammered(68)
	|| Input.isHammered(39)) {
		jack.position.x += speed
	}
	renderer.render(stage);
})

var mapContainer = new PIXI.DisplayObjectContainer();
var mapTexture = new PIXI.RenderTexture();

var tilesetTexture = new PIXI.BaseTexture("32x32.bmp");
var grassTexture = new PIXI.Texture(tilesetTexture, new PIXI.Rectangle(0,0,32,32))
var grassSprite = new PIXI.Sprite(grassTexture);

mapContainer.addChild(grassSprite);
mapTexture.render(mapContainer);
var background = new PIXI.Sprite(texture);

stage.addChild(grassSprite);
renderer.render(stage);