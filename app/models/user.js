var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    // this.on('creating', function(model, attrs, options) {
    var pw = this.get('password');
    var context = this;
    bcrypt.hash(pw, null, null, function(err, hash) {
      context.set('password', hash);
    });
    // });
  },
  password: function(password) {
    return this.get('password');
  }
});

module.exports = User;