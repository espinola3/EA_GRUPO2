/**
 * Created by carol on 22/04/16.
 */

var mongoose = require('mongoose');

var TypeRouteSchema = mongoose.Schema({
    type: {type: String, required:true, index: { unique: true }}
    
});

var TypeRoute = mongoose.model('TypeRoute', TypeRouteSchema);

module.exports = TypeRoute;