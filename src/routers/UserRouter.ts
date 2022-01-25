import { Router } from "express";
import path = require("path/posix");
import { UserController } from "../controllers/UserController";
import {body} from 'express-validator';
import { UserValidators } from "../validators/UserValidators";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";
import { Utils } from "../utils/Utils";
import { profile } from "console";

export class UserRouter {
    public router: Router

    constructor(){
        this.router = Router();

        this.getRoutes();

        this.postRoutes();

        this.patchRoutes();

        this.deleteRoutes();

    }
     getRoutes(){
        this.router.get('/send/verification/email', GlobalMiddleware.authenticate, UserController.resendVerificationEmail);
        this.router.get('/login',UserValidators.login(),GlobalMiddleware.CheckError,UserController.login);
        this.router.get('/reset/password',UserValidators.sendResetPasswordEmail(),GlobalMiddleware.CheckError,
        UserController.sendResetPasswordEmail);
        this.router.get('/verifiy/resetPasswordToken',UserValidators.verifyResetPasswordToken(),GlobalMiddleware.CheckError,
        UserController.verifyResetPasswordToken);
     }
    postRoutes(){
        this.router.post('/signup',UserValidators.signup(), GlobalMiddleware.CheckError, UserController.signup); 
       
    }

    patchRoutes(){
         
        this.router.patch('/verify', GlobalMiddleware.authenticate, UserValidators.verifyUser(), GlobalMiddleware.CheckError,
             UserController.verify);

           
          
            this.router.patch('/update/password', GlobalMiddleware.authenticate, UserValidators.updatePassword(), GlobalMiddleware.CheckError,
            UserController.updatePassword);


            this.router.patch('/reset/password/', UserValidators.resetPassword(),GlobalMiddleware.CheckError,UserController.resetPassword) ;
            this.router.patch('/update/profilePic',GlobalMiddleware.authenticate,
             new Utils().multer.single('profile_pic'),UserValidators.updateProfilePic(),GlobalMiddleware.CheckError,UserController.updateProfilePic)   
   
        }

    deleteRoutes(){

    }
}

export default new UserRouter().router;




