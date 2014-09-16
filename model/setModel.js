var pluralize = require('pluralize')
var modelNormalizer = require('./modelNormalizer')
var modelExtend = require('./modelExtend')
var Model = require('./Model')


function setModel(name, modelDefinition, dialect, defaults) {
    var model = new Model()
    if (!defaults) defaults = {}

    model.tableName = dialect.escapeIdentifier(pluralize.plural(name).toLowerCase())

    var modelNormalized = modelNormalizer(modelDefinition, dialect)
    var columns = model.columns = modelExtend(defaults, modelNormalized)
    var primaryKey = model.primaryKey

    for (var name in columns) {

        var column = columns[name]
        column.type = dialect.validateType(column.type)
        column.columnName = dialect.escapeIdentifier(name)

        if (column.primaryKey) {
            primaryKey.push(name)
        }
        delete column.primaryKey
    }



    return model
}

module.exports = setModel