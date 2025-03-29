const mongoose  = require('mongoose');

const connectdb = async() => {
    await mongoose.connect('mongodb://localhost:27017/tinderdb');
}

// connectdb().then(()=>{
//     console.log('Database connected');
// }).catch((err)=>{
//     console.log('Error connecting to db ', err);
// })

module.exports = {connectdb}