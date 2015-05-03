var Input = require("<scripts>/utilities/Input")
var isIntersecting = require("<scripts>/utilities/isIntersecting")

var WorldStore = require("<scripts>/stores/WorldStore")
var RelicStore = require("<scripts>/stores/RelicStore")

var JackStore = Phlux.createStore({
	updateJack: function(id, data) {
		this.data[id] = data
		this.trigger()
	},
	removeJack: function(id) {
		delete this.data[id]
		this.trigger()
	},
	updateJackFromLoop: function(id, delta, callback, Socket) {
		var jack = this.data[id]
		if(jack === undefined) {
			return
		}
		// Input
		if(Input.isHammered(87)
		|| Input.isHammered(38)) {
			jack.velocity.y -= jack.acceleration * delta
		}
		if(Input.isHammered(83)
		|| Input.isHammered(40)) {
			jack.velocity.y += jack.acceleration * delta
		}
		if(Input.isHammered(65)
		|| Input.isHammered(37)) {
			jack.velocity.x -=  jack.acceleration * delta
		}
		if(Input.isHammered(68)
		|| Input.isHammered(39)) {
			jack.velocity.x +=  jack.acceleration * delta
		}
        // Maximum Velocity
        if(jack.velocity.x > jack.maxvelocity)
            jack.velocity.x = jack.maxvelocity
        if(jack.velocity.x < -jack.maxvelocity)
            jack.velocity.x = -jack.maxvelocity
        if(jack.velocity.y > jack.maxvelocity)
            jack.velocity.y = jack.maxvelocity
        if(jack.velocity.y < -jack.maxvelocity)
            jack.velocity.y = -jack.maxvelocity
        // Translation
        if(WorldStore.getTile(jack.position.x + jack.velocity.x, jack.position.y).passable) {
            jack.position.x += jack.velocity.x;
            this.trigger()
        } else {
            jack.velocity.x = 0;
        }
        if(WorldStore.getTile(jack.position.x, jack.position.y+jack.velocity.y).passable) {
            jack.position.y += jack.velocity.y;
            this.trigger()
        } else {
            jack.velocity.y = 0;
        }
        // Deacceleration
        if(jack.velocity.x > 0) {
            jack.velocity.x -= jack.deacceleration * delta
            if(jack.velocity.x < 0)
                jack.velocity.x = 0
        }
        else if (jack.velocity.x < 0) {
            jack.velocity.x += jack.deacceleration * delta
            if(jack.velocity.x > 0 )
                jack.velocity.x = 0
        }
        if(jack.velocity.y > 0) {
            jack.velocity.y -= jack.deacceleration * delta
            if(jack.velocity.y < 0)
                jack.velocity.y = 0
        }
        else if (jack.velocity.y < 0) {
            jack.velocity.y += jack.deacceleration * delta
            if(jack.velocity.y > 0 )
                jack.velocity.y = 0
        }
		// Entity Collision
		for(var rid in RelicStore.data) {
			var relic = RelicStore.data[rid]
			if(isIntersecting(jack, relic)) {
				relic.color = jack.color
				RelicStore.trigger()
				Socket.emit("claim relic", rid, relic.color)
			}
		}
		// Return
		callback(jack)
    }
})

module.exports = JackStore
