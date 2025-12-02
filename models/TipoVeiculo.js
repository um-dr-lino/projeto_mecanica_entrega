import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export const TipoVeiculo = sequelize.define("tipo_veiculo", {
  id_tipo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tipo: { type: DataTypes.STRING(50), unique: true }
}, {
  tableName: "tipo_veiculo",
  timestamps: false
});

export default TipoVeiculo;
