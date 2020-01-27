const should = require('should');

const user = require('../controller/user');
describe('User Testsuit', () => {
  describe('Add user testsuite', () => {
    describe('success scenarios', () => {
      it('should create new user', async () => {
        let res = getRes(function (status, data) {
          should(status).eql(201);
          should(data).have.properties(['email', 'first_name', 'last_name', 'uid']);
          return true;
        });
        const req = {
          body: {
            email: 'ravi@example.com',
            first_name: 'Ravi',
            last_name: 'Shah'
          }
        }
        return await user.addUser(req, res);
      });
    });

    describe('failure scenarios', () => {
      it('should return invalid email', async () => {
        let res = getRes(function (status, data) {
          should(status).eql(400);
          should(data).have.properties(['error', 'code']);
          should(data).have.property('error', 'invalid email id');
          return true;
        });
        const req = {
          body: {
            email: 'aaa',
            first_name: 'Ravi',
            last_name: 'Shah'
          }
        }
        return await user.addUser(req, res);
      });
    });
  });
  describe('List user testsuite', () => {
    describe('success scenarios', () => {
      it('should list users', async () => {
        let res = getRes(function (status, data) {
          should(status).eql(200);
          return true;
        });
        const req = {
        }
        return await user.getUsers(req, res);
      });
    });
  });
});

function getRes(callback) {
  return {
    _status: null,
    _data: null,
    status: function (status) {
      this._status = status;
      return this;
    },
    json: function (data) {
      this._data = data;
      callback(this._status, this._data);
      return this;
    }
  }
}