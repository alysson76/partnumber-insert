const { Model, DataTypes } = require("sequelize");

class Partnumber extends Model {

}


/**
 * @param {import("sequelize").Sequelize} sequelize conexão com o db
 * @returns
 */
function initPartnumber (sequelize) {
    Partnumber.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        etiqueta_cliente: {
            type: DataTypes.STRING
        },
        estacao_inicial: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estacao_final: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cod_fornecedor: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: "Partnumber",
        tableName: "PART_NUMBER",
        underscored: true
    });

    return Partnumber;
}

module.exports = { initPartnumber }