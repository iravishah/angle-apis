//@ts-check
"use strict";

const schema = require('validate');

module.exports = schema({
  first_name: {
    type: 'string',
    required: true,
    message: 'first_name is required'
  },
  last_name: {
    type: 'string',
    required: true,
    message: 'last_name is required'
  },
  email: {
    type: 'string',
    required: true,
    message: 'email is required'
  }
});