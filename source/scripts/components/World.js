var SIZE = 32

var World = React.createClass({
    render: function() {
        return (
            <canvas ref="canvas"
                style={this.renderStyles()}
                width={this.props.data.width * SIZE}
                height={this.props.data.height * SIZE}/>
        )
    },
    renderStyles: function() {
        return {
            "width": this.props.data.width + "em",
            "height": this.props.data.height + "em"
        }
    },
    renderCanvas: function() {
        var canvas = this.refs.canvas.getDOMNode().getContext("2d")
        var img = new Image()
        img.src = "assets/tileset.bmp"
        img.onload = function() {
            for(var index in this.props.data.tiles) {
                var tile = this.props.data.tiles[index]
                var x = tile.position.x * SIZE
                var y = tile.position.y * SIZE
                var sy = Math.floor(tile.image / 64)
                var sx = tile.image - (Math.floor(tile.image / 64) * 64)
                canvas.drawImage(img, sx * SIZE, sy * SIZE, SIZE, SIZE, x, y, SIZE, SIZE)
            }
        }.bind(this)
    },
    componentDidMount: function() {
        this.renderCanvas()
    },
    shouldComponentUpdate: function(props) {
        return props.data.tiles != this.props.data.tiles
    },
    componentDidUpdate: function() {
        this.renderCanvas()
    }
})

module.exports = World
