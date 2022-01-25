import {body ,query} from 'express-validator';
import { isJSDocDeprecatedTag } from 'typescript';
import User from '../models/User';

export class UserValidators{
    static signup(){
        return [body('email','Email is Required').isEmail().custom((email,{req})=>{
        //  console.log(req.body);
         return User.findOne({email:email}).then(user=>{
             if(user){
                 throw new Error('User Already Exist');
             }else{
                 return true;
             }
         }) 
        }),
        body('password','Password is Required').isAlphanumeric().isLength({min:8,max:20})
        .withMessage('Password can be from 8-20 characters only'),
        body('username','username is Required').isString()
       
    ]

    }

    static verifyUser(){
        return [body('verification_token','verification token is required').isNumeric(),
        body('email', 'Email is required').isEmail()]
    }

    static updatePassword() {
        return [body('password', 'Password is Required').isAlphanumeric(),
            body('confirm_password', 'Confirm Password is Required').isAlphanumeric(),
            body('new_password', 'New Password is Required').isAlphanumeric()
                .custom((newPassword, {req}) => {
                    if (newPassword === req.body.confirm_password) {
                        return true;
                    } else {
                        req.errorStatus = 422;
                        throw  new Error('Password and Confirm Password Does Not Match');
                    }
                })]
    }



  static resetPassword(){
      return[body('email','Email is Required').isEmail().custom((email,{req})=>{

        return User.findOne({email:email}).then(user=>{
            if(user){
  
                req.user= user;
                return true;
  
            }else{
                throw new Error('User Does Not Exist')
            }
  
        })
  
      }),body('new_password','New Password is Required').isAlphanumeric() 
      
       .custom((newPassword, {req}) => {
        if (newPassword === req.body.confirm_password) {
            return true;
        } else {
            req.errorStatus = 422;
            throw  new Error('Password and Confirm Password Does Not Match');
        }
    }),
      body('confirm_password','Confirm Password is Required').isAlphanumeric(),
      body('reset_password_token','Reset Password Token is Required').isNumeric().custom((token,{req})=>{
          if(Number(req.user.reset_password_token) === Number(token)){
             return true
          }else{

              req.errorStatus = 422;
              throw new Error('Reset Password Token is Invalid.Please Try Again')
          }
      })]
  }





   static login(){
    return [query('email','Email is Required').isEmail()
    .custom((email,{req})=>{

      return User.findOne({email:email}).then(user=>{
          if(user){

              req.user= user;
              return true;

          }else{
              throw new Error('User Does Not Exist')
          }

      })

    }),query('password','Password is Required').isAlphanumeric()]
   }


  static sendResetPasswordEmail(){
      return[query('email').isEmail().custom((email,{req})=>{
          return User.findOne({email:email}).then(user=>{
              if(user){
                  
               return true;
                 
              }else{

              throw new Error('Email Does not exist');

              }
          })
      })];
       
  }


  static verifyResetPasswordToken() {

     const date = new Date();
     const newdates = date.toISOString(); 

    return [query('reset_password_token', 'Reset Password Token is Required')
        .isNumeric().custom((token, {req}) => {
            return User.findOne({
                reset_password_token: token,
                reset_password_token_time: {$gt: newdates}
            }).then((user) => {
                 
                if (user) {
                    return true;
                } else {
                    throw new Error('Token Doest Not Exist.Please Request For a New One');
                }
            })
        })]
}



static updateProfilePic(){

    return[body('profile_pic').custom((profilePic,{req})=>{
        if(req.file){
            return true;
        }else{
            throw new Error('File not Uploaded');
        }
    })]

}



}

 
