export const findStatusOfElection = (startDate: string, endDate: string) => {
  const currentDate = new Date().toISOString().split("T")[0];
  if (startDate && endDate) {
    if (currentDate < startDate) {
      return "Upcoming";
    } else if (
      currentDate >= startDate &&
      currentDate <= endDate
    ) {
      return "Live"
    } else if (currentDate > endDate) {
      return "Ended"
    }
  }
};

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