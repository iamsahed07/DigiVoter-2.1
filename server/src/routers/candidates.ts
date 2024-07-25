import {
  addCandidate,
  getAllCandidate,
  getAllCandidateBasedOnConstituency,
  getAllCandidateBasedOnElectionName,
  getAllCandidateBasedOnState,
} from "#/controllars/candidate";
import { adminMustAuth, userMustAuth } from "#/middleware/auth";
import { fileParser } from "#/middleware/fileParser";
import { validate } from "#/middleware/validator";
import { CandidateValidation } from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();
router.post("/add-candidate",adminMustAuth, fileParser, addCandidate); //on admin can add
router.get("/get-all-candidate", getAllCandidate); //on admin can add
router.post(
  "/get-based-on-constituency",
  userMustAuth,
  getAllCandidateBasedOnConstituency
);
router.post("/get-based-on-state", userMustAuth, getAllCandidateBasedOnState);
router.post(
  "/get-based-on-electionName",
  userMustAuth,
  getAllCandidateBasedOnElectionName
);


router.post(
  "/admin-get-based-on-constituency",
  adminMustAuth,
  getAllCandidateBasedOnConstituency
);
router.post("/admin-get-based-on-state", adminMustAuth, getAllCandidateBasedOnState);
router.post(
  "/admin-get-based-on-electionName",
  adminMustAuth,
  getAllCandidateBasedOnElectionName
);


export default router;
