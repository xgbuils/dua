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

/*
create table
tableName
(
columnPK columnPKType
[columnName columnType ]
)
*/

Dialect.prototype.getTypeOfColumn = function (column) {
    var typeString  
    var typeOfColumn = typeof column
    if (typeOfColumn === 'string') {
        typeString = column
    } else if(typeOfColumn !== 'object') {
        typeString = ''
    } else if (!column.type) {
        typeString = ''
    } else if (typeof column.type !== 'string') {
        typeString = ''
    } else { 
        typeString = column.type
    }

    var type = {}
    if (typeString) {
    	typeString = typeString.trim().toUpperCase()

        var arr = typeString.match(/^([A-Z\s]+)\s*(?:\(([0-9,\s]+)\))?$/i)
        //console.log(typeString)
        if(arr[1]) {
        	type.name = this.types[arr[1]]
        }
        type.params = arr[2] ? arr[2].split(',').map(function(e) { return parseInt(e) }) : []
    } else {
    	type.params = []
    }

    return type;
}

module.exports = Dialect