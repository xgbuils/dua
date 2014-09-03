var pluralize = require('pluralize')

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

function setModelDefinition(name, model, modelDefinition) {
    model.tableName = this.dialect.escapeIdentifier(pluralize.plural(name).toLowerCase())

    var columns = model.columns = {}
    var primaryKey = model.primaryKey = {}
    
    var column;

    var columnNames = unionKeys(this.defaults, modelDefinition)
    
    columnNames.forEach(function(name) {
        var defaults         = this.defaults[name]
        var columnDefinition = modelDefinition[name]
        column = columns[name] = {
            columnName: this.dialect.escapeIdentifier(name)
        }

        // assign type
        column.type = this.dialect.getTypeOfColumn(columnDefinition)
        if(column.type.name === undefined)        
            column.type = this.dialect.getTypeOfColumn(defaults)
        if(column.type.name === undefined)        
            column.type = this.dialect.default_type
        
        if (typeof defaults !== 'object') {
            defaults = {}
        }
        if (typeof columnDefinition !== 'object') {
            columnDefinition = {}
        }

        var pk = columnDefinition.primaryKey
        if (pk === undefined) pk = defaults.primaryKey
        if(pk === true) {
            if(!(name in primaryKey)) {
                primaryKey[name] = pk
                ++model.countPrimaryKeys
            }
        } else {
            if(name in primaryKey) {
                delete primaryKey[name]
                --model.countPrimaryKeys
            }
            
        }

        var autoIncrement = columnDefinition.autoIncrement || defaults.autoIncrement
        if (autoIncrement) {
            column.autoIncrement = autoIncrement
        }
    }, this)
}

module.exports = setModelDefinition