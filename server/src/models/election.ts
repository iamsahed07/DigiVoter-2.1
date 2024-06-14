import { statusType, status } from "#/@types";
import { Model, ObjectId, Schema, model } from "mongoose";
import { constituency,constituencyTypes,statesTypes,States } from "#/utils/constituency";
interface electionDocument {
  id: ObjectId;
  electionName: string;
  // status: statusType;
  // candidatesAsConstituency: ObjectId[];
  // electionResult: Number;
  // allVotes: ObjectId[];
  states: [statesTypes];
  constituencies: [constituencyTypes];
  startDate: string;
  endDate: string;
}
const electionSchema = new Schema<electionDocument>(
  {
    electionName: {
      type: String,
      required: true,
    },
    states: {
      type: [String],
      enum:States,
      required: true,
    },
    constituencies: {
      type: [String],
      enum:constituency,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },

    // status: {
    //   type: String,
    //   enum: status,
    //   required: true,
    //   default: "UPCOMING",
    // },
    // candidatesAsConstituency: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "CandidatesAsConstituency",
    //   },
    // ], ///Have a doubt on it
    // electionResult: {
    //   type: Number,
    //   default: 0,
    // },
    // allVotes: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "GivenVote",
    //   },
    // ],
  },
  { timestamps: true }
);

export default model("Election", electionSchema) as Model<electionDocument>;
