import mongoose from "mongoose";
import validator from "validator";
import JWT from "jsonwebtoken";
import bycrpt from "bcrypt";
import crypto from "crypto";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  subscription: {
    id: String,
    status: String,
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  playlist: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      poster: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  ResetPasswordToken: String,
  ResetPasswordExpire: String,
});

//Hashing Passworrd
schema.pre("save", async function (next) {
  //Check if the password is modified?
  if (!this.isModified("password")) return next();

  this.password = await bycrpt.hash(this.password, 10);
  next();
});

//Creating JWT token
schema.methods.getJWTToken = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

//Comparing password for login
schema.methods.comparePassword = async function (password) {
  return await bycrpt.compare(password, this.password);
};

schema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.ResetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.ResetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const UserModel = mongoose.model("RegisterUser", schema);
export default UserModel;
