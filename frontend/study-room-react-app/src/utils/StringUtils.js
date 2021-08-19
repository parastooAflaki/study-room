export const isEmailValid = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !email || re.test(email);
};
export const capitalizeFirstLetter = (str) => {
  if (!(typeof str === "string" || str instanceof String)) str = str[0];
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const StringUtils = {
  isEmailValid,
  capitalizeFirstLetter,
};

export default StringUtils;
