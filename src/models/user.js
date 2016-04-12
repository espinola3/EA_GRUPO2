var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    
    id:   {type: String, required:true},
    name: {type: String, required:true},
    pass: {type: String, required:true},
    email: {type: String, required:true},
    city: {type: String, required:true}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;