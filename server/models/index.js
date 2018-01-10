'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var db        = {};


// ================================
// Database Connection
// ================================

let sequelize;
let config;

if (process.env.DATABASE_URL) {
    console.log("===== USING PRODUCTION DB =====");
    config = require(__dirname + '/../config/db-production.json');
    sequelize = new Sequelize(process.env.DATABASE_URL,config);
}
else {
    console.log("===== USING DEVELOPMENT DB =====");
    config = require(__dirname + '/../config/db-development.json');
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// ================================
// Import Table Models
// ================================

var inc = require('./inc.js');
var targets = require('./targets.js');

var inc1Model = sequelize.define('inc1', inc, {freezeTableName: true, timestamps: true,});
var inc2Model = sequelize.define('inc2', inc, {freezeTableName: true, timestamps: true,});
var inc3Model = sequelize.define('inc3', inc, {freezeTableName: true, timestamps: true,});
var inc4Model = sequelize.define('inc4', inc, {freezeTableName: true, timestamps: true,});

var targetsModel = sequelize.define('targets', targets, {
    freezeTableName: true,
    timestamps: false
});

// ================================
// Setup DB Vars and Export
// ================================
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
  sequelize: sequelize,
  inc1: inc1Model,
  inc2: inc2Model,
  inc3: inc3Model,
  inc4: inc4Model,
  targets: targetsModel,
};
