import { Router } from "express";
import { validate } from "#/middleware/validator";
import {
  AdharOrMobileValidation,
  CreateUserSchema,
  TokenAndAdharOrMobileValidation,
} from "#/utils/validationSchema";
import {
  adminLogOut,
  adminSignIn,
  createAdmin,
  createUser,
  getAllUser,
  getUserDetails,
  logOut,
  sendVerificationToken,
  signIn,
} from "#/controllars/auth";
import { adminMustAuth, userMustAuth } from "#/middleware/auth";
import { fileParser } from "#/middleware/fileParser";
const router = Router();

router.post("/createUser", fileParser, createUser); //only admin(EC) can create
router.post("/createAdmin", createAdmin); //only developer can create
router.post("/admin-sign-in", adminSignIn);
router.post(
  "/sendVerificationToken",
  validate(AdharOrMobileValidation),
  sendVerificationToken
);
router.post("/sign-in", validate(TokenAndAdharOrMobileValidation), signIn);
router.get("/getUser", userMustAuth, getUserDetails);
router.get("/getAllUser", getAllUser);
router.get("/log-out", userMustAuth, logOut);
router.get("/admin-log-out", adminMustAuth, adminLogOut);
export default router;
