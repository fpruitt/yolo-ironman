var Loop = require("<scripts>/utilities/Loop")
var Input = require("<scripts>/utilities/Input")

var World = require("<scripts>/components/World")
var Jack = require("<scripts>/components/Jack")
var GameFrame = require("<scripts>/components/GameFrame")
var Camera = require("<scripts>/components/Camera")

var WorldStore = require("<scripts>/stores/WorldStore")
var JackStore = require("<scripts>/stores/JackStore")

var myid = null

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(JackStore, "jacks"),
        Phlux.connectStore(WorldStore, "world"),
    ],
    render: function() {
        if(myid != null) {
            return (
                <GameFrame>
                    <Camera target={this.state.jacks[myid]}>
                        <World data={this.state.world}/>
                        {this.renderJacks()}
                    </Camera>
                </GameFrame>
            )
        } else {
            return (
                <GameFrame>
                    <Camera zoom={7}>
                        <World data={this.state.world}/>
                        {this.renderJacks()}
                    </Camera>
                </GameFrame>
            )
        }
    },
    renderJacks: function() {
        var renderings = []
        for(var id in this.state.jacks) {
            var jack = this.state.jacks[id]
            renderings.push(
                <Jack key={id} data={jack}/>
            )
        }
        return renderings
    },
    componentDidMount: function() {
        var Socket = SocketIO("http://66.85.234.122:31337")
        Socket.on("connect", function() {
            setTimeout(function() {
                myid = ShortID.generate()
                navigator.geolocation.getCurrentPosition(function(position) {
                    Socket.emit("join", myid, {
                        "lat": position.coords.latitude,
                        "long": position.coords.longitude
                    })
                })
            }, 1000)
        })
        Socket.on("update jack", function(id, data) {
            JackStore.updateJack(id, data)
        })
        Socket.on("remove jack", function(id) {
            JackStore.removeJack(id)
        })
        Socket.on("disconnect", function() {
            window.location = window.location
        })
        Loop(function(delta) {
            JackStore.updateJackFromLoop(myid, delta, function(jack) {
                Socket.emit("update jack", myid, jack)
            })
        })
    }
})

module.exports = Game
