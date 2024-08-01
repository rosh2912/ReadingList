const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number,
});
//model refers to a collection in a db
module.exports = mongoose.model("Author", authorSchema);
