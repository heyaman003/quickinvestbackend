//Connection file to mongo db
const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("Connecting to MongoDB...",process.env.MONGO_URI);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;