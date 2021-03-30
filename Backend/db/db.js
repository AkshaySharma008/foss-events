const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

function db(){
    mongoose.connect(process.env.DB_CONNECT,{
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

    // when connected
    mongoose.connection.on('connected',function () { 
        console.log('DB connection established');
    });
    
      // when reconnected
    mongoose.connection.on('reconnected',function () { 
        console.log('DB connection re-established');
    });
    
      // when disconnected
    mongoose.connection.on('disconnected',function () { 
        console.log('DB connection disconnected');
    }); 
    
      // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function() {   
        mongoose.connection.close(function () { 
          console.log('DB connection disconnected through app termination'); 
          process.exit(0); 
        }); 
    }); 
    
      // if connection throws an error
    mongoose.connection.on('error', function (err) { 
        console.log('DB connection error: ' + err); 
    });
    
}

module.exports = db;