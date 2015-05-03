var Loop = require("<scripts>/utilities/Loop")
var Input = require("<scripts>/utilities/Input")

var World = require("<scripts>/components/World")
var Jack = require("<scripts>/components/Jack")
var GameFrame = require("<scripts>/components/GameFrame")
var Camera = require("<scripts>/components/Camera")

var WorldStore = require("<scripts>/stores/WorldStore")
var JackStore = require("<scripts>/stores/JackStore")

var myid = ShortID.generate()
var socket = SocketIO("http://localhost:1337")

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(JackStore, "jacks"),
        Phlux.connectStore(WorldStore, "world"),
    ],
    render: function() {
        return (
            <GameFrame>
                <Camera target={this.state.jacks[myid]}>
                    <World data={this.state.world}/>
                    {this.renderJacks()}
                </Camera>
            </GameFrame>
        )
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
        socket.on("connect", function() {
            socket.emit("join", myid)
        })
        socket.on("update jack", function(id, data) {
            JackStore.updateJack(id, data)
        })
        socket.on("remove jack", function(id) {
            JackStore.removeJack(id)
        })
        socket.on("disconnect", function() {
            window.location = window.location
        })
        Loop(function(delta) {
            JackStore.updateJackFromLoop(myid, delta, function(jack) {
                socket.emit("update jack", myid, jack)
            })
        })
    }
})

module.exports = Game
