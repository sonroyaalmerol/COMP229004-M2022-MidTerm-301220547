/**
 * 
 * File name: db.js
 * Author's name: Son Roy Almerol
 * Student ID: 301220547
 * Project Name: COMP 229 Midterm
 * 
 */

// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://midterm:midterm@cluster0.2wtfm.mongodb.net/carstore?retryWrites=true&w=majority";

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}