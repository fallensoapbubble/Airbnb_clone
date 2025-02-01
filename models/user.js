const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongo = require('passport-local-mongoose')

const userSchm = new Schema({
    email:{
        type:String,
        required:true
    }
    //automaticallu user and pwd is there in the form of plugin
})

//plugin
userSchm.plugin(passportLocalMongo);

module.exports = mongoose.model('userSchm',userSchm);
