window.React = require("react/addons")
window.Phlux = require("<scripts>/utilities/Phlux")
window.SocketIO = require("socket.io-client")

window.WIDTH = 20
window.HEIGHT = 15

var Game = require("<scripts>/components/Game")
React.render(<Game/>, document.body)
