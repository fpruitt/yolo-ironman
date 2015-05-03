var Loop = require("<scripts>/utilities/Loop")
var Input = require("<scripts>/utilities/Input")

var World = require("<scripts>/components/World")
var Jack = require("<scripts>/components/Jack")
var GameFrame = require("<scripts>/components/GameFrame")
var Camera = require("<scripts>/components/Camera")

var WorldStore = require("<scripts>/stores/WorldStore")
var JackStore = require("<scripts>/stores/JackStore")
var RelicStore = require("<scripts>/stores/RelicStore")

var myid = null

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(JackStore, "jacks"),
        Phlux.connectStore(WorldStore, "world"),
        Phlux.connectStore(RelicStore, "relics"),
    ],
    render: function() {
        if(myid != null) {
            return (
                <GameFrame>
                    <Camera target={this.state.jacks[myid]}>
                        <World data={this.state.world}/>
                        {this.renderEntities(Jack, this.state.jacks)}
                        {this.renderEntities(Relic, this.state.relics)}
                    </Camera>
                    <GUI>
                        <World data={this.state.world}/>
                        {this.renderEntities(Jack, this.state.jacks)}
                        {this.renderEntities(Relic, this.state.relics)}
                    </GUI>
                </GameFrame>
            )
        } else {
            return (
                <GameFrame>
                    <Camera zoom={8}>
                        <World data={this.state.world}/>
                        {this.renderEntities(Jack, this.state.jacks)}
                        {this.renderEntities(Relic, this.state.relics)}
                    </Camera>
                </GameFrame>
            )
        }
    },
    renderEntities: function(Class, data) {
        var renderings = []
        for(var id in data) {
            renderings.push(
                <Class key={id} data={data[id]}/>
            )
        }
        return renderings
    },
    componentDidMount: function() {
        //var Socket = SocketIO("http://66.85.234.122:31337")
        var Socket = SocketIO("http://127.0.0.1:1337")
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
        Socket.on("update relic", function(id, data) {
            RelicStore.data[id] = data
            RelicStore.trigger()
        })
        Socket.on("disconnect", function() {
            window.location = window.location
        })
        Loop(function(delta) {
            JackStore.updateJackFromLoop(myid, delta, function(jack) {
                Socket.emit("update jack", myid, jack)
            }, Socket)
        })
    }
})

module.exports = Game





var GUI = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        return {
            "top": "0em",
            "left": "0em",
            "fontSize": "0.05em",
            "position": "absolute",
            "borderRight": "1px solid black",
            "borderBottom": "1px solid black"
        }
    }
})

var Relic = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        return {
            width: "2em",
            height: "2em",
            position: "absolute",
            left: this.props.data.position.x - 1 + "em",
            top: this.props.data.position.y - 1 + "em",
            outlineWidth: "0.75em",
            outlineStyle: "solid",
            backgroundColor: "white",
            outlineColor: this.props.data.color
        }
    }
})
