import StringUtils from "./StringUtils";

const validateLogin = (loginData) => {
  const errors = {};
  if (!loginData["password"] || loginData["password"].length === 0)
    errors["password"] = "Password can't be empty";

  if (!loginData["email"] || loginData["email"].length === 0)
    errors["email"] = "Email can't be empty";
  return errors;
};
const validateSignUp = (signupData) => {
  const errors = {};
  if (!signupData["password"] || signupData["password"].length < 6)
    errors["password"] = "Password should be at least 6 characters";

  if (signupData["password"] != signupData["repeat_password"])
    errors["repeat_password"] = "Passwords don't match";

  if (!signupData["email"] || signupData["email"].length === 0)
    errors["email"] = "Email can't be empty";
  else if (!StringUtils.isEmailValid(signupData["email"]))
    errors["email"] = "Email is in wrong format";

  if (!signupData["user_name"] || signupData["user_name"].length === 0)
    errors["user_name"] = "Username can't be empty";
  else if (!signupData["user_name"] || signupData["user_name"].length < 4)
    errors["user_name"] = "Username is too short";

  if (!signupData["first_name"] || signupData["first_name"].length === 0)
    errors["first_name"] = "Can't be empty";
  if (!signupData["last_name"] || signupData["last_name"].length === 0)
    errors["last_name"] = "Can't be empty";
  return errors;
};

const FormValidator = {
  validateLogin,
  validateSignUp,
};

export default FormValidator;
