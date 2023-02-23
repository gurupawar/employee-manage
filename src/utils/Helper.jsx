function passwordValidation(password) {
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return "Password must contain at least one special character.";
  } else if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  } else if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  } else if (!/\d/.test(password)) {
    return "Password must contain at least one digit.";
  } else {
    return "";
  }
}

function confirmPasswordValidation(password, confirmPassword) {
  if (password === "") {
    return "";
  } else if (confirmPassword !== password) {
    return "Confirm password does't match!";
  } else {
    return "";
  }
}

function emailValidation(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  } else {
    return "";
  }
}

function nameValidation(name) {
  // Name should only contain letters, hyphens, and spaces

  if (!/^[A-Za-z- ]+$/.test(name)) {
    return "Please enter a valid input.";
  } else if (name.length < 3) {
    return "Name must be at least 3 characters long.";
  } else if (name.length > 20) {
    return "Name should not greater than 20.";
  } else {
    return "";
  }
}

function mobileValidation(mobile) {
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile)) {
    return "Please enter a valid mobile number 10 digits.";
  } else {
    return "";
  }
}

function validateZipCode(zipCode) {
  if (zipCode.length < 6 || zipCode.length > 6) {
    return "Pincode should be 6 digit";
  } else {
    return false;
  }
}

export {
  passwordValidation,
  confirmPasswordValidation,
  emailValidation,
  nameValidation,
  mobileValidation,
  validateZipCode,
};
