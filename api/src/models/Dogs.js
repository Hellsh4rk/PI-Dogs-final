const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dogs', { //raza
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    name: { //nombre
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: { //peso
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: { //altura
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span: { //vida
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {  //imagen
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAtDb: { // crear
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
  

};
