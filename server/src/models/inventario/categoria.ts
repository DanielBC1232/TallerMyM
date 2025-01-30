import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";

class Categoria extends Model {

}

Categoria.init(
  {
    idCategoria: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nombreCategoria: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Categoria",
    tableName: "Categoria",
    timestamps: false
  }
);

export default Categoria;
