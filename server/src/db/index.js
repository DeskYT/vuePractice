const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/zetk-practice',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, function (err) {
    if(err){console.log("Error connection");}
    else{console.log("Success connection!");}
});

module.exports = mongoose.connection;