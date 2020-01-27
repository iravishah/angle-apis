const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { v4 } = require('uuid');

const schema = new Schema({
  uid: { type: String },
  action: { type: String },
  emp_uid: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

schema.pre('save', function (next) {
  this.uid = `emp-${v4()}`;
  next();
});

module.exports = mongoose.model('EmployeeLog', schema);
