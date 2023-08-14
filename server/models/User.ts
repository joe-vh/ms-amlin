import { Model, DataTypes, Optional } from 'sequelize';
import {sequelize} from '../db';
import bcrypt from 'bcrypt';

interface UserAttributes {
    id: number;
    email: string;
    name: string;
    password: string;
}

interface UserCreationAttributes extends Optional <UserAttributes, 'id'> {}

export class User extends Model <UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            len: {
                args: [4, 32],
                msg: 'Name must be between 4 and 32 characters'
            }
        }
    },
    email: {
        type: DataTypes.STRING(32),
        unique: true,
        allowNull: false,
        validate: {
            len: {
                args: [4, 32],
                msg: 'Email must be between 4 and 32 characters'
            }
        }
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: {
                args: [4, 100],
                msg: 'Password must be between 4 and 32 characters'
            }
        }
    }
}, {
    sequelize,
    modelName: 'users'
});

export default User;
