var Model = require('./model/Model')

var setModelDefinition = require('./model/setModelDefinition')
var ModelSet = require('./model/ModelSet')

function Dua(dialect) {
    this.dialect  = dialect
    this.models   = {}
}

Dua.prototype.define = function(name, modelDefinition) {
    var model = this.models[name] = new Model()
    setModelDefinition.call(this, name, model, modelDefinition, this.dialect)
    return model
}

Dua.prototype.models = function(defaults) {
    return new ModelSet(defaults, this.models, this.dialect)
}

module.exports = Dua