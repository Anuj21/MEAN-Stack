const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    reauired: "Full neame can't be empty",
  },
  email: {
    type: String,
    reauired: "Email can't be empty",
    unique: true,
  },
  password: {
    type: String,
    reauired: "Password can't be empty",
    minlength: [4, "Password must be atleast 4 character long"],
  },
  saltSecret: String,
});

//Custom validation for email
userSchema.path("email").validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid email");

//This function will be called before the save registration
// saltSecret is used for password encryption

userSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
    });
  });
  return next();
});

mongoose.model("User", userSchema);
