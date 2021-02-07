'use strict';

const config = require('./setting');

module.exports = {
  "development": {
    "username": config.user_dababase,
    "password": config.password,
    "database": config.database_name,
    "host": config.host_address,
    "dialect": config.dialect
  },
  "production": {
    "username": config.user_dababase_prod,
    "password": config.password_prod,
    "database": config.database_name_prod,
    "host": config.host_address_prod,
    "dialect": config.dialect_prod
  }
}
