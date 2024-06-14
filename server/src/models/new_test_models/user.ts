import { role } from "#/@types";
import {
  States,
  constituency,
  constituencyTypes,
  statesTypes,
} from "#/utils/constituency";
import { Model, ObjectId, Schema, model } from "mongoose";
export interface UserDocument {
  _id: ObjectId;
  name: string;
  email: string;
  verified: boolean;
  state: statesTypes;
  constituency: constituencyTypes;
  adhar: string;
  role: string;
  dob: string;
  voterId: string;
  mobile: string;
  address: string;
  imageurl: string;
}
interface Voter extends UserDocument {
  tokens: string[]; //store auth tokens
}
interface Methods {}
const userSchema = new Schema<Voter, {}, Methods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
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
    verified: {
      type: Boolean,
      default: false,
    },
    adhar: {
      type: String,
      required: true,
      unique: true,
    },
    tokens: [String],
    role: {
      type: String,
      enum: role,
      default: "Voter",
    },
    dob: {
      type: String,
      trim: true,
      required: true,
    },
    voterId: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    imageurl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model("User", userSchema) as Model<Voter, {}, Methods>;
