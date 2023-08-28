exports.isString = (str) => {
  if (!str) return false;
  if (str.length == 0 || str.length == 1) return false;
  return true;
};

exports.isValidPassword = (str) => {
  if (this.isString(str)) {
    if (str.length > 5) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

exports.isValidEmail = (email) => {
  if (this.isString(email)) {
    if (email.length > 5 && email.includes("@") && email.includes(".com")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
