const mongoose = require("mongoose"),
bcrypt = require("bcrypt"),
  { Schema } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  name: {
    type: String,
    required: true,
    unique:true
  },
  hashPassword: {
    type: String,
    required: true,
  },
  userInfo: { type: Schema.Types.ObjectId, ref: "userInfo" },
});

userSchema.pre("save",function(next){  //hash password
  const user = this;
  bcrypt.hash(user.hashPassword,10,function(err,hash){
    if(err){
      console.log(`hashing 중에 err발생: ${err}`);
    }
    user.hashPassword = hash;
    next();
  })
})

userSchema.methods.validatePassword = async function(password){ 
  const user = this;
  const result = await bcrypt.compare(password,user.hashPassword);
  return result;
}


module.exports = mongoose.model("User", userSchema);

