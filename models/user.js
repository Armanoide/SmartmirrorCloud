/**
 * Created by billa on 6/06/17.
 */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var mongoosePaginate = require('mongoose-paginate');


var Schema = mongoose.Schema;

var userSchema = Schema({

    name : String,
    firstName : String,
    lastName : String,
    email : String,
    birthday : String,
    city : String,
    longitude: String,
    latitude:String,
    country:String,
    zipCode:String,
}, {
    collection : 'users',
    timestamps : true
});

userSchema.index({facebookId:1}, {unique: true});
userSchema.index({email:1}, {unique: true});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);

module.exports.prototype.expose = function () {
    return {
        name : this.name,
        first_name : this.firstName,
        last_name : this.lastName,
        email : this.email,
        birthday : this.birthday,
        city : this.city,
        country: this.country,
        zipCode : this.zipCode,
        longitude: parseFloat(this.longitude),
        latitude: parseFloat(this.latitude),
    };
};