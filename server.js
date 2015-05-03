var path = require("path")
var HTTP = require("http")
var Express = require("express")
var SocketIO = require("socket.io")

app = new Express()
app.use(Express.static(Path.join(__dirname, "/build")))

server = HTTP.Server(app)
server.listen(1337, function() {
	console.log("127.0.0.1:1337")
})

io = SocketIO(server)
io.on("connection", function(socket) {
	console.log("connected!")
	socket.on("disconnect", function() {
		console.log("disconnected!")
	})
})
