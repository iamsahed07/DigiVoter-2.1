import { Model, ObjectId, Schema, model } from "mongoose";
export interface AdminDocument {
  _id: ObjectId;
  username: string;
  email: string;
  password:string;
}
interface Admin extends AdminDocument {
  tokens: string[]; //store auth tokens
}
interface Methods {}
const adminSchema = new Schema<Admin, {}, Methods>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    tokens: [String],
    
  },
  { timestamps: true }
);

export default model("Admin", adminSchema) as Model<Admin, {}, Methods>;