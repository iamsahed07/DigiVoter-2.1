import { CreateElection } from "#/@types";
import Election from "#/models/election";
import { Response } from "express";

export const createElection = async (req: CreateElection, res: Response) => {
  try {
    // Destructure request body
    const { electionName, states,constituencies,startDate,endDate } = req.body;
    // Create a new election
    const election = new Election({
      electionName,
      states,
      constituencies,
      startDate,
      endDate,
      // candidatesAsConstituency,
    });
    await election.save();
    res
      .status(200)
      .json({
        message: "Election successfully created",
        election,
        success: true,
      });
  } catch (err:any) {
    res.status(400).json({ error: err.message, success: false });
  }
};

export const getAllElections = async (req: any, res: Response) => {
  try {
    const elections = await Election.find({});
    res
      .status(200)
      .json({
        message: "All elections fetched successfully.",
        elections,
        success: true,
      });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

