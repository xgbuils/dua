var extend = require('../vendor/extend')

var tests = [
    require('./dialects/sqlite#escapeIdentifier'),
    //require('./dialects/sqlite#getTypeOfColumn'),
    require('./models/columnNormalizer-sqlite'),
    require('./vendor/genericExtend'),
    require('./models/modelExtend'),
    require('./models/ModelCollection#constructor'),
    require('./models/ModelCollection#extend'), 
]

module.exports = extend.apply(null, tests)