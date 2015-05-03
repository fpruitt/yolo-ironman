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
	socket.on("join", function(id, coords) {
		var team = {
			distance: Number.MAX_VALUE
		}
		for(var city in gighacks) {
			var distance = getDistance(coords, gighacks[city].coords)
			if(distance < team.distance) {
				team.distance = distance
				team.city = city
			}
		}
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

function getDistance(coords1, coords2) {
	var lat1 = coords1.lat
	var long1 = coords1.long
	var lat2 = coords2.lat
	var long2 = coords2.long
	var deg2rad = function(angle) {
		return angle * (Math.PI / 180)
	}
	var dlat = deg2rad(lat2 - lat1)
	var dlong = deg2rad(long2 - long1)
	var a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
	Math.sin(dlong / 2) * Math.sin(dlong / 2)
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	var distance = 6371 * c
	return distance
}

var gighacks = {
	"sanfrancisco": {
		"coords": {
			"lat": 37.7833,
			"long": -122.4167
		}
	},
	"kansascity": {
		"coords": {
			"lat": 39.0997,
			"long": -94.5783
		}
	},
	"chattanooga": {
		"coords": {
			"lat": 35.0456,
			"long": -85.2672
		}
	},
	"burlington": {
		"coords": {
			"lat": 44.4758,
			"long": -73.2119
		}
	},
	"charlotte": {
		"coords": {
			"lat": 35.2269,
			"long": -80.8433
		}
	},
}
