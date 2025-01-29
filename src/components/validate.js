export const validate = (data, type) => {
  const errors = {};

  if (!data.email) {
    errors.email = "Email is Required!";
  } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(data.email).toLowerCase())) {
    errors.email = "Email address is invalid!";
  } else {
    delete errors.email;
  }

  
  

  if (type === "signUp") {
    if (!data.password) {
      errors.password = "Password is Required";
    } if (!(data.password.length >= 6)) {
      errors.password = "Password needs to be 6 characters or more";
    } if (!/[a-z]/.test(data.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } if (!/[A-Z]/.test(data.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } if (!/[0-9]/.test(data.password)) {
      errors.password = "Password must contain at least one number";
    } if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
      errors.password = "Password must contain at least one special character";
    } else {
      delete errors.password;
    }

    if (!data.fullName.trim()) {
      errors.name = "fullName is Required!";
    } else {
      delete errors.name;
    }
    if (!data.surname.trim()) {
      errors.surname = "Surname is Required!";
    } else {
      delete errors.surname;
    }
    if (!data.confirmPassword) {
      errors.password = "Confirm the Password";
    } else if (!(data.confirmPassword === data.password)) {
      errors.password = "Password does not match!";
    } else {
      delete errors.password;
    }

    if (data.IsAccepted) {
      delete errors.IsAccepted;
    } else {
      errors.IsAccepted = "Accept terms!";
    }
  }

  return errors;
};
