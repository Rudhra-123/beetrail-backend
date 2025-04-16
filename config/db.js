const mongoose = require('mongoose');

const connectDB = async () => {
 


mongoose.connect(process.env.MONGO_URI, {
  })
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch(err => console.error('❌ Connection failed:', err));


  
};

module.exports = connectDB;
