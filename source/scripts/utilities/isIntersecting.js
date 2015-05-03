function isIntersecting(a, b)
{
    a.width = a.width || 1
    a.height = a.height || 1
    b.width = b.width || 1
    b.height = b.height || 1

    var ax1 = a.position.x - (a.width / 2)
    var ax2 = a.position.x + (a.width / 2)
    var ay1 = a.position.y - (a.height / 2)
    var ay2 = a.position.y + (a.height / 2)
    var bx1 = b.position.x - (b.width / 2)
    var bx2 = b.position.x + (b.width / 2)
    var by1 = b.position.y - (b.height / 2)
    var by2 = b.position.y + (b.height / 2)

    if(ax1 > bx2) {return false}
    if(ay1 > by2) {return false}
    if(ax2 < bx1) {return false}
    if(ay2 < by1) {return false}

    return true
}

module.exports = isIntersecting
