var Jack = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                <div style={this.renderCityStyles()}>
                    {this.props.data.city}
                </div>
            </div>
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
    },
    renderCityStyles: function() {
        return {
            fontSize: "0.5em",
            textAlign: "center",
            fontFamily: "monospace",
            width: "5em",
            position: "absolute",
            left: "-2.5em",
            top: "-1.25em",
        }
    }
})

module.exports = Jack
