'use strict'

// return object with column field normalized and type field with a previous type
function columnNormalizer (column, dialect) {

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
        column = {}
    } else {
        if (typeof column.type === 'string') {
            typeString = column.type
            column.type = {
                name: typeString
            }
        } else {
            delete column.type
        }
    } 

    if (!column.type) {
        return column
    }
    var type = column.type
    type.name = typeString = typeString.trim().toUpperCase()

    var arr = type.name.match(/^([A-Z\s]+)(?:\(([0-9,\s]+)\))?$/i)

    if(arr === null) {
        return column
    }

    var t
    if (arr[1]) {
        arr[1] = arr[1].trim()
        if(t = dialect.types[arr[1]]) {
            type.name = dialect.types[arr[1]].name
    
            if (t.range === undefined) t.range = [0,0]
    
            arr[2] = arr[2] ? arr[2].split(',').map(function(e) { return parseInt(e) }) : []
            if (t.range[0] <= arr[2].length && arr[2].length <= t.range[1]) {
                type.params = arr[2]
            }
        }
    }
    if (!type.params) {
        type.name = typeString
    }


    return column
}

module.exports = columnNormalizer