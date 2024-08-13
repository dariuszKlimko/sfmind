export function validateFirstName(firstName: string): boolean {
  if (firstName.length === 0){
    return  true;
  }
  return false;
}

export function validateEuAndLastName(continent: string, lastName: string): boolean {
  if (continent === "Europa" &&  lastName.length < 2){
    return true;
  }
  return false;
}

export function validateDate(birthDate: string): boolean {
  const today = new Date().toDateString()
  const pickedDay = new Date(birthDate).toDateString();
  const todayTime = new Date(today).getTime();
  const pickedDayTime = new Date(pickedDay).getTime();

  if (todayTime < pickedDayTime) {
    return true;
  }
  return false;
}

export function validateAge(birthDate: string): boolean {
  const todayDay = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();
  const pickedDay = new Date(birthDate).getDate();
  const pickedMonth = new Date(birthDate).getMonth();
  const pickedYear = new Date(birthDate).getFullYear();
  const ageToCompare = 1;

  if (todayYear - ageToCompare > pickedYear) return true;
  if (todayYear - ageToCompare === pickedYear && todayMonth > pickedMonth) return true;
  if (todayYear - ageToCompare === pickedYear &&
      todayMonth === pickedMonth &&
      todayDay > pickedDay) return true;
  return false;
}