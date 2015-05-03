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
            top: this.props.data.position.y - .5 + "em",
            left: this.props.data.position.x - .5 + "em",
            backgroundColor: this.props.data.color || "#EEE"
        }
    }
})

module.exports = Jack
