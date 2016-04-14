/**
 * Created by carol on 12/04/16.
 */
var mongoose = require('mongoose');

var RouteSchema = mongoose.Schema({
    name: {type: String, required:true},
    type: {type: String, required:true},
    city: {type: String, required:true},
    time: {type: String, required:true},
    interest: {type: Array, required:true}
});

var Route = mongoose.model('Route', RouteSchema);

module.exports = Route;