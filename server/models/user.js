import argon2  from "argon2";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'username is required'],
        minLength:[3,'must contain at least 3 characters'],
        unique:true,
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        match:[ 
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'password is required'],
        minLength:[4,'must contain at least 3 characters'],
    }
},{timestamps:true});

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await argon2.hash(this.password)
    }
    next();
});

userSchema.methods.verifyPassword = async function (password) {
    const response = await argon2.verify(this.password, password);
    return response
};

const User = mongoose.model("User", userSchema);

export default User;