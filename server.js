var Path = require("path")
var HTTP = require("http")
var ShortID = require("shortid")
var Express = require("express")
var SocketIO = require("socket.io")

app = new Express()
app.use(Express.static(Path.join(__dirname, "/build")))

server = HTTP.Server(app)
server.listen(1337, function() {
	console.log("127.0.0.1:1337")
})

var alldata = {}

io = SocketIO(server)
io.on("connection", function(socket) {
	var myid = null
	for(var id in alldata) {
		socket.emit("update jack", id, alldata[id])
	}
	socket.on("join", function(id) {
		myid = id
		alldata[id] = {
			"position": {
				"x": 10,
				"y": 15
            },
			"velocity": {
				"x": 0,
				"y": 0
            },
			"maxvelocity": 0.2,
			"acceleration": 5,
			"deacceleration": 1.5
        }
		console.log(myid + " has joined!")
		socket.emit("update jack", id, alldata[id])
		socket.broadcast.emit("update jack", id, alldata[id])
	})
	socket.on("update jack", function(id, data) {
		alldata[id] = data
		socket.broadcast.emit("update jack", id, alldata[id])
	})
	socket.on("disconnect", function() {
		delete alldata[myid]
		console.log(myid + " has quit")
		socket.broadcast.emit("remove jack", myid)
	})
})
