import DataTypes from 'sequelize';

var inc = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    humidity: {
        type: DataTypes.TINYINT,
    },
    concurrent_target: {
        type: DataTypes.TINYINT,
    },
};

module.exports = inc;
