const Sequelize = require('sequelize');
const configs = require('../config/config');

const { initPartnumber } = require("./partnumber")

let config = configs["dadosDB"];

if (config.logging) config.logging = console.log

config.pool = {
    max: 50,
    min: 0,
    idle: 5000,
    evict: 5000
}

let sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {
    db: sequelize,

    Partnumber: initPartnumber(sequelize)
}

module.exports = db;