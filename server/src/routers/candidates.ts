import {
  addCandidate,
  getAllCandidate,
  getAllCandidateBasedOnConstituency,
} from "#/controllars/candidate";
import { mustAuth } from "#/middleware/auth";
import { fileParser } from "#/middleware/fileParser";
import { validate } from "#/middleware/validator";
import { CandidateValidation } from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();
router.post("/add-candidate",fileParser, addCandidate); //on admin can add
router.get("/get-all-candidate", getAllCandidate); //on admin can add

router.patch("/get-based-on-constituency",mustAuth, getAllCandidateBasedOnConstituency);
export default router;