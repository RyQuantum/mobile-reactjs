const express = require('express');
const Router = express.Router();
const utils = require('utility');
const model = require('./model');
const User = model.getModel('user');

const _filter = {pwd: 0, '__v': 0};

Router.get('/list', async (req, res) => {
  // await User.remove({});
  const doc = await User.find({});
  return res.json(doc);
});

Router.post('/login', async (req, res) => {
  const {user, pwd} = req.body;
  const doc = await User.findOne({user, pwd: md5Pwd(pwd)}, _filter);
  if (!doc) {
    return res.json({code: 1, msg: 'Username or password is wrong!'});
  }
  res.cookie('userid', doc._id);
  return res.json({code: 0, data: doc});
});

Router.post('/register', async (req, res) => {
  console.log(req.body);
  const {user, pwd, type} = req.body;
  const doc = await User.findOne({user});
  if (doc) {
    return res.json({code: 1, msg: 'Username exists.'});
  }
  try {
    const newUser = await new User({user, pwd: md5Pwd(pwd), type}).save();
    const {_id} = newUser;
    res.cookie('userid', _id);
    res.json({code: 0, data: newUser});
  } catch (e) {
    return res.json({code: 1, msg: 'Server error'});
  }
});

Router.get('/info', async (req, res) => {
  const {userid} = req.cookies;
  if (!userid) {
    return res.json({code: 1})
  }
  try {
    const doc = await User.findOne({_id: userid}, _filter);
    if (doc) return res.json({code: 1});
  } catch (err) {
    return res.json({code: 0, data: 'Server error'});
  }

});

const md5Pwd = pwd => {
  const salt = 'ryanlskjdflsafiojsjdf';
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;