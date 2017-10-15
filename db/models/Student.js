var Sequelize = require('sequelize');
var db = require('../index');


var Student = db.define('student', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }

  });

  module.exports = Student;