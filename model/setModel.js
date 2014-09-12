var pluralize = require('pluralize')
var unionKeys = require('../vendor/unionKeys')
var columnExtend = require('./modelExtend')
var Model = require('./Model')

function setModel(name, modelDefinition, dialect, defaults) {
    var model = new Model()
    if (defaults) defaults = {}

    model.tableName = dialect.escapeIdentifier(pluralize.plural(name).toLowerCase())

    var columns = model.columns = modelExtend(this.defaults, modelNormalizer(modelDefinition))
    var primaryKey = model.primaryKey = []
    
    for (var name in columns) {
        var column = columns[name]
        column.type = dialect.validateType(column.type)
        column.columnName = dialect.escapeIdentifier(name)

        if (column.primaryKey) {
            primaryKey.push(column.primaryKey)
        }
        delete column.primaryKey
    }

    return model
}

module.exports = setModel