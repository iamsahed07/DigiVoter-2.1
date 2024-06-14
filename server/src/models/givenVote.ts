import { Model, ObjectId, Schema, model } from "mongoose";
interface givenVoteDocument {
  voteRef: ObjectId;
  voterRef: ObjectId;
}
const givenVoteSchema = new Schema<givenVoteDocument>(
  {
    voteRef: {
      type: Schema.Types.ObjectId,
      ref: "VoteData",
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
