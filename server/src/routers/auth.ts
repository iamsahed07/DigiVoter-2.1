import { Router } from "express";
import { validate } from "#/middleware/validator";
import {
  AdharOrMobileValidation,
  CreateUserSchema, TokenAndAdharOrMobileValidation,
} from "#/utils/validationSchema";
import {
  create, getUserDetails, logOut, sendVerificationToken, signIn,
} from "#/controllars/auth";
import { mustAuth } from "#/middleware/auth";
import { fileParser } from "#/middleware/fileParser";
const router = Router();

router.post("/createUser",fileParser, create); //only admin can create
// router.post("/createAdmin",fileParser, createAdmin); //only admin can create
router.post("/sendVerificationToken", validate(AdharOrMobileValidation), sendVerificationToken); 
router.post("/sign-in", validate(TokenAndAdharOrMobileValidation),signIn);
router.get("/getUser", mustAuth,getUserDetails);
router.post("/log-out", mustAuth, logOut);
export default router;
