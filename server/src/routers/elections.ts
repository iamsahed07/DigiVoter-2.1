import express from "express";
import {
  getAllElections,
  createElection,
  deleteAnElection,
  getAllStatesAndConstituency,
} from "#/controllars/elections";
import { validate } from "#/middleware/validator";
import { ElectionValidation } from "#/utils/validationSchema";
const router = express.Router();

router.post('/create', createElection)
router.delete('/delete-an-election', deleteAnElection)
router.get('/get-all', getAllElections)
router.get('/get-all-statesAndConsituency',getAllStatesAndConstituency)

export default router;