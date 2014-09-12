var columnNormalizer = require('./columnNormalizer')

function modelNormalizer(modelDefinition, dialect) {
	var model = {}
	for (var name in modelDefinition) {
		model[name] = columnNormalizer(modelDefinition[name], dialect) 
	}
	return model
}

module.exports = modelNormalizer