const mongoose= require("mongoose");

async function dbconnect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Database connected successfully");
    }
    catch(err){
    console.log("Error connecting to the database", err);
    process.exit(1);
}
};
module.exports= dbconnect;
