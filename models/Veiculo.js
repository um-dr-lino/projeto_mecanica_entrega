import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import Proprietario from "./Proprietario.js";
import TipoVeiculo from "./TipoVeiculo.js";

export const Veiculo = sequelize.define("veiculo", {
  id_veiculo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  placa_veiculo: { type: DataTypes.STRING(10), unique: true, allowNull: false },
  id_proprietario: { type: DataTypes.INTEGER, allowNull: false },
  preco_veiculo: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  id_tipo: { type: DataTypes.INTEGER, allowNull: false },
  ano: { type: DataTypes.INTEGER },
  created_at: { type: DataTypes.DATE }
}, {
  tableName: "veiculo",
  timestamps: false
});

Veiculo.belongsTo(Proprietario, { foreignKey: "id_proprietario" });
Veiculo.belongsTo(TipoVeiculo, { foreignKey: "id_tipo" });


export default Veiculo;