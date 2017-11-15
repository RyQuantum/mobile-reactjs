const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');

Router.get('/list', async (req, res) => {
  const doc = await User.find({});
  res.json(doc);
});

Router.post('/register', async (req, res) => {
  console.log(req.body);
  const {user, pwd, type} = req.body;
  const doc = await User.findOne({user});
  if (doc) {
    return res.json({code:1, msg: 'Username exists.'});
  }
  try {
    const newUser = await new User({user, pwd, type}).save();
    res.json({code: 0});
  } catch (e) {
    console.log(e);
    return res.json({code: 1, msg: 'Server error'});
  }
});

Router.get('/info', (req, res) => {
  return res.json({code: 1});
});

module.exports = Router;