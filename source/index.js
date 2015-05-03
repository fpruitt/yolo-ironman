window.React = require("react/addons")
window.ShortID = require("shortid")
window.SocketIO = require("socket.io-client")
window.Phlux = require("<scripts>/utilities/Phlux")

window.WIDTH = 20
window.HEIGHT = 15

var Game = require("<scripts>/components/Game")
React.render(<Game/>, document.body)
