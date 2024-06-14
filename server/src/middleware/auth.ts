import { RequestHandler } from "express";
import { JWT_SECRET } from "#/utils/variables";
import { verify, JwtPayload } from "jsonwebtoken";
import User from "#/models/user";
import { calculateAge } from "#/utils/helper";

export const mustAuth: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  const authorizationToken = authorization?.split("Bearer ")[1];
  if (!authorizationToken)
    return res.status(403).json({
      error: "Unauthorized request!!",
    });
  const payload = verify(authorizationToken, JWT_SECRET) as JwtPayload;
  const id = payload.userId;
  const user = await User.findOne({ _id: id, tokens: authorizationToken });
  if (!user) return res.status(403).json({ error: "Unauthorized request!" });
  const age = calculateAge(user.dob)
  req.user = {
    id: user._id,
    name: user.name,
    email: user.email,
    verified: user.verified,
    adhar: user.adhar,
    state: user.state,
    role: user.role,
    dob: user.dob,
    voterId: user.voterId,
    mobile: user.mobile,
    address: user.address,
    constituency: user.constituency,
    imgUrl:user.imgUrl,
    age,
  };
  req.token = authorizationToken;
  next();
};

export const isVerified: RequestHandler = (req, res, next) => {
  if (!req.user.verified)
    return res.status(403).json({ error: "Please verify your email account!" });
  next();
};
