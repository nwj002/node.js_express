const mongoose = require('mongoose');

//external file
//function (connection)
//make a unique function name
// export

const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_CLOUD).then(() => {
        console.log('database connected');
    })
}

//exporting the function
module.exports = connectDatabase;