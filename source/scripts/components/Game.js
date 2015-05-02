var Loop = require("<scripts>/utilities/Loop")
var Input = require("<scripts>/utilities/Input")



var jack = {
    position: {
        x: 5,
        y: 10
    },
    velocity: {
        x: 0,
        y: 0,
    },
    max_velocity: .25,
    acceleration: 5,
    deacceleration: 2
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
            // Input Processing
        	if(Input.isHammered(87)
        	|| Input.isHammered(38)) {
        		jack.velocity.y -= jack.acceleration *delta
        	}
        	if(Input.isHammered(83)
        	|| Input.isHammered(40)) {
        		jack.velocity.y += jack.acceleration * delta
        	}
        	if(Input.isHammered(65)
        	|| Input.isHammered(37)) {
        		jack.velocity.x -=  jack.acceleration *delta
        	}
        	if(Input.isHammered(68)
        	|| Input.isHammered(39)) {
        		jack.velocity.x +=  jack.acceleration * delta
        	}
            if(jack.velocity.x > jack.max_velocity)
                jack.velocity.x = jack.max_velocity
            if(jack.velocity.x < -jack.max_velocity)
                jack.velocity.x = -jack.max_velocity
                
            if(jack.velocity.y > jack.max_velocity)
                jack.velocity.y = jack.max_velocity
            if(jack.velocity.y < -jack.max_velocity)
                jack.velocity.y = -jack.max_velocity
            // Translation
            jack.position.x += jack.velocity.x
            jack.position.y += jack.velocity.y
            // Deacceleration 
            if(jack.velocity.x > 0)
            {
                jack.velocity.x -= jack.deacceleration * delta
                if(jack.velocity.x < 0)
                    jack.velocity.x = 0
            }
            else if (jack.velocity.x < 0) {
                jack.velocity.x += jack.deacceleration * delta
                if(jack.velocity.x > 0 )
                    jack.velocity.x = 0
            }
	        if(jack.velocity.y > 0)
            {
                jack.velocity.y -= jack.deacceleration * delta
                if(jack.velocity.y < 0)
                    jack.velocity.y = 0
            }
            else if (jack.velocity.y < 0) {
                jack.velocity.y += jack.deacceleration * delta
                if(jack.velocity.y > 0 )
                    jack.velocity.y = 0
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
