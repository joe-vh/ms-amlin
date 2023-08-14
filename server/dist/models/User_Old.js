"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        name: {
            type: sequelize_1.STRING
        },
        email: {
            type: sequelize_1.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'email is required'
                }
            }
        },
        password: {
            type: sequelize_1.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'password is required'
                }
            }
        }
    });
    return User;
};
