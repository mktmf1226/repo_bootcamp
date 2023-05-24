const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      departmentId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      userid: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(500),
        allowNull: false,
        comment: '비밀번호에 hash함수 적용',
      },
      role: {
        type: Sequelize.STRING(20),
        defaultValue: 'staff',
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
      },
      phone: {
        type: Sequelize.STRING(255),
      },
      updatedPwDate: {
        type: Sequelize.DATE,
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

  // onDelete: 'SET NULL' department 데이터 삭제시 연결된 user의 departmentId를 Null값으로 변경
  // onDelete: 'CASCADE' department 데이터 삭제시 연결된 user의 정보도 삭제
  static associate(db) {
    db.User.belongsTo(db.Department, { foreignKey: { name: 'departmentId', onDelete: 'SET NULL', as: 'Department' } });
    db.User.hasMany(db.Board, { foreignKey: { name: 'UserId', onDelete: 'SET NULL', as: 'Boards' } });
  }

  static includeAttributes = ['id', 'name', 'role', 'email', 'phone', 'userid'];
};
