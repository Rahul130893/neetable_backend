const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");


router.get("", authenticate, async (req, res) => {
  req.body.user_id = req.user._id;
  try {
    const user = await User.find().lean().exec();

    return res.status(200).send({ user: user }); // []
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/", authenticate, async (req, res) => {
  req.body.user_id = req.user._id;
  try {
    const user = await User.create(req.body);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});


router.get("/:id", authenticate, async (req, res) => {
  req.body.user_id = req.user._id;
  try {
    const user = await User.findById(req.params.id).lean().exec();

    return res.status(200).send({ user: user }); // []
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  req.body.user_id = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true}).lean().exec();

    return res.status(200).send({ user: user }); // []
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  req.body.user_id = req.user._id;
  try {
    const user = await User.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).send({ user: user }); // []
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;

