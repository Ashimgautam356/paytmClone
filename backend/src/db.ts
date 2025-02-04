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

const AccountTable = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId, require:true, unique:true, ref:"User"},
    balance:{type:Number,min:0}
})

const StatementTable = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId, require:true, unique:true, ref:"User"},
    method:{type:String, require:true},
    remarks:{type:String},
    balance:{type:Number,min:0}, 
})

export const UserModel = mongoose.model("User",UserSchema)
export const AccountModel = mongoose.model('Account',AccountTable)
export const StatementModel = mongoose.model('Statement',StatementTable)

