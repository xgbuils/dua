var extend = require('../vendor/extend')

var tests = [
    require('./dialects/sqlite#escapeIdentifier'),
    require('./model/columnNormalizer-sqlite'),
    require('./vendor/genericExtend'),
    require('./model/modelExtend'),
    require('./model/ModelCollection#constructor'),
    require('./model/ModelCollection#extend'),
    require('./model/setModel-sqlite'),
]

module.exports = extend.apply(null, tests)