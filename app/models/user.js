var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var bHash = Promise.promisify(bcrypt.hash);

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(pGuess) {
    return bcrypt.compare(pGuess, this.get('password'), function(err, match) {
      return match;
    });
  },
  hashPassword: function() {
    return bHash(this.get('password'), null, null)
      .bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});

module.exports = User;