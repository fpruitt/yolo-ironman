var Jack = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}></div>
        )
    },
    renderStyles: function() {
        return {
            width: "1em",
            height: "1em",
            position: "absolute",
            top: this.props.data.position.y + "em",
            left: this.props.data.position.x + "em",
            backgroundColor: "red"
        }
    }
})

module.exports = Jack
