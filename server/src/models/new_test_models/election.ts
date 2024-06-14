import { statusType, status } from "#/@types";
import { Model, ObjectId, Schema, model } from "mongoose";
interface electionDocument {
  id: ObjectId;
  electionName: string;
  status: statusType;
  candidatesAsConstituency: ObjectId[];
  electionResult: Number;
  allVotes: ObjectId[];
}
const electionSchema = new Schema<electionDocument>(
  {
    electionName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: status,
      required: true,
      default: "UPCOMING",
    },
    candidatesAsConstituency: [
      {
        type: Schema.Types.ObjectId,
        ref: "CandidatesAsConstituency",
      },
    ], ///Have a doubt on it
    electionResult: {
      type: Number,
      default: 0,
    },
    allVotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "GivenVote",
      },
    ],
  },
  { timestamps: true }
);

export default model("Election", electionSchema) as Model<electionDocument>;
