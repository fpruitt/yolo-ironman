var Input = {
    data: {/*keys go here*/},
    isHammered: function(key) {
        return this.data[key] === true
    },
    hammer: function(key) {
        this.data[key] = true
    },
    unhammer: function(key) {
        delete this.data[key]
    }
}

document.addEventListener("keydown", function(event) {
    if(!Input.isHammered(event.keyCode)) {
        Input.hammer(event.keyCode)
    }
})

document.addEventListener("keyup", function(event) {
	Input.unhammer(event.keyCode)
})

modules.export = Input
