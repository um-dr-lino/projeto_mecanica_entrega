import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export const Proprietario = sequelize.define("proprietario", {
  id_proprietario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cpf: { type: DataTypes.BIGINT, unique: true },
  nome: { type: DataTypes.STRING(150), allowNull: false },
  fone: { type: DataTypes.STRING(30) },
  created_at: { type: DataTypes.DATE , defaultValue: DataTypes.NOW }
}, {
  tableName: "proprietario",
  timestamps: false
});

export default Proprietario;
