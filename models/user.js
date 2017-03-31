/*jslint unparam: true*/
"use strict";
var bcrypt = require('bcrypt-node');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: DataTypes.STRING,
        passwordHash: DataTypes.STRING,
        passwordSalt: DataTypes.STRING,
        type : DataTypes.STRING,
        phone: DataTypes.STRING
    }, {
        instanceMethods: {
            json: function () {
                var result = {
                    id: this.id,
                    eamil: this.email,
                    password: this.passwordHash,
                    passwordSalt: this.passwordSalt,
                };
                return result;
            }
        },
        classMethods: {
            setPassword: function (password, callback) {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        callback(err);
                    }

                    bcrypt.hash(password, salt, null, function (err, hash) {
                        callback(err, hash, salt);
                    });

                });
            },
            comparePassword: function (password, userPassword, callback) {
                bcrypt.compare(password, userPassword, function (err, isPasswordMatch) {
                    if (err) {
                        callback(err);
                    }

                    callback(null, isPasswordMatch);
                });
            }
        }
    });
    return User;
};

