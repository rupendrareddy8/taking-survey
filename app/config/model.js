const DB = require('./db.js');
const autoIncrement = require('mongoose-auto-increment');

module.exports = {
	db: DB,
	increment: autoIncrement
}