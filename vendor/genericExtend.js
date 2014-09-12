var util = require('util')
var unionKeys = require('./unionKeys')
var isObject  = require('./isObject')

function genericExtend(a, b, n, predicate, callback) {
    if (typeof predicate !== 'function') {
        predicate = function(a, b, key, nn) {
            return !((nn === undefined || nn > 0) && isObject(a) && isObject(b))
        }
    }
    if (typeof callback  !== 'function') callback = function(a, b) {
        return b || a
    }
    return generic_extend(a, b, n, predicate, callback) 
}

function generic_extend(a, b, n, predicate, callback, key) {
    var result
    
    if (!predicate(a, b, key, n)) {
        result = {}
        var keys = unionKeys(a, b)
        n = n && n-1
        keys.forEach(function(key) {
            var va = a[key]
              , vb = b[key]

            result[key] = generic_extend(va, vb, n, predicate, callback, key)
        })
    } else {
        n = n && n-1
        result = callback(a, b, key, n)
    }
    
    return result
}

module.exports = genericExtend