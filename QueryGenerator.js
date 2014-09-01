function QueryGenerator(dialect) {
    this.dialect = dialect
} 

QueryGenerator.prototype.create = function(tableName, model) {
    var query = 'CREATE TABLE ' + model.tableName + ' (' 
    
    var columns = []
    var rowid = model.getRowid()

    for (var name in model.columns) {
        var column = model.columns[name]
        var textColumn = column.columnName + ' ' + column.type.name
        if (rowid === name) {
            textColumn += ' PRIMARY KEY'
        }
        if (column.autoIncrement) {
            textColumn += ' ' + this.dialect.autoIncrementString
        }
        columns.push(textColumn)
    }
    query += columns.join(',')

    var primaryKey = Object.keys(model.primaryKey)
    if (primaryKey.length > 1) {
        query += ', PRIMARY KEY (' + primaryKey.join(',') + ')'
    }
    query += ');'

    return query
}

module.exports = QueryGenerator