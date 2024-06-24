import { Request } from "express";
import { Schema } from "mongoose";
export interface CreateUser extends Request {
  body: {
    name: string;
    email: string;
    adhar: string;
    state: string;
    dob: string;
    voterId: string;
    mobile: string;
    address: string;
    constituency: string;
    imgUrl: string;
  };
}
export interface CreateAdmin extends Request {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

export interface CreateElection extends Request {
  body: {
    electionName: string;
    // states: [string];
    // constituencies:[string],
    startDate:string,
    endDate:string
    // candidatesAsConstituency: [Schema.Types.ObjectId];
  };
}
export interface GiveVote extends Request {
  body: {
    candidateId: Schema.Types.ObjectId;
    electionId: Schema.Types.ObjectId;
    token: string;
  };
}
export interface VerifyWhenLogIn extends Request {
  body: { mobile: string; adhar: string; token: string };
}

export interface VerifyWhenGiveVote extends Request{
  body:{adhar:string}
}

export const role = ["Admin","Voter"];
export type roleType = "Admin" | "User";
export const party = ["INC", "BJP", "TMC","BSP","CPIM"];
// export type partyType = "INC" | "BJP" | "TMC" | "BSP" | "CPIM" | "AAP" | "SJP" | "RJP";
export const status = ["LIVE", "UPCOMING"];
export type statusType = "LIVE" | "UPCOMING";
export type electionNameType = "Parliameentary General Election (Lok Sabha)";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: any;
        name: string;
        email: string;
        verified: boolean;
        adhar: string;
        role: string;
        dob: string;
        mobile: string;
        address: string;
        age: number;
        constituency: string;
        state: string;
        imgUrl: string;
        voterId: string;
      };
      token: string;
    }
  }
}


export interface requestCandidate extends Request {
  body: {
    name: string;
    party: string;
    constituency: string;
    email: string;
    verified: boolean;
    adhar: string;
    location: string;
    role: string;
    dob: string;
    voterId: string;
    mobile: string;
    address: string;
    age: number;
    state: string;
    imgUrl: string;
  };
}
