const mongoose = require('mongoose');

const db = "Please add your db url"
mongoose.connect(db, { useNewUrlParser: true, poolSize: 10});
module.exports = mongoose.connection;