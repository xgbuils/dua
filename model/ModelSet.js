var Model = require('./Model')
var setModelDefinition = require('./setModelDefinition')
var extend = require('../vendor/extend')

function ModelSet (defaults, models, dialect) {
	this.defaults = defaults
    this.models   = models
    this.dialect  = dialect
}

ModelSet.prototype.define = function (name, modelDefinition) {
	var model = this.models[name] = new Model()
    setModelDefinition.call(this, name, model, modelDefinition)
	return model
}

ModelSet.prototype.extend = function (defaults) {
    var modelset = new ModelSet({}, this.models, this.dialect)
    extend(modelset.defaults, this.defaults, defaults)
    return modelset
}

module.exports = ModelSet