const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      boardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
      },
      viewCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      imagePath: {
        type: Sequelize.STRING(255),
      },
      filePath: {
        type: Sequelize.STRING(255),
      },
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }

  static associate(db) {
    db.Post.belongsTo(db.Board, { foreignKey: { name: 'boardId', onDelete: 'SET NULL', as: 'Board' } });
    db.Post.belongsTo(db.User, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'User' } });
    db.Post.hasMany(db.Comment, { foreignKey: { name: 'postId', onDelete: 'SET NULL', as: 'Comments' } });
  }

  static includeAttributes = ['id', 'userId', 'title', 'viewCount'];
};
