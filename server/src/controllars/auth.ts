import { CreateUser, VerifyWhenLogIn } from "#/@types";
import EmailVerificationToken from "#/models/emailVerificationToken";
import User from "#/models/user";
import Election from "#/models/user";

import { generateToken } from "#/utils/helper";
import { sendVerificationMail } from "#/utils/mail";
import { RequestHandler, Response, Request } from "express";

import { JWT_SECRET } from "#/utils/variables";
import jwt from "jsonwebtoken";
import formidable from "formidable";
import cloudinary from "#/cloud";
import { RequestWithFiles } from "#/middleware/fileParser";
interface CreateAddAddRequest extends RequestWithFiles {
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
  };
}
export const create = async (req: CreateAddAddRequest, res: Response) => {
  const {
    email,
    name,
    adhar,
    state,
    constituency,
    dob,
    voterId,
    mobile,
    address
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
  });
  res.json({
    message: "User create successfully",
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
    JWT_SECRET
    //   {
    //   expiresIn: '1d'
    // }
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
