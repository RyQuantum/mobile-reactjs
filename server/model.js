const mongoose = require('mongoose');
const {Schema} = mongoose;

const url = 'mongodb://ryan:ryan@ds257495.mlab.com:57495/mobile-reactjs';
mongoose.connect(url);

const models = {
  user: {
    user: {type: String, require: true},
    pwd: {type: String, require: true},
    type: {type: String, require: true},
    avatar: {type: String},
    desc: {type: String},
    title: {type: String},
    company: {type: String},
    money: {type: String},
  },
  chat: {

  }
};

for(let m in models) {
  mongoose.model(m, new Schema(models[m]));
}

module.exports = {
  getModel(name) {
    return mongoose.model(name);
  }
};