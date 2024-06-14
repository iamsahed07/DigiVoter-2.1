import { requestCandidate } from "#/@types";
import { RequestHandler } from "express";
import Candidate from "#/models/candidate";
import CandidatesAsConstituency from "#/models/candidatesAsConstituency";
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

export const addCandidate: RequestHandler = async (
  req: CreateAddCandidateRequest,
  res
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
    if (candidate)
      return res
        .status(500)
        .json({ error: "Candidate already exists", success: false });
    const imgFile = req.files?.profile as formidable.File;
    if (!imgFile)
      return res.status(422).json({ error: "Image file is missing!" });

    const imgRes = await cloudinary.uploader.upload(imgFile.filepath, {
      resource_type: "image",
    });
    const newCandidate = await Candidate.create({
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
    res.status(500).json({ error: err.message, success: false });
  }
};

export async function getAllCandidateBasedOnConstituency(req: any, res: any) {
  try {
    const { constituency } = req.body;
    const candidates = await Candidate.find({ constituency });
    const cadidateBasedConstituency = await CandidatesAsConstituency.findOne({
      constituency,
    });
    res.status(200).json({
      message: "Candidate successfully fetched",
      success: true,
      candidates,
      id: cadidateBasedConstituency?._id,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
}
