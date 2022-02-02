const mongoose = require('mongoose');

// connection uri from mongodb compass
const mongoURI = 'mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connectToMongo = () =>{
    // connecting with the database
mongoose.connect(mongoURI,()=>{
    console.log('Connected to mongo successfully');
})
}

// exporting connectToMongo function
module.exports = connectToMongo;