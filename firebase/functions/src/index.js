const admin = require('firebase-admin/lib/index');

admin.initializeApp();

exports.addGame = require('./addGame');
exports.joinGame = require('./joinGame');
exports.action = require('./action');
