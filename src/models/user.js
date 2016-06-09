// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var findOrCreate = require('mongoose-findorcreate');


var User = new Schema({
    username: {type: String, required:true},
    password: {type: String},
    email: {type: String},
    city: {type: String},
    pic: {type: String, default:'/images/profile.jpg'},
    role: {type: String, default: 'user'},
    numrutas :{type: Number, default:0}
});

User.plugin(passportLocalMongoose);
User.plugin(findOrCreate);


module.exports=mongoose.model('users',User);



