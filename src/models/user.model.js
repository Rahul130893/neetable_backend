const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const hashedPassword = bcrypt.hashSync(this.password, 8);
  this.password = hashedPassword;
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
