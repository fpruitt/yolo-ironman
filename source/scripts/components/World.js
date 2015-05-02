var World = React.createClass({
    render: function() {
        return (
            <canvas ref="canvas"
                style={this.renderStyles()}
                width={this.props.world.width * 32}
                height={this.props.world.height * 32}/>
        )
    },
    renderStyles: function() {
        return {
            "width": this.props.world.width + "em",
            "height": this.props.world.height + "em"
        }
    },
    renderCanvas: function() {
        var canvas = this.refs.canvas.getDOMNode().getContext("2d")
        var img = new Image()
        img.src = "assets/tileset.bmp"
        img.onload = function() {
            for(var index in this.props.world.tiles) {
                var tile = this.props.world.tiles[index]
                var x = tile.position.x * 32
                var y = tile.position.y * 32
                var sy = Math.floor(tile.image / 64)
                var sx = tile.image - (Math.floor(tile.image / 64) * 64) - 1
                canvas.drawImage(img, sx * 32, sy * 32, 32, 32, x, y, 32, 32)
            }
        }.bind(this)
    },
    componentDidMount: function() {
        this.renderCanvas()
    },
    shouldComponentUpdate: function(props) {
        return props.world.tiles != this.props.world.tiles
    },
    componentDidUpdate: function() {
        this.renderCanvas()
    },
    tiles: {
        "images": {
            195: "#0000CC",
            3351: "#00CC00",
        }
    }
})

module.exports = World
