var isObject = require('../vendor/isObject')
var genericExtend = require('../vendor/genericExtend')

function predicate(a, b, key, n) {
    return !(n > 0 && key !== 'type' && isObject(a) && isObject(b))
}

function rareExtend(a, b, key, n) {
    var type
    if (key === 'type' && a && b) {
        if(a.params && b.params ) {
            type = b
        } else if (a.params) {
            type = a
        } else {
            type = b
        }
    } else {
        type = b || a
    }
    return type
}

function modelExtend(a, b) {
    return genericExtend(a, b, 2, predicate, rareExtend)
}

module.exports = modelExtend