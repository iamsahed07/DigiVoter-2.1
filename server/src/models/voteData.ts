
import { Model, ObjectId, Schema, model } from "mongoose";
interface voteDocument {
  candidateRef: ObjectId;
  electionRef: ObjectId;
  constituencyRef: ObjectId;
  votes: number;
}
const voteSchema = new Schema<voteDocument>(
  {
    candidateRef: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
      unique: true,
    },
    electionRef: {
      type: Schema.Types.ObjectId,
      ref: "Election",
      required: true,
    },
    constituencyRef: {
      type: Schema.Types.ObjectId,
      ref: "CandidatesAsConstituency",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("VoteData", voteSchema) as Model<voteDocument>;
