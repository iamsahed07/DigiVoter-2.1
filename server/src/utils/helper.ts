import { UserDocument } from "#/models/user";

export const generateToken = (length = 6) =>{
    //declare a variable
    let otp = "";

    for(let i = 0;i<length;i++){
        const digit = Math.floor(Math.random()*10)
        otp+=digit
    }
    return otp
}


export const formatProfile = (user:UserDocument)=>{
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      adhar: user.adhar,
      state: user.state,
      constituency: user.constituency,
      role: user.role,
      dob: user.dob,
      voterId: user.voterId,
      mobile: user.mobile,
      address: user.address,
      gender: user.gender,
    };
}

export const calculateAge = function (dob: string) {

  const dobDate = new Date(dob);
  const now = new Date();

  const dobYear = dobDate.getFullYear();
  const nowYear = now.getFullYear();

  let age = (nowYear - dobYear) as number;

  // Adjust age if birthday hasn't occurred yet this year
  const dobMonth = dobDate.getMonth();
  const nowMonth = now.getMonth();
  const dobDay = dobDate.getDate();
  const nowDay = now.getDate();

  if (nowMonth < dobMonth || (nowMonth === dobMonth && nowDay < dobDay)) {
    age--;
  }

  return age;
};