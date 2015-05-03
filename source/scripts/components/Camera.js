var Camera = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function(){
        if(this.props.target != null) {
            return {
                position: "absolute",
                top: this.props.target.position.y * -1 + (HEIGHT / 2) + "em",
                left: this.props.target.position.x * -1 + (WIDTH / 2) + "em"
            }
        }
    }
})

module.exports = Camera
