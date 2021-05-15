const { DataTypes, Model } = require('sequelize');

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        status: DataTypes.STRING,
        sprint_id: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Task',
        tableName: 'Tasks'
      }
    );

    return this;
  }
}

module.exports = Task;