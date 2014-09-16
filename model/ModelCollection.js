'use strict'

var setModel = require('./setModel')
var modelExtend = require('./modelExtend')
var modelNormalizer = require('./modelNormalizer')

function ModelCollection (defaults, models, dialect) {
    this.defaults = modelNormalizer(defaults, dialect)
    this.models   = models
    this.dialect  = dialect
}

ModelCollection.prototype.define = function (name, modelDefinition) {
    var model = this.models[name] = setModel(name, modelDefinition, this.dialect, this.defaults)
    return model
}

ModelCollection.prototype.extend = function (defaults) {
	var models = new ModelCollection(defaults, this.models, this.dialect)
    models.defaults = modelExtend(this.defaults, models.defaults)

    return models
}

module.exports = ModelCollection