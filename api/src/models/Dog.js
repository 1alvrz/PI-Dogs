const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("dog", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    height: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    weight: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    years: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    }
},{
    timestamps: false
});
}
