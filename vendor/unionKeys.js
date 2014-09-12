function unionKeys() {
    var n = arguments.length
    var keysObject = {}
    var keys = []
    for (var i = 0; i < n; ++i) {
        var source = arguments[i]
        for(var key in source) {
            if(!keysObject[key]) {
                keysObject[key] = true
                keys.push(key)
            }
        }
    }

    return keys
}

module.exports = unionKeys