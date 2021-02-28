'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogsRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LogsRequest.init({
    path_request: DataTypes.STRING,
    name_user: DataTypes.STRING,
    id_name_user: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'LogsRequest',
  });
  return LogsRequest;
};