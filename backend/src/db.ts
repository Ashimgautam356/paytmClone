import mongoose from 'mongoose'




const UserSchema =new  mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },

    password:{
        type:String,
        require:true,
        minLength:6
    },
    
    firstName:{
        type:String,
        require:true,
        trim:true,
        maxLength:40,
    },
    lastName:{
        type:String,
        require:true,
        trim:true,
        maxLength:40,
    }

})


export const UserModel = mongoose.model("User",UserSchema)


