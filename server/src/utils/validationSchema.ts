import { isValidObjectId } from "mongoose";
import * as yup from "yup";
import { States, constituency } from "./constituency";
import { party, status } from "#/@types";
export const CreateUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing!!")
    .min(3, "Name is too short!!")
    .max(20, "Name is too long!"),
  email: yup.string().required("Email is missing!").email("Invalid email"),
  adhar: yup
    .string()
    .trim()
    .length(12, "Invalid adhar")
    .required("Adhar is missing!"),
  state: yup
    .string()
    .trim()
    .oneOf(States, "Invalid location!")
    .required("location is missing!"),
  constituency: yup
    .string()
    .trim()
    .oneOf(constituency, "Invalid Constituency!")
    .required("Constituency is missing!"),

  dob: yup
    .date()
    .max(new Date(), "DOB must be in the past")
    .required("DOB is required"),
  voterId: yup
    .string()
    .trim()
    .length(10, "Invalid voterId")
    .required("voterId is missing!"),
  mobile: yup
    .string()
    .trim()
    .length(10, "Invalid mobile no.")
    .required("Mobile no is missing!"),
  address: yup.string().trim().required("address no is missing!"),
});

export const TokenAndAdharOrMobileValidation = yup.object().shape({
  token: yup.string().trim().required("Invalid token!"),
  adhar: yup.lazy((value) => {
    if (!value || value.trim() === "") {
      return yup.string().trim();
    }
    return yup.string().trim().strip().required("Adhar is required");
  }),
  mobile: yup.lazy((value) => {
    if (!value || value.trim() === "") {
      return yup.string().trim();
    }
    return yup.string().trim().strip().required("Mobile is required");
  }),
});
export const AdharOrMobileValidation = yup.object().shape({
  adhar: yup.lazy((value) => {
    if (!value || value.trim() === "") {
      return yup.string().trim();
    }
    return yup.string().trim().strip().required("Adhar is required");
  }),
  mobile: yup.lazy((value) => {
    if (!value || value.trim() === "") {
      return yup.string().trim();
    }
    return yup.string().trim().strip().required("Mobile is required");
  }),
});

export const SignInValidationSchema = yup.object().shape({
  email: yup.string().required("Email is missing!").email("Invalid email id!"),
  password: yup.string().trim().required("Password is missing!"),
});

export const CandidateValidation = yup.object().shape({
  party: yup
    .string()
    .trim()
    .oneOf(party, "Invalid party!")
    .required("party is missing!"),
  name: yup
    .string()
    .trim()
    .required("Candidate Name is missing!!")
    .min(3, "Candidate Name is too short!!")
    .max(20, "Candidate Name is too long!"),
  email: yup.string().required("Email is missing!").email("Invalid email"),
  adhar: yup
    .string()
    .trim()
    .length(12, "Invalid adhar")
    .required("Adhar is missing!"),
  state: yup
    .string()
    .trim()
    .oneOf(States, "Invalid location!")
    .required("location is missing!"),
  constituency: yup
    .string()
    .trim()
    .oneOf(constituency, "Invalid Constituency!")
    .required("Constituency is missing!"),

  dob: yup
    .date()
    .max(new Date(), "DOB must be in the past")
    .required("DOB is required"),
  voterId: yup
    .string()
    .trim()
    .length(10, "Invalid voterId")
    .required("voterId is missing!"),
  mobile: yup
    .string()
    .trim()
    .length(10, "Invalid mobile no.")
    .required("Mobile no is missing!"),
  address: yup.string().trim().required("address no is missing!"),
});
export const ConstituencyValidation = yup.object().shape({
  constituency: yup
    .string()
    .trim()
    .oneOf(constituency, "Invalid Constituency!")
    .required("Constituency is missing!"),
});

export const ElectionValidation = yup.object().shape({
  electionName: yup.string().trim().required("Election name is missing!"),
  status: yup
    .string()
    .trim()
    .oneOf(status, "Invalid status! status can be LIVE or UPCOMING")
    .required("status is missing!"),
  candidatesAsConstituency: yup.array().min(1, "Minimum one required!!"),
});
// export const giveVoteSchema = yup.object().shape({

// });
