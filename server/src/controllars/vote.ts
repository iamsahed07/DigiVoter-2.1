import { RequestHandler, Response } from "express";
import VoteData from '#/models/voteData';
import GivenVote from '#/models/givenVote'
import { GiveVote, VerifyWhenGiveVote, VerifyWhenLogIn } from "#/@types";
import { generateToken } from "#/utils/helper";
import User from '#/models/user'
import EmailVerificationToken from "#/models/emailVerificationToken";
import { sendOTPForVoteMail } from "#/utils/mail";
export const giveVote = async (req: GiveVote, res: Response) => {
  try {
    const { id } = req.user;
    const { candidateId, electionId, candidatesAsConstituencyId } = req.body;

    const isVoted = await GivenVote.findOne({ voterRef: id });
    if (isVoted) {
      return res
        .status(200)
        .json({ error: "Vote was already given by this Id!!", success: false });
    }

    const voteData = await VoteData.findOne({ candidateRef: candidateId });
    let newGivenVote;
    if (voteData) {
      voteData.votes += 1;
      await voteData.save();
      newGivenVote = await GivenVote.create({
        voteRef: voteData._id,
        voterRef: id,
      });
    } else {
      const newVote = await VoteData.create({
        candidateRef: candidateId,
        electionRef: electionId,
        constituencyRef: candidatesAsConstituencyId,
      });
      newVote.votes += 1;
      await newVote.save();
      newGivenVote = await GivenVote.create({
        voteRef: newVote._id,
        voterRef: id,
      });
    }
    res
      .status(200)
      .json({ message: "vote has been given sucessfully!!", success: true });
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