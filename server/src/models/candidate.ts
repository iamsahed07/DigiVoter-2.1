import { party, partyType, role } from "#/@types";
import { Model, Schema, model } from "mongoose";
import { constituency,constituencyTypes,statesTypes, States } from "#/utils/constituency";
interface candidateDocument {
  electionName: string;
  candidateName: string;
  party: string;
  constituency: constituencyTypes;
  adhar: string;
  state: statesTypes;
  dob: string;
  imgUrl: string;
}
const candidateSchema = new Schema<candidateDocument>(
  {
    candidateName: {
      type: String,
      required: true,
    },
    electionName: {
      type: String,
    },
    party: {
      type: String,
      enum: party,
    },
    state: {
      type: String,
      required: true,
      enum: States,
    },
    constituency: {
      type: String,
      required: true,
      enum: constituency,
    },
    adhar: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: String,
      trim: true,
      required: true,
    },
    imgUrl:{
      type:String,
      trim:true,
    }
  },
  { timestamps: true }
);

export default model("Candidate", candidateSchema) as Model<candidateDocument>;
