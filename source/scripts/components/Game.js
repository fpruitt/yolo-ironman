var Loop = require("<scripts>/utilities/Loop")
var Input = require("<scripts>/utilities/Input")

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
})

var GameFrame = require("<scripts>/components/GameFrame")

var Game = React.createClass({
    render: function() {
        return (
            <GameFrame>
                Hello World?
            </GameFrame>
        )
    }
})

module.exports = Game
