var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var layerSchema = new Schema({
  category: String,
  name: String
}, {
  timestamps: true
});

var Layers = mongoose.model('Layer', layerSchema);

module.exports = Layers;