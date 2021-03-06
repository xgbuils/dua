'use strict'

function Dialect() {}

Dialect.prototype.escapeIdentifier = function(name) {
    var arr = this.escape_chars
    for (var i in arr) {
        var e = arr[i]
        if ((name.indexOf(e.open) === -1) && (e.open === e.close || name.indexOf(e.close) === -1)) {
            return e.open + name + e.close
        }
    }
    
    return arr[0].open + name.replace(this.replace_chars, '') + arr[0].close
}

Dialect.prototype.columnNormalizer = function (column) {

    var typeString
    var typeOfColumn = typeof column
    if (typeOfColumn === 'string') {
        typeString = column
        column = {
            type: {
                name: typeString
            }
        }
    } else if (typeOfColumn !== 'object' || column === null) {
        column = {
            type: {
                name: '',
            }
        }
    } else {
        if (column.type && typeof column.type === 'string') {
            typeString = column.type
            column.type = {
                name: typeString
            }
        } else {
            column.type = {
                name: '',
            }
        }
    }

    

    if (!column.type.name) {
        return column
    }
    var type = column.type
    type.name = typeString = typeString.trim().toUpperCase()

    var arr = type.name.match(/^([A-Z\s]+)\s*(?:\(([0-9,\s]+)\))?$/i)

    if(arr === null) {
        return column
    }

    var t
    if (arr[1] && (t = this.types[arr[1]])) {
        type.name = this.types[arr[1]].name

        if (t.range === undefined) t.range = [0,0]

        arr[2] = arr[2] ? arr[2].split(',').map(function(e) { return parseInt(e) }) : []
        if (t.range[0] <= arr[2].length && arr[2].length <= t.range[1]) {
            type.params = arr[2]
        } else {
            type.name   = typeString
        }
    } else {
        type.name   = typeString
    }

    return column
}

module.exports = Dialect