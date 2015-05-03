var tiledmap = require("<assets>/tilemap.json")

var WorldStore = Phlux.createStore({
    initiateStore: function() {
		this.data.tiles = {}
		this.data.width = tiledmap.width
		this.data.height = tiledmap.height
		var tiles = tiledmap.layers[0].data
		for(var x = 0; x < this.data.width; x++) {
		    for(var y = 0; y < this.data.height; y++) {
				var tile = tiles[y * this.data.width + x] - 1
		        this.data.tiles[x + "x" + y] = {
		            position: {
		                "x": x,
		                "y": y
		            },
		            "image": tile,
		            "passable": tile != 149 && tile != 194
		        }
		    }
		}
	},
    getTile: function(x, y){
        return this.data.tiles[Math.floor(x) + "x" + Math.floor(y)]
    }
})



module.exports = WorldStore
