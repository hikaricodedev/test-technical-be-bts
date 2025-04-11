'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class checklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.checklist_item , {as : "checklist_item" , foreignKey : 'checklistid' })
    }
  }
  checklist.init({
    checklist_name: DataTypes.STRING,
    checklist_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'checklist',
  });
  return checklist;
};