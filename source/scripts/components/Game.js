var Loop = require("<scripts>/utilities/Loop")
var Input = require("<scripts>/utilities/Input")

var speed = 1

var jack = {
    position: {
        x: 5,
        y: 10
    }
}

var GameFrame = require("<scripts>/components/GameFrame")

var Game = React.createClass({
    render: function() {
        return (
            <GameFrame>
                Hello World?
                <Jack data={jack}/>
            </GameFrame>
        )
    },
    componentDidMount: function() {
        Loop(function(delta) {
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

            this.forceUpdate()
        }.bind(this))
    }
})

var Jack = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}></div>
        )
    },
    renderStyles: function() {
        return {
            width: "1em",
            height: "1em",
            position: "absolute",
            top: this.props.data.position.y + "em",
            left: this.props.data.position.x + "em",
            backgroundColor: "red"
        }
    }
})

module.exports = Game
