import { Veiculo } from "./Veiculo.js";
import { Proprietario } from "./Proprietario.js";
import { TipoVeiculo } from "./TipoVeiculo.js";


Proprietario.hasMany(Veiculo, { foreignKey: "id_proprietario" });
Veiculo.belongsTo(Proprietario, { foreignKey: "id_proprietario" });

TipoVeiculo.hasMany(Veiculo, { foreignKey: "id_tipo" });
Veiculo.belongsTo(TipoVeiculo, { foreignKey: "id_tipo" });

Veiculo.belongsTo(Proprietario, { foreignKey: "id_proprietario" });
Veiculo.belongsTo(TipoVeiculo, { foreignKey: "id_tipo" });