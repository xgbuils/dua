'use strict'

var sqlite3 = require('sqlite3')
var util = require('util')
//var common = require('./dialects/common')
var dialect = require('./dialects/sqlite')
var extend = require('./vendor/extend')
var pluralize = require('pluralize')
var Model = require('./Model')
var QueryGenerator = require('./QueryGenerator')

console.debug = function(myObject) {
    console.log(util.inspect(myObject, {showHidden: false, depth: null}));
}

var ATTRIBUTES = {autoIncrement: true}


var INTEGER = {"int": true, "integer": true}
var TYPES_TO_MYSQL = {
    // http://www.w3schools.com/sql/sql_datatypes_general.asp
    // http://dev.mysql.com/doc/refman/5.0/en/numeric-types.html
    'INTEGER': 'INTEGER', // standard
    'INT': 'INTEGER', //mysql
    'SMALLINT': 'SMALLINT', //standard
    'MEDIUMINT': 'MEDIUMINT',
    'BIGINT': 'BIGINT',
    'DECIMAL': 'DECIMAL', // standard
    'DEC': 'DECIMAL', //mysql
    'FIXED': 'DECIMAL', //mysql
    'NUMERIC': 'NUMERIC', // standard
    'FLOAT': 'FLOAT', // standard
    'REAL': 'REAL', // standard
    'DOUBLE PRECISION': 'DOUBLE PRECISION', //standard: mantissa precision 16
    'DOUBLE': 'DOUBLE PRECISION', // mysql
    'BIT': "TINYINT(1)", // mysql
}

function Dua(defaults) {
    this.defaults = defaults 
    this.models = {}
}

Dua.join = function() {
    var dua = new Dua({})
    var arrModels = [dua.models]
    Array.prototype.forEach.call(arguments, function(e) {
        arrModels.push(e.models);
    })
    //console.log(arrModels);
    dua.models = extend.apply(null, arrModels)
    //console.log(dua.models)
    return dua;
}





// precondition: typeof columnName === 'string'
function getTypeOfColumn(column) {

    var typeOfColumn = typeof column;
    if (typeOfColumn === 'string') {
        return column.toUpperCase();
    } else if(typeOfColumn !== 'object') {
        return '';
    } else if (!column.type)
        return '';
    else if (typeof column.type !== 'string')
        return '';
    else 
        return column.type.toUpperCase();
}

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

Dua.prototype.define = function(name, modelDefinition) {
    var model = this.models[name] = new Model()
    model.tableName = dialect.escapeIdentifier(pluralize.plural(name).toLowerCase())

    var columns = model.columns = {}
    var primaryKey = model.primaryKey = {}
    
    var column;

    var columnNames = unionKeys(this.defaults, modelDefinition)
    
    columnNames.forEach(function(name) {
        var defaults         = this.defaults[name]
        var columnDefinition = modelDefinition[name]
        column = columns[name] = {
            columnName: dialect.escapeIdentifier(name)
        }

        // assign type
        column.type = dialect.getTypeOfColumn(columnDefinition)
        if(column.type.name === undefined)        
            column.type = dialect.getTypeOfColumn(defaults)
        if(column.type.name === undefined)        
            column.type = dialect.default_type
        
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

    return model;
}

var dua = new Dua({
    id: {
        type: 'INTEGER',
        primaryKey: true,
        autoIncrement: true,
    }
});

dua.define('User', {
    id: {
      //  primaryKey: false
    },
    name: {type:'GGF'}
})

var s = Dua.join(dua)

console.debug(s.models)

var qg = new QueryGenerator(dialect)
var query = qg.create('users', s.models['User'])
var db = new sqlite3.Database(':memory:')

console.log(query)

db.run(query, undefined, function(err) {
    if(err) {
        throw console.error(err)
    }

    console.log('success!!!')

    db.run('insert into `users` (name) values(\'bla\'),(\'ble\')', undefined, function(err, rows) {
        if(err) {
            throw console.error(err)
        }

        console.log('success!!!')

        db.all('select * FROM `users`',  undefined, function(err, rows) {
        //db.all("select * FROM test where field2 = 'bla'", undefined, function(err, rows) {
            if(err) {
                throw console.error(err)
            }

            console.debug(rows)
        })
    })   
})