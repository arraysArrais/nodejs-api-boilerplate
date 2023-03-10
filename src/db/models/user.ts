'use strict';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../instances/pg';

interface UserAttributes {
  id: number | any,
  email: string,
  password: string,
}

class User extends Model<UserAttributes> implements UserAttributes {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

  id: number | any;
  email!: string;
  password!: string;
  static associate(models: any) {
    // define association here
  }
}
User.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: 'User',
});

export default User;
