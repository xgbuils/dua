function Model() {
	this.countPrimaryKeys = 0
}

Model.prototype.getRowid = function() {
	if (this.countPrimaryKeys === 1) {
		var id = Object.keys(this.primaryKey)[0]
		return id
	}
	return null
}

module.exports = Model