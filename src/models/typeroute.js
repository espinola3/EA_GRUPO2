/**
 * Created by carol on 22/04/16.
 */

var mongoose = require('mongoose');
var Route = require('../models/route');
var Route= mongoose.model('Route');


var TypeRouteSchema = mongoose.Schema({
    type: {type: String, required:true, index: { unique: true }},
    lista: [{type: mongoose.Schema.Types.ObjectId, ref: 'Route' }]
    
});

var TypeRoute = mongoose.model('TypeRoute', TypeRouteSchema);

module.exports = TypeRoute;