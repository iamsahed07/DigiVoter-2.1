import { constituency, constituencyTypes, States, statesTypes } from "#/utils/constituency";
import { Model, ObjectId, Schema, model } from "mongoose";
export interface candidatesAsConstituencyDocument {
  _id: ObjectId;
  constituency: constituencyTypes;
  candidates: ObjectId[];
}
const candidatesAsConstituencySchema =
  new Schema<candidatesAsConstituencyDocument>(
    {
      constituency: {
        type: String,
        required: true,
        enum: constituency,
        unique: true,
      },
      candidates: {
        type: [
          {
            type: Schema.Types.ObjectId,
            ref: "Candidate",
          },
        ],
      },
    },
    { timestamps: true }
  );

export default model(
  "CandidatesAsConstituency",
  candidatesAsConstituencySchema
) as Model<candidatesAsConstituencyDocument>; //location wise Candidates
