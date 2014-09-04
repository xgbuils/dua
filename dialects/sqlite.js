'use strict'

var Dialect = require('./Dialect')



var sqlite = new Dialect()

sqlite.name = 'sqlite'

sqlite.types = {
	// numeric
    'INTEGER':           {name: 'INTEGER',           range: [0,1]}, //(p)
    'INT':               {name: 'INT',               range: [0,1]}, //(p)
    'SMALLINT':          {name: 'SMALLINT'},
    'MEDIUMINT':         {name: 'MEDIUMINT'},
    'BIGINT':            {name: 'BIGINT'},
    'DECIMAL':           {name: 'DECIMAL',           range: [0,2]}, //(p,s)
    'DEC':               {name: 'DEC',               range: [0,2]},
    'FIXED':             {name: 'FIXED'},
    'NUMERIC':           {name: 'NUMERIC',           range: [0,2]}, //(p,s)
    'FLOAT':             {name: 'FLOAT',             range: [0,1]}, //(p)
    'REAL':              {name: 'REAL'},
    'DOUBLE PRECISION':  {name: 'DOUBLE PRECISION'},
    'DOUBLE':            {name: 'DOUBLE'},
    'BIT':               {name: 'BIT'},
    'BOOLEAN':           {name: 'BOOLEAN'},
    // text
    'CHARACTER':         {name: 'CHARACTER',         range: [0,1]}, //(n)
    'VARCHAR':           {name: 'VARCHAR',           range: [0,1]}, //(n)
    'CHARACTER VARYING': {name: 'CHARACTER VARYING', range: [0,1]}, //(n)
    'BINARY':            {name: 'BINARY',            range: [0,1]}, //(n)
    'VARBINARY':         {name: 'VARBINARY',         range: [0,1]}, //(n) 
    'BINARY VARYING':    {name: 'BINARY VARYING',    range: [0,1]}, //(n)
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

sqlite.default_type = 'NUMERIC'

sqlite.escape_chars = [
        {open: '"', close: '"'},
        {open: '`', close: '`'},
        {open: '[', close: ']'},
    ]
sqlite.replace_chars = /"|`|\[|\]/g

sqlite.autoIncrementString = ''


  


module.exports = sqlite