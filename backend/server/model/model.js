const mongoose = require("mongoose")


const filterSchema = new mongoose.Schema({
  supplier: String,
  wholeSeller: String,
  steeringType: String,
  model: String,
  sfx: String,
  variant: String,
  color: String,
  quantities: [Number]
});

const filterDB = mongoose.model('filterdb', filterSchema);

module.exports = filterDB;