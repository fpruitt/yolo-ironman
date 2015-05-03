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

var jacks = {}
var relics = {
	"a": {
		"position": {
			"x": 86,
			"y": 4
		},
		"color": "white",
		"width": 2,
		"height": 2
	},
	"b": {
		"position": {
			"x": 34,
			"y": 21
		},
		"color": "white",
		"width": 2,
		"height": 2
	},
	"d": {
		"position": {
			"x": 86,
			"y": 64
		},
		"color": "white",
		"width": 2,
		"height": 2
	},
	"e": {
		"position": {
			"x": 33,
			"y": 59
		},
		"color": "white",
		"width": 2,
		"height": 2
	}
}

io = SocketIO(server)
io.on("connection", function(socket) {
	for(var id in jacks) {
		socket.emit("update jack", id, jacks[id])
	}
	for(var id in relics) {
		socket.emit("update relic", id, relics[id])
	}
	var myid = null
	socket.on("join", function(id, coords) {
		// Geolocate a Team
		myid = id
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
		// Create a Player
		jacks[id] = {
			"position": {
				"x": gighacks[team.city].spawn.x,
				"y": gighacks[team.city].spawn.y
            },
			"velocity": {
				"x": 0,
				"y": 0
			},
			"maxvelocity": 0.2,
			"acceleration": 5,
			"deacceleration": 1.5,
			"width": 1,
			"height": 1,
			"color": gighacks[team.city].color,
			"city": team.city
        }
		// Publish and Broadcast
		console.log(myid + " has joined!")
		socket.emit("update jack", id, jacks[id])
		socket.broadcast.emit("update jack", id, jacks[id])
	})
	socket.on("update jack", function(id, data) {
		jacks[id] = data
		socket.broadcast.emit("update jack", id, jacks[id])
	})
	socket.on("claim relic", function(id, color) {
		relics[id].color = color
		socket.broadcast.emit("update relic", id, relics[id])
	})
	socket.on("disconnect", function() {
		delete jacks[myid]
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
		},
		"spawn": {
			"x": 26,
			"y": 84
		},
		"color": "green"
	},
	"kansascity": {
		"coords": {
			"lat": 39.0997,
			"long": -94.5783
		},
		"spawn": {
			"x": 53,
			"y": 56
		},
		"color": "purple"
	},
	"chattanooga": {
		"coords": {
			"lat": 35.0456,
			"long": -85.2672
		},
		"spawn": {
			"x": 11,
			"y": 19
		},
		"color": "orange"
	},
	"burlington": {
		"coords": {
			"lat": 44.4758,
			"long": -73.2119
		},
		"spawn": {
			"x": 88,
			"y": 70
		},
		"color": "blue"
	},
	"charlotte": {
		"coords": {
			"lat": 35.2269,
			"long": -80.8433
		},
		"spawn": {
			"x": 66,
			"y": 25
		},
		"color": "red"
	},
}
