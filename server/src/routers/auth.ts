import { Router } from "express";
import { validate } from "#/middleware/validator";
import {
  AdharOrMobileValidation,
  CreateUserSchema, TokenAndAdharOrMobileValidation,
} from "#/utils/validationSchema";
import {
  adminSignIn,
  createAdmin,
 createUser, getAllUser, getUserDetails, logOut, sendVerificationToken, signIn,
} from "#/controllars/auth";
import { mustAuth } from "#/middleware/auth";
import { fileParser } from "#/middleware/fileParser";
const router = Router();

router.post("/createUser",fileParser, createUser); //only admin(EC) can create
router.post("/createAdmin", createAdmin); //only developer can create
router.post ("/admin-sign-in",adminSignIn)
router.post("/sendVerificationToken", validate(AdharOrMobileValidation), sendVerificationToken); 
router.post("/sign-in", validate(TokenAndAdharOrMobileValidation),signIn);
router.get("/getUser",mustAuth,getUserDetails);
router.get("/getAllUser", getAllUser);
router.post("/log-out", mustAuth, logOut);
export default router;
