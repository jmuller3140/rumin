const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,
		date: Date,
		entry: String
});

module.exports = mongoose.model('Entry', entrySchema);