const monsgoose= require("mongoose");
const albumSchema= new monsgoose.Schema({
    title:{
        type:String,
        required:true
    },
    music:{
        type:monsgoose.Schema.Types.ObjectId,
        ref:"music",
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
});
const albumModel=mongoose.model("album",albumSchema);
module.exports=albumModel;