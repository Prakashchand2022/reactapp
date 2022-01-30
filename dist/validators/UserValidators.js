"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
class UserValidators {
    static signup() {
        return [(0, express_validator_1.body)('email', 'Email is Required').isEmail().custom((email, { req }) => {
                //  console.log(req.body);
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        throw new Error('User Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            (0, express_validator_1.body)('password', 'Password is Required').isAlphanumeric().isLength({ min: 8, max: 20 })
                .withMessage('Password can be from 8-20 characters only'),
            (0, express_validator_1.body)('username', 'username is Required').isString()
        ];
    }
    static verifyUser() {
        return [(0, express_validator_1.body)('verification_token', 'verification token is required').isNumeric(),
            (0, express_validator_1.body)('email', 'Email is required').isEmail()];
    }
    static updatePassword() {
        return [(0, express_validator_1.body)('password', 'Password is Required').isAlphanumeric(),
            (0, express_validator_1.body)('confirm_password', 'Confirm Password is Required').isAlphanumeric(),
            (0, express_validator_1.body)('new_password', 'New Password is Required').isAlphanumeric()
                .custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Password and Confirm Password Does Not Match');
                }
            })];
    }
    static resetPassword() {
        return [(0, express_validator_1.body)('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }), (0, express_validator_1.body)('new_password', 'New Password is Required').isAlphanumeric()
                .custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Password and Confirm Password Does Not Match');
                }
            }),
            (0, express_validator_1.body)('confirm_password', 'Confirm Password is Required').isAlphanumeric(),
            (0, express_validator_1.body)('reset_password_token', 'Reset Password Token is Required').isNumeric().custom((token, { req }) => {
                if (Number(req.user.reset_password_token) === Number(token)) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Reset Password Token is Invalid.Please Try Again');
                }
            })];
    }
    static login() {
        return [(0, express_validator_1.body)('email', 'Email is Required').isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }), (0, express_validator_1.body)('password', 'Password is Required').isAlphanumeric()];
    }
    static sendResetPasswordEmail() {
        return [(0, express_validator_1.query)('email').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('Email Does not exist');
                    }
                });
            })];
    }
    static verifyResetPasswordToken() {
        const date = new Date();
        const newdates = date.toISOString();
        return [(0, express_validator_1.query)('reset_password_token', 'Reset Password Token is Required')
                .isNumeric().custom((token, { req }) => {
                return User_1.default.findOne({
                    reset_password_token: token,
                    reset_password_token_time: { $gt: newdates }
                }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('Token Doest Not Exist.Please Request For a New One');
                    }
                });
            })];
    }
    static updateProfilePic() {
        return [(0, express_validator_1.body)('profile_pic').custom((profilePic, { req }) => {
                if (req.file) {
                    return true;
                }
                else {
                    throw new Error('File not Uploaded');
                }
            })];
    }
}
exports.UserValidators = UserValidators;
