'use strict'

var Dialect = require('./Dialect')



var sqlite = new Dialect()

sqlite.name = 'sqlite'

sqlite.types = {
    // http://www.w3schools.com/sql/sql_datatypes_general.asp
    // http://dev.mysql.com/doc/refman/5.0/en/numeric-types.html
	// numeric
    'INTEGER':           {name: 'INTEGER',           range: [0,1]}, //(p)
    'INT':               {name: 'INT',               range: [0,1]}, //(p)
    'SMALLINT':          {name: 'SMALLINT'},
    'MEDIUMINT':         {name: 'MEDIUMINT'},
    'BIGINT':            {name: 'BIGINT'},
    'DECIMAL':           {name: 'DECIMAL',           range: [0,2]}, //(p,s)    [10,0]
    'DEC':               {name: 'DEC',               range: [0,2]}, //         [10,0]
    'FIXED':             {name: 'FIXED'},
    'NUMERIC':           {name: 'NUMERIC',           range: [0,2]}, //(p,s) // [10,0]
    'FLOAT':             {name: 'FLOAT',             range: [0,2]}, //(p)
    'REAL':              {name: 'REAL',              range: [0,2]},
    'DOUBLE PRECISION':  {name: 'DOUBLE PRECISION',  range: [0,2]},
    'DOUBLE':            {name: 'DOUBLE',            range: [0,2]},
    'BIT':               {name: 'BIT'},
    'BOOLEAN':           {name: 'BOOLEAN'},
    // text
    'CHAR':              {name: 'CHAR',              range: [1,1]}, //(n)
    'CHARACTER':         {name: 'CHARACTER',         range: [1,1]}, //(n)
    'VARCHAR':           {name: 'VARCHAR',           range: [1,1]}, //(n)
    'CHARACTER VARYING': {name: 'CHARACTER VARYING', range: [1,1]}, //(n)
    'BINARY':            {name: 'BINARY',            range: [1,1]}, //(n)
    'VARBINARY':         {name: 'VARBINARY',         range: [1,1]}, //(n) 
    'BINARY VARYING':    {name: 'BINARY VARYING',    range: [1,1]}, //(n)
    // date
    'DATE':              {name: 'DATE'},
    'TIME':              {name: 'TIME'},
    'TIMESTAMP':         {name: 'TIMESTAMP'},
    'INTERVAL':          {name: 'INTERVAL'},

    // other
    'MULTISET':          {name: 'MULTISET'},
    'XML':               {name: 'XML'},
    'BLOB':              {name: 'BLOB'},
}

sqlite.type_affinity = function(typeString) {
    if (typeof typeString !== 'string') {
        return 'NUMERIC'
    } else if (typeString.indexOf('INT') !== -1) {
        return 'INTEGER'
    } else if (['CHAR', 'CLOB', 'TEXT'].some(function(e) {
        return typeString.indexOf(e) !== -1
    })) {
        return 'TEXT'
    } else if(typeString.indexOf('BLOB') !== -1 || typeString === '') {
        return 'NONE'
    } else if (['REAL', 'FLOA', 'DOUB'].some(function(e) {
        return typeString.indexOf(e) !== -1
    })) {
        return 'REAL'
    } else {
        return 'NUMERIC'
    }
}

sqlite.escape_chars = [
        {open: '"', close: '"'},
        {open: '`', close: '`'},
        {open: '[', close: ']'},
    ]
sqlite.replace_chars = /"|`|\[|\]/g

sqlite.autoIncrementString = ''

sqlite.validateType = function(type) {
    if(!type.params) {
        if (typeof typeString !== 'string') {
            type.name = 'NUMERIC'
        } else if (typeString.indexOf('INT') !== -1) {
            type.name = 'INTEGER'
        } else if (['CHAR', 'CLOB', 'TEXT'].some(function(e) {
            return typeString.indexOf(e) !== -1
        })) {
            type.name = 'TEXT'
        } else if(typeString.indexOf('BLOB') !== -1 || typeString === '') {
            type.name = 'NONE'
        } else if (['REAL', 'FLOA', 'DOUB'].some(function(e) {
            return typeString.indexOf(e) !== -1
        })) {
            type.name = 'REAL'
        } else {
            type.name = 'NUMERIC'
        }
        type.params = []
    }
    return type
}


  


module.exports = sqlite