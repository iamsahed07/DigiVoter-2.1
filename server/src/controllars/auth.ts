import { CreateAdmin, CreateUser, VerifyWhenLogIn } from "#/@types";
import EmailVerificationToken from "#/models/emailVerificationToken";
import User from "#/models/user";
import Election from "#/models/user";
import Admin from '#/models/admin';

import { generateToken } from "#/utils/helper";
import { sendVerificationMail } from "#/utils/mail";
import { RequestHandler, Response, Request } from "express";

import { JWT_SECRET } from "#/utils/variables";
import jwt from "jsonwebtoken";
import formidable from "formidable";
import cloudinary from "#/cloud";
import { RequestWithFiles } from "#/middleware/fileParser";
interface CreateAddRequest extends RequestWithFiles {
  body: {
    name: string;
    email:string;
    adhar:string;
    state:string;
    constituency: string;
    dob: string;
    voterId:string;
    mobile:string;
    address:string;
    role?:string;
    imgUrl:string;
    gender:string;
  };
}
interface CreateAddAdminRequest extends Request {
  body: {
    username: string;
    email:string;
    password:string;
  };
}
export const createUser = async (req: CreateAddRequest, res: Response) => {
  const {
    email,
    name,
    adhar,
    state,
    constituency,
    dob,
    voterId,
    mobile,
    address,
    gender
  } = req.body;
  const user = await User.findOne({ adhar });
  if (user)
    return res
      .status(500)
      .json({ error: "User already exists", success: false });
  const imgFile = req.files?.imgUrl as formidable.File;
  if (!imgFile)
    return res.status(422).json({ error: "Image file is missing!" });

  const imgRes = await cloudinary.uploader.upload(imgFile.filepath, {
    resource_type: "image",
  });
  await User.create({
    email,
    name,
    adhar,
    state,
    constituency,
    dob,
    voterId,
    mobile,
    address,
    imgUrl: imgRes.secure_url,
    gender
  });
  res.json({
    message: "User create successfully",
  });
};
export const getAllUser = async (req: Request, res: Response) => {
  try{
    const users = await User.find({});
    res.status(200).json({
      message: "All user fetch successfully",
      users,
      success: true
    });
  }catch(error){
    res.status(400).json({
      error: error, success:false
    })
  }
};

export const createAdmin = async (req: CreateAddAdminRequest, res: Response) => {
  const {
    email,
    username,
    password
  } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin)
    return res
      .status(400)
      .json({ error: "Admin already exists", success: false });
  await Admin.create({
    email,
    username,
    password,
  });
  res.json({
    message: "Admin has created successfully", success: true
  });
};
export const adminSignIn = async (req: CreateAdmin, res: Response) => {
  const {
    username,
    password
  } = req.body;
  const admin = await Admin.findOne({ username,password });
  if (!admin)
    return res
      .status(400)
      .json({ error: "Username or password invalid!!!", success: false });
   const JwtToken =  jwt.sign({ adminId: admin._id, role: 'Admin'},
    JWT_SECRET,
      {
      expiresIn: '1d'
    }
  );
  admin.tokens.push(JwtToken);
  await admin.save();
  res.json({
    message: "Admin signIn successfully", success: true,
    token: JwtToken
  });
};

export const sendVerificationToken: RequestHandler = async (
  req: VerifyWhenLogIn,
  res: Response
) => {
  // ${baseUrl}?UseAdhar=yes&UseMobile=no
  const { useAdhar, useMobile } = req.query;
  let user;

  //first all we have to check valid user or not
  if (useAdhar === "yes") {
    const { adhar } = req.body;
    user = await User.findOne({ adhar });
  }
  if (useMobile === "yes") {
    const { mobile } = req.body;
    user = await User.findOne({ mobile });
  }
  if (!user)
    return res
      .status(403)
      .json({ error: "Invalid request!! User not exists!!" });
  //any token already exist first remove it
  await EmailVerificationToken.findOneAndDelete({
    owner: user._id,
  });
  const token = generateToken();
  await EmailVerificationToken.create({
    owner: user._id,
    token,
  });

  sendVerificationMail(token, {
    name: user?.name,
    email: user?.email,
    userId: user?._id.toString(),
  });

  res.json({ message: "Please check your mail." });
};

export const signIn: RequestHandler = async (
  req: VerifyWhenLogIn,
  res: Response
) => {
  const { useAdhar, useMobile } = req.query;
  const { token, mobile, adhar } = req.body;

  let user;

  //first all we have to check valid user or not
  if (useAdhar === "yes") {
    user = await User.findOne({ adhar });
  }
  if (useMobile === "yes") {
    user = await User.findOne({ mobile });
  }
  if (!user)
    return res
      .status(403)
      .json({ error: "Invalid request!! User not exists!!" });

  const verificationToken = await EmailVerificationToken.findOne({
    owner: user._id,
  });
  if (!verificationToken)
    return res.status(403).json({ error: "Invalid token!" });
  const matched = verificationToken.compareToken(token);
  if (!matched) return res.status(403).json({ error: "Invalid token!" });
  const jwttoken = jwt.sign(
    { userId: user._id, role: user.role },
    JWT_SECRET,
      {
      expiresIn: '1d'
    }
  );
  user.tokens.push(jwttoken);
  user.verified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(verificationToken._id);
  res.json({
    profile: {
      id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      adhar: user.adhar,
      location: user.state,
      role: user.role,
      dob: user.dob,
      voterId: user.voterId,
      mobile: user.mobile,
      address: user.address,
    },
    token: jwttoken,
  });
};
export const getUserDetails: RequestHandler = async (
  req: Request,
  res: Response
) => {
  res.json({
    profile: req.user,
    token: req.token,
  });
};

export const logOut: RequestHandler = async (req, res) => {
  const { fromAll } = req.query;
  const token = req.token;
  const user = await User.findById(req.user.id);
  if (!user) throw new Error("something went wrong, user not found!");

  //logout from all
  // '/auth/logout?fromAll=true'
  if (fromAll === "yes") user.tokens = [];
  else user.tokens = user.tokens.filter((t) => t !== token);
  await user.save();
  res.json({ success: true });
};
export const adminLogOut: RequestHandler = async (req, res) => {
  const { fromAll } = req.query;
  const token = req.token;
  const admin = await Admin.findById(req.admin.id);
  // console.log(admin);
  if (!admin) throw new Error("something went wrong, admin not found!");

  //logout from all
  // '/auth/logout?fromAll=true'
  if (fromAll === "yes") admin.tokens = [];
  else admin.tokens = admin.tokens.filter((t) => t !== token);
  await admin.save();
  res.status(200).json({ success: true });
};
