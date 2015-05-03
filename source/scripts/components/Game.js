var Loop = require("<scripts>/utilities/Loop")
var Input = require("<scripts>/utilities/Input")

var World = require("<scripts>/components/World")
var Jack = require("<scripts>/components/Jack")
var GameFrame = require("<scripts>/components/GameFrame")
var Camera = require("<scripts>/components/Camera")

var WorldStore = require("<scripts>/stores/WorldStore")
var JackStore = Phlux.createStore({
    initiateStore: function() {
        this.data = {
            position: {
                x: 10,
                y: 15
            },
            velocity: {
                x: 0,
                y: 0,
            },
            max_velocity: 0.2,
            acceleration: 5,
            deacceleration: 1.5
        }
    },
    update: function(delta) {
        // Input Processing
        if(Input.isHammered(87)
        || Input.isHammered(38)) {
            this.data.velocity.y -= this.data.acceleration * delta
        }
        if(Input.isHammered(83)
        || Input.isHammered(40)) {
            this.data.velocity.y += this.data.acceleration * delta
        }
        if(Input.isHammered(65)
        || Input.isHammered(37)) {
            this.data.velocity.x -=  this.data.acceleration * delta
        }
        if(Input.isHammered(68)
        || Input.isHammered(39)) {
            this.data.velocity.x +=  this.data.acceleration * delta
        }
        // Maximum Velocity
        if(this.data.velocity.x > this.data.max_velocity)
            this.data.velocity.x = this.data.max_velocity
        if(this.data.velocity.x < -this.data.max_velocity)
            this.data.velocity.x = -this.data.max_velocity
        if(this.data.velocity.y > this.data.max_velocity)
            this.data.velocity.y = this.data.max_velocity
        if(this.data.velocity.y < -this.data.max_velocity)
            this.data.velocity.y = -this.data.max_velocity
        // Translation
        if(WorldStore.getTile(this.data.position.x + this.data.velocity.x, this.data.position.y).passable) {
            this.data.position.x += this.data.velocity.x;
            this.trigger()
        } else {
            this.data.velocity.x = 0;
        }
        if(WorldStore.getTile(this.data.position.x, this.data.position.y+this.data.velocity.y).passable) {
            this.data.position.y += this.data.velocity.y;
            this.trigger()
        } else {
            this.data.velocity.y = 0;
        }
        // Deacceleration
        if(this.data.velocity.x > 0) {
            this.data.velocity.x -= this.data.deacceleration * delta
            if(this.data.velocity.x < 0)
                this.data.velocity.x = 0
        }
        else if (this.data.velocity.x < 0) {
            this.data.velocity.x += this.data.deacceleration * delta
            if(this.data.velocity.x > 0 )
                this.data.velocity.x = 0
        }
        if(this.data.velocity.y > 0) {
            this.data.velocity.y -= this.data.deacceleration * delta
            if(this.data.velocity.y < 0)
                this.data.velocity.y = 0
        }
        else if (this.data.velocity.y < 0) {
            this.data.velocity.y += this.data.deacceleration * delta
            if(this.data.velocity.y > 0 )
                this.data.velocity.y = 0
        }
    }
})

var socket = SocketIO("http://localhost:1337")
socket.on("connect", function() {
    //console.log("connected!")
})

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(JackStore, "jack"),
        Phlux.connectStore(WorldStore, "world"),
    ],
    render: function() {
        return (
            <GameFrame>
                <Camera target={this.state.jack}>
                    <World data={this.state.world}/>
                    <Jack data={this.state.jack}/>
                </Camera>
            </GameFrame>
        )
    },
    componentDidMount: function() {
        Loop(function(delta) {
            JackStore.update(delta)
        })
    }
})

module.exports = Game
