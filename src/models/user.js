const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      editable: true,
    },
    lastName: {
      type: String,
      required: true,
      editable: true,
    },
    email: {
      type: String,
      required: [true, "email is required bruh!!"],
      unique: [true, "email already in use"],
      editable: false,
    },
    password: {
      type: String,
      required: true,
      editable: true,
    },
    age: {
      type: Number,
      required: true,
      editable: true,
    },
    gender: {
      type: String,
      required: true,
      editable: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fpng-zpceb&psig=AOvVaw2y46Zl2x6dRRiLwtEm1deg&ust=1740921231178000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiLk5L76IsDFQAAAAAdAAAAABAE",
      editable: true,
    },
    about: {
      type: String,
      default: "This is about User",
      editable: true,
    },
    skill: {
      type: [String],
      editable: true,
    },
  },
  { strict: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ id: user._id }, "abc", { expiresIn: "7d" });

  return token;
};

userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.comparePasswords = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

// userSchema.methods.validate = async function(){
//   const user  = this;
// }

const User = mongoose.model("User", userSchema);

module.exports = User;
