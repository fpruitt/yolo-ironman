var Loop = require("<scripts>/utilities/Loop")
var Input = require("<scripts>/utilities/Input")

var World = require("<scripts>/components/World")
var Jack = require("<scripts>/components/Jack")

var tiledmap = require("<assets>/tilemap.json")

var world = {
    tiles: {},
    getTile: function(x, y){
        return this.tiles[Math.floor(x) + "x" + Math.floor(y)]
    }
}

var tiles = tiledmap.layers[0].data
for(var x = 0; x < tiledmap.width; x++) {
    for(var y = 0; y < tiledmap.height; y++) {
        world.tiles[x + "x" + y] = {
            position: {
                x: x,
                y: y
            },
            image: tiles[y * tiledmap.width + x],
            passable: tiles[y * tiledmap.width + x] != 149 && tiles[y * tiledmap.width + x] != 195
        }
    }
}
world.width = tiledmap.width
world.height = tiledmap.height

var jack = {
    position: {
        x: 10,
        y: 15
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

var Camera = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>

        )
    },
    renderStyles: function(){
        return {
            position: 'absolute',
            top: this.props.target.position.y * -1 + HEIGHT/2 + 'em',
            left: this.props.target.position.x * -1 + WIDTH/2 + 'em'
        }
    }
})

var Game = React.createClass({
    render: function() {
        return (
            <GameFrame>
                <Camera target={jack}>
                    <World world={world}/>
                    <Jack data={jack}/>
                </Camera>
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
            // Maximum Velocity
            if(jack.velocity.x > jack.max_velocity)
                jack.velocity.x = jack.max_velocity
            if(jack.velocity.x < -jack.max_velocity)
                jack.velocity.x = -jack.max_velocity
            if(jack.velocity.y > jack.max_velocity)
                jack.velocity.y = jack.max_velocity
            if(jack.velocity.y < -jack.max_velocity)
                jack.velocity.y = -jack.max_velocity
            // Translation
            if(world.getTile(jack.position.x + jack.velocity.x, jack.position.y).passable)
                jack.position.x += jack.velocity.x;
            else
                jack.velocity.x = 0;
            
            if(world.getTile(jack.position.x, jack.position.y+jack.velocity.y).passable)
                jack.position.y += jack.velocity.y;
            else
                jack.velocity.y = 0;
            
            // Deacceleration
            if(jack.velocity.x > 0)
            {
                jack.velocity.x -= jack.deacceleration * delta
                if(jack.velocity.x < 0)
                    jack.velocity.x = 0;
            }
            else if (jack.velocity.x < 0) {
                jack.velocity.x += jack.deacceleration * delta
                if(jack.velocity.x > 0 )
                    jack.velocity.x = 0;
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

module.exports = Game
