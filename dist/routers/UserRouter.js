"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserValidators_1 = require("../validators/UserValidators");
const globalMiddleware_1 = require("../middlewares/globalMiddleware");
const Utils_1 = require("../utils/Utils");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/send/verification/email', globalMiddleware_1.GlobalMiddleware.authenticate, UserController_1.UserController.resendVerificationEmail);
        this.router.get('/login', UserValidators_1.UserValidators.login(), globalMiddleware_1.GlobalMiddleware.CheckError, UserController_1.UserController.login);
        this.router.get('/reset/password', UserValidators_1.UserValidators.sendResetPasswordEmail(), globalMiddleware_1.GlobalMiddleware.CheckError, UserController_1.UserController.sendResetPasswordEmail);
        this.router.get('/verifiy/resetPasswordToken', UserValidators_1.UserValidators.verifyResetPasswordToken(), globalMiddleware_1.GlobalMiddleware.CheckError, UserController_1.UserController.verifyResetPasswordToken);
    }
    postRoutes() {
        this.router.post('/signup', UserValidators_1.UserValidators.signup(), globalMiddleware_1.GlobalMiddleware.CheckError, UserController_1.UserController.signup);
    }
    patchRoutes() {
        this.router.patch('/verify', globalMiddleware_1.GlobalMiddleware.authenticate, UserValidators_1.UserValidators.verifyUser(), globalMiddleware_1.GlobalMiddleware.CheckError, UserController_1.UserController.verify);
        this.router.patch('/update/password', globalMiddleware_1.GlobalMiddleware.authenticate, UserValidators_1.UserValidators.updatePassword(), globalMiddleware_1.GlobalMiddleware.CheckError, UserController_1.UserController.updatePassword);
        this.router.patch('/reset/password/', UserValidators_1.UserValidators.resetPassword(), globalMiddleware_1.GlobalMiddleware.CheckError, UserController_1.UserController.resetPassword);
        this.router.patch('/update/profilePic', globalMiddleware_1.GlobalMiddleware.authenticate, new Utils_1.Utils().multer.single('profile_pic'), UserValidators_1.UserValidators.updateProfilePic(), globalMiddleware_1.GlobalMiddleware.CheckError, UserController_1.UserController.updateProfilePic);
    }
    deleteRoutes() {
    }
}
exports.UserRouter = UserRouter;
exports.default = new UserRouter().router;
