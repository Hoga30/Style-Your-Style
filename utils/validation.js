
import {body} from 'express-validator';

export const forgotpasswordValidation=[
    body("email","Email is required").not().isEmpty(),
];

export const resetPasswordValidation=[

    body("password","password is required").not().isEmpty(),
    body("password","Password  should contain atleast 8 characters,uppercase and lower case letters,numbers and symbols").isStrongPassword(),
    body("confirmPassword","confirmPassword is required ").not().isEmpty()
];
export const otpValidation=[

    body("otp","otp is required").not().isEmpty()
];

export const signUpValidation=[
    body("Firstname","Firstname is required").not().isEmpty(),
    body("Lastname","Lastname is required").not().isEmpty(),
    body("email","Email is required").not().isEmpty(),
    body("email","Invalid email").isEmail(),
    body("password","password is required").not().isEmpty(),
    body("password","Password  should contain atleast 8 characters,uppercase and lower case letters,numbers and symbols").isStrongPassword(),
    // body("confirmPassword","confirmpassword is required ").not().isEmpty(),
  //  body("confirmpassword","confirmPassword  should contain atleast 8 characters,uppercase and lower case letters,numbers and symbols").isStrongPassword(),
];

export const signInValidation=[
    
    body("email","Email is required").not().isEmpty(),
    body("email","Invalid email").isEmail(),
    body("password","password is required").not().isEmpty(),
    body("password","Invalid password").isStrongPassword()
];

export const testValidation = [
    body("clotheName","the name of the clothe is required").not().isEmpty()
   
];

export const addClotheValidation = [
    body("clotheName", "clothe name is required").not().isEmpty(),
    body("category", "clothe category name is required").not().isEmpty 
];

export const addnewMessageValidation = [
    body("name", "name is required").not().isEmpty(),
    body("email", "email is required").not().isEmpty(),
    body("message", "message is required").not().isEmpty()
]
