var Model = require('./model/Model')

var setModelDefinition = require('./model/setModelDefinition')
var ModelSet = require('./model/ModelSet')

function Dua(dialect) {
    this.dialect  = dialect
    this.defaults = {}
    this.models   = {}
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

Dua.prototype.define = function(name, modelDefinition) {
    var model = this.models[name] = new Model()
    setModelDefinition.call(this, name, model, modelDefinition, this.dialect)
    return model
}

Dua.prototype.modelset = function(defaults) {
    return new ModelSet(defaults, this.models, this.dialect)
}

module.exports = Dua