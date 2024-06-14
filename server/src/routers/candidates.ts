import {
  addCandidate,
  getAllCandidateBasedOnConstituency,
} from "#/controllars/candidate";
import { mustAuth } from "#/middleware/auth";
import { fileParser } from "#/middleware/fileParser";
import { validate } from "#/middleware/validator";
import { CandidateValidation } from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();
router.post("/add-candidate",fileParser, addCandidate); //on admin can add
router.patch("/get-based-on-constituency", getAllCandidateBasedOnConstituency);
export default router;