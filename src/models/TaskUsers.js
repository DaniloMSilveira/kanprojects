const { DataTypes, Model } = require('sequelize');

class TaskUsers extends Model {
  static init(sequelize) {
    super.init(
      {
        task_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'TaskUsers',
        tableName: 'TaskUsers'
      }
    );

    return this;
  }
}

module.exports = TaskUsers;