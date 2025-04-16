
import { Schema,model } from "mongoose";
import validate from "validator"
import bcrypt from "bcryptjs";

let userSchema = new Schema(
    {
        username: {
          type: String,
          required: [true, "username is a required field"],
          minLength: [4, "username must be above 4 characters"],
          trim: true,
        },
        email: {
          type: String,
          // creates a unique index not a validator
          unique: true,
          required: [true, "email is a required field"],
          validate:[validate.isEmail,"Enter proper email "]
            // validate:{
       // validator:function(value){
       //   return value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
       // },
       // message:"Enter proper email"
       // }
        },
        role: {
          type: String,
          enum: ["admin", "user"],
          default: "user",    
        },
        password: {
          type: String,
          minLength: [6, "Min character length is 6"],
          required: [true, "password is a required field"],
        },
        confirmPassword: {
          type: String,
          select:false,
          minLength: [6, "Min character length is 6"],
          required: [true, "Confirm password is a required field"],
          validate:{
              validator:function(value){
                  return value===this.password
              },
              message:"Password and Confirm does not match"
          }
     
        },
      },
      {
        timestamps: true, //createdAt,updatedAt
      }

)

userSchema.pre("save",async function (next) {
  this.password=await bcrypt.hash(this.password,10)
  this.confirmPassword=undefined;
  
next();  
})

userSchema.methods.comparePassword = async function (pwd,pwdDb) {
    return   await bcrypt.compare(pwd,pwdDb);
}

let User = model("User",userSchema);

export default User;