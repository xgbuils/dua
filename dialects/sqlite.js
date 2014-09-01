'use strict'

var Dialect = require('./Dialect')



var sqlite = new Dialect()

sqlite.name = 'sqlite'

sqlite.types = {
	// numeric
    'INTEGER': 'INTEGER', //(p)
    'INT': 'INT', //(p)
    'SMALLINT': 'SMALLINT',
    'MEDIUMINT': 'MEDIUMINT',
    'BIGINT': 'BIGINT',
    'DECIMAL': 'DECIMAL', //(p,s)
    'DEC': 'DEC',
    'FIXED': 'FIXED',
    'NUMERIC': 'NUMERIC', //(p,s)
    'FLOAT': 'FLOAT', //(p)
    'REAL': 'REAL',
    'DOUBLE PRECISION': 'DOUBLE PRECISION',
    'DOUBLE': 'DOUBLE',
    'BIT': 'BIT',
    'BOOLEAN': 'BOOLEAN',
    // text
    'CHARACTER': 'CHARACTER', //(n)
    'VARCHAR': 'VARCHAR', //(n)
    'CHARACTER VARYING': 'CHARACTER VARYING', // (n)
    'BINARY': 'BINARY', //(n)
    'VARBINARY': 'VARBINARY', //(n) 
    'BINARY VARYING': 'BINARY VARYING', //(n)
    // date
    'DATE': 'DATE',
    'TIME': 'TIME',
    'TIMESTAMP': 'TIMESTAMP',
    'INTERVAL': 'INTERVAL',

    // other
    'MULTISET': 'MULTISET',
    'XML': 'XML',
    'BLOB': 'BLOB',
}

sqlite.default_type = 'NUMERIC'

sqlite.escape_chars = [
        {open: '"', close: '"'},
        {open: '`', close: '`'},
        {open: '[', close: ']'},
    ]
sqlite.replace_chars = /"|`/g

sqlite.autoIncrementString = ''


  


module.exports = sqlite