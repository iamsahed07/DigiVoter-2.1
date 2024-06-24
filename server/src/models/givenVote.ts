import { Model, ObjectId, Schema, model } from "mongoose";
interface givenVoteDocument {
  electionRef: ObjectId;
  voterRef: ObjectId;
}
const givenVoteSchema = new Schema<givenVoteDocument>(
  {
    electionRef: {
      type: Schema.Types.ObjectId,
      ref: "Election",
      required: true,
    },
    voterRef: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default model("GivenVote", givenVoteSchema) as Model<givenVoteDocument>;
