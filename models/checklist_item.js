'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class checklist_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  checklist_item.init({
    checklistid: DataTypes.INTEGER,
    itemName: DataTypes.STRING,
    itemStatus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'checklist_item',
  });
  return checklist_item;
};