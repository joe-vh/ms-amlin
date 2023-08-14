"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(32),
        allowNull: false,
        validate: {
            len: {
                args: [4, 32],
                msg: 'Name must be between 4 and 32 characters'
            }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING(32),
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
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: {
                args: [4, 100],
                msg: 'Password must be between 4 and 32 characters'
            }
        }
    }
}, {
    sequelize: db_1.sequelize,
    modelName: 'users'
});
exports.default = User;
