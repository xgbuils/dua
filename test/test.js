var extend = require('../vendor/extend')

var tests = [
    require('./dialects/sqlite#escapeIdentifier'),
    
    require('./models/ModelSet#constructor'),
    require('./dialects/sqlite#getTypeOfColumn'),
]

module.exports = extend.apply(null, tests)