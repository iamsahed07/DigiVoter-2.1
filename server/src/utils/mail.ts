import { generateTemplate } from "#/mail/template";
import path from "path";
import { APP_USER,APP_PASS,SIGN_IN_URL } from "./variables";
import nodemailer from 'nodemailer'
const generateMailTransporter = () =>{
    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: APP_USER,
        pass: APP_PASS,
      },
    });
    return transport;
}

//token = 6 digit otp => 125445 => send  //we will use these
//token = attach these tokens to the <a href = "yoururl/token=slkfjas"  ==> verify


interface Profile{
    name:string,
    email:string,
    userId:string
}
//send verification email

export const sendVerificationMail = async(token:string,profile:Profile)=>{
const {name,email,userId} = profile;

const welcomeMessage = `Hi ${name}, welcome to Voting Platform! There are so much thing that we do for verified users. Use the given OTP to verify your email.`;
const transport = generateMailTransporter();
transport.sendMail({
  to: email,
  from: {
    name: "DigiVoter",
    address: APP_USER,
  },
  subject: "Welcome message",
  // html: `<h1>Your verification token is ${token}</h1>`
  html: generateTemplate({
    title: "Welcome to Voting Platform",
    message: welcomeMessage,
    btnTitle: token,
  }),
});
}
export const sendOTPForVoteMail = async(token:string,profile:Profile)=>{
const {name,email} = profile;

const welcomeMessage = `Hi ${name}. Use the given OTP to give a vote.`;
const transport = generateMailTransporter();
transport.sendMail({
  to: email,
  from: {
    name: "DigiVoter",
    address: APP_USER,
  },
  subject: "Welcome message",
  // html: `<h1>Your verification token is ${token}</h1>`
  html: generateTemplate({
    title: "Welcome to Voting Platform",
    message: welcomeMessage,
    btnTitle: token,
  }),
});
}

