import { requestCandidate } from "#/@types";
import { RequestHandler, Response } from "express";
import Candidate from "#/models/candidate";

import { RequestWithFiles } from "#/middleware/fileParser";
import formidable from "formidable";
import cloudinary from "#/cloud";

interface CreateAddCandidateRequest extends RequestWithFiles {
  body: {
    electionName: string;
    candidateName: string;
    party: string;
    constituency: string;
    adhar: string;
    state: string;
    dob: string;
  };
}

export const addCandidate = async (
  req: CreateAddCandidateRequest,
  res: Response
) => {
  try {
    const {
      electionName,
      candidateName,
      party,
      constituency,
      adhar,
      state,
      dob,
    } = req.body;
    const candidate = await Candidate.findOne({ adhar });
    // console.log(candidate);
    // console.log(
    //   electionName,
    //   candidateName,
    //   party,
    //   constituency,
    //   adhar,
    //   state,
    //   dob
    // );
    if (candidate)
      return res
        .status(300)
        .json({ error: "Candidate already exists", success: false });
    const imgFile = req.files?.profile as formidable.File;
    // console.log(imgFile);
    if (!imgFile)
      return res.status(422).json({ error: "Image file is missing!" });

    const imgRes = await cloudinary.uploader.upload(imgFile.filepath, {
      resource_type: "image",
    });
    // console.log(imgRes.secure_url)
    const newCandidate = new Candidate({
      electionName,
      candidateName,
      party,
      constituency,
      adhar,
      state,
      dob,
      imgUrl:imgRes.secure_url
    });
    await newCandidate.save();

    // const candidatesAsConstituency = await CandidatesAsConstituency.findOne({
    //   constituency,
    // });
    // if (candidatesAsConstituency) {
    //   candidatesAsConstituency.candidates.push(newCandidate._id);
    //   await candidatesAsConstituency.save();
    // } else {
    //   const newCandidateAsConstituency = new CandidatesAsConstituency({
    //     constituency,
    //   });
    //   newCandidateAsConstituency.candidates.push(newCandidate._id);
    //   await newCandidateAsConstituency.save();
    // }
    // console.log(req.body,req.files?.file);
    // console.log(imgRes);
    res.status(200).json({
      message: "Candidate added successfully",
      newCandidate,
      success: true,
    });
  } catch (err: any) {
    res.status(300).json({ error: err.message, success: false });
  }
};

export async function getAllCandidateBasedOnConstituency(req: any, res: any) {
  try {
    const { state, constituency } = req.body;
    const candidateBasedConstituency = await Candidate.find({
      state,
      constituency,
    });
    res.status(200).json({
      message: "Candidate cadidateBasedConstituency successfully fetched",
      success: true,
      candidateBasedConstituency,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message, success: false });
  }
}

export async function getAllCandidate(req: any, res: any) {
  try {
    const candidates = await Candidate.find({});
    // console.log(candidates)
    res.status(200).json({
      message: "Candidate successfully fetched",
      success: true,
      candidates,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message, success: false });
  }
}
