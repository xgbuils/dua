'use strict'

var sqlite3 = require('sqlite3')
var util = require('util')
//var common = require('./dialects/common')
var dialect = require('./dialects/sqlite')
var QueryGenerator = require('./QueryGenerator')

var Dua = require('./Dua')

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

var dua = new Dua(dialect);

var models = dua.modelset({
    id: {
        type: 'INTEGER',
        primaryKey: true,
        autoIncrement: true,
    }
})

models.define('User', {
    id: {
      //  primaryKey: false
    },
    name: {type:'GGF'}
})

console.debug(dua.models)

var qg = new QueryGenerator(dialect)
//console.log('dua.models[\'User\']' instanceof Model)
var query = qg.create('users', dua.models['User'])
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