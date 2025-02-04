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

},{timestamps:true})

const AccountTable = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId, require:true, unique:true, ref:"User"},
    balance:{type:Number,min:0}
})

const StatementTable = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId, require:true, unique:true, ref:"User"},
    method:{type:String, require:true},
    to:{type:mongoose.Types.ObjectId,require:true, ref:"User"},
    remarks:{type:String},
    balance:{type:Number,min:0}
},{timestamps:true})

const TransactionPin = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId, require:true, unique:true, ref:"User"},
    transactionPin:{type:String,require:true},
    failedAttempts:{type:Number,default:0}
},{timestamps:true})


export const UserModel = mongoose.model("User",UserSchema)
export const AccountModel = mongoose.model('Account',AccountTable)
export const StatementModel = mongoose.model('Statement',StatementTable)
export const PinModel = mongoose.model('TransactionPin_pin',TransactionPin)

