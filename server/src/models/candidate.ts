
import { Model, Schema, model } from "mongoose";
import { number } from "yup";
interface candidateDocument {
  electionName: string;
  candidateName: string;
  party: string;
  constituency: string;
  adhar: string;
  state: string;
  dob: string;
  imgUrl: string;
  votes:number;
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
    },
    state: {
      type: String,
      required: true,
    },
    constituency: {
      type: String,
      required: true,
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
    },
    votes:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

export default model("Candidate", candidateSchema) as Model<candidateDocument>;
