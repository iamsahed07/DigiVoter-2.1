import { CreateElection } from "#/@types";
import Election from "#/models/election";
import { Response } from "express";
import { StatesAndConsituencies } from "#/utils/constituency";

export const createElection = async (req: CreateElection, res: Response) => {
  try {
    // Destructure request body
    const {
      electionName,
      //  states,
      //  constituencies,
      startDate,
      endDate,
    } = req.body;
    // Create a new election
    const election = new Election({
      electionName,
      areas: StatesAndConsituencies,
      startDate,
      endDate,
    });
    await election.save();
    res.status(200).json({
      message: "Election successfully created",
      election,
      success: true,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message, success: false });
  }
};

interface DeleteElection{
  body:{
    electionId:string
  }
}
export const deleteAnElection = async (req: DeleteElection, res: Response) => {
  try {
    // Destructure request body
    const { electionId } = req.body;
   
    await Election.deleteOne({_id:electionId})
    res.status(200).json({
      message: `Election deleted successfully`,
      success: true,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message, success: false });
  }
};

export const getAllElections = async (req: any, res: Response) => {
  try {
    const elections = await Election.find({});
    res.status(200).json({
      message: "All elections fetched successfully.",
      elections,
      success: true,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message, success: false });
  }
};
export const getAllStatesAndConstituency = async (req: any, res: Response) => {
  try {
    res.status(200).json({
      message: "All states and constituen fetched successfully.",
      StatesAndConsituencies,
      success: true,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message, success: false });
  }
};
