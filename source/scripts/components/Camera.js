var Camera = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        var styles = {
            position: "absolute"
        }
        if(this.props.zoom != null) {
            styles.top = (100 / 2) * -1 + (HEIGHT / 2 * this.props.zoom) + "em"
            styles.left = (100 / 2) * -1 + (WIDTH / 2 * this.props.zoom) + "em"
            styles.fontSize = 1 / this.props.zoom + "em"
        } else if(this.props.target != null) {
            styles.top = this.props.target.position.y * -1 + (HEIGHT / 2) + "em"
            styles.left = this.props.target.position.x * -1 + (WIDTH / 2) + "em"
        }
        return styles
    }
})

module.exports = Camera
