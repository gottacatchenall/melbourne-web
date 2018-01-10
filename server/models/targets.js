import DataTypes from 'sequelize';

var targets = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    incubator:{
        type: DataTypes.TINYINT,
    },
    target: {
        type: DataTypes.TINYINT
    }
};

module.exports = targets;
