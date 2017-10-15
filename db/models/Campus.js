var Sequelize = require('sequelize');
var db = require('../index');

var Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    }

  })

  module.exports = Campus;