const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("temper", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique:true
    }
  },{
    timestamps: false
  });
};