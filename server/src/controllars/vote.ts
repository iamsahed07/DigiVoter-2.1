import { RequestHandler, Response } from "express";
import GivenVote from "#/models/givenVote";
import { GiveVote, VerifyWhenGiveVote, VerifyWhenLogIn } from "#/@types";
import { generateToken } from "#/utils/helper";
import User from "#/models/user";
import EmailVerificationToken from "#/models/emailVerificationToken";
import { sendOTPForVoteMail } from "#/utils/mail";
import Candidate from "#/models/candidate";
export const giveVote = async (req: GiveVote, res: Response) => {
  try {
    const { id } = req.user;
    const { candidateId, electionId, token } = req.body;
    const verificationToken = await EmailVerificationToken.findOne({
      owner: id,
    });
    if (!verificationToken)
      return res.status(403).json({ error: "Invalid Varification token!", success: false });
    const matched = await verificationToken.compareToken(token);
    if (!matched) return res.status(403).json({ error: "Invalid token!", success: false });
    await EmailVerificationToken.findByIdAndDelete(verificationToken._id);

    const isVoted = await GivenVote.findOne({ voterRef: id });
    if (isVoted) {
      return res
        .status(200)
        .json({ error: "Vote was already given by this Id!!", success: false });
    }

    const candidate = await Candidate.findOne({ _id: candidateId });
    if (candidate) {
      candidate.votes += 1;
      await candidate.save();
      const givenVote = new GivenVote({
        electionRef: electionId,
        voterRef: id,
      });
      await givenVote.save();
    } else {
      res
        .status(400)
        .json({ error: "candidate was not found!!", success: false });
    }
    res
      .status(200)
      .json({ message: "vote has been given sucessfully!!", success: true });
  } catch (err: any) {
    res.status(400).json({ message: err.message, success: false });
  }
};
export const isVoted: RequestHandler = async (req , res) => {
  try {
    const { id} = req.user;
    const {electionId } = req.body;
    const isVoted = await GivenVote.findOne({ voterRef: id, electionRef:electionId });
    if (isVoted) {
      return res
        .status(200)
        .json({
          message: "Vote was already given by the voter Id!!",
          isVoted: true,
          success: true,
        });
    }
    res.status(200).json({
      message: "No Vote is given by  by the voter Id!!",
      isVoted: false,
      success: true,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message, success: false });
  }
};

export const sendMailVote: RequestHandler = async (
  req: VerifyWhenGiveVote,
  res: Response
) => {
  let user;
  const { adhar } = req.body;

  // console.log(adhar)
  user = await User.findOne({ adhar });

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
  sendOTPForVoteMail(token, {
    name: user?.name,
    email: user?.email,
    userId: user?._id.toString(),
  });
  res.json({ message: "An OTP send to your registered mail." });
};
