'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HeatlhAdministration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  HeatlhAdministration.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    no_id: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    create_by: DataTypes.INTEGER,
    update_by: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'HeatlhAdministration',
  });
  return HeatlhAdministration;
};