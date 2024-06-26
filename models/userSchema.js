const mongoose = require("mongoose");
if(mongoose.connection.models['User']){
  delete mongoose.connection.models['User']
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    default: null
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: null,
  },
 verificationToken:{
  type:String,
  required:false,
  default:"null"
 }
});


module.exports = mongoose.model("User", userSchema);
