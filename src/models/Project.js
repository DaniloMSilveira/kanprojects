const { DataTypes, Model } = require('sequelize');

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        leader_id: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Project',
        tableName: 'Projects'
      }
    );

    return this;
  }
}

module.exports = Project;