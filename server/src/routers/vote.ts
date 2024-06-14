import { Router } from "express";
import { validate } from "#/middleware/validator";
import { mustAuth } from "#/middleware/auth";
import { giveVote, sendMailVote } from "#/controllars/vote";
import { sendOTPForVoteMail } from "#/utils/mail";
const router = Router();
router.post("/give-vote", mustAuth, giveVote);
router.post("/sendOtpForVote", mustAuth,sendMailVote);
export default router;
