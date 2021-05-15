const { DataTypes, Model } = require('sequelize');

class Sprint extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        project_id: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Sprint',
        tableName: 'Sprints'
      }
    );

    return this;
  }
}

module.exports = Sprint;