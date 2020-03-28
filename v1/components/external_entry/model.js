const Sequelize = require("sequelize");


class ExternalEntry extends Sequelize.Model {

    static init(sequelize, DataTypes) {
        return super.init({
            count: {
                type: DataTypes.STRING
            },
            last_page: {
                type: DataTypes.INTEGER

            }
        }, {
            modelName: "ExternalEntry",
            sequelize
        })
    }

}

module.exports = ExternalEntry;