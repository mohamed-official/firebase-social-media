export const usernameValidate = {
  required: {
    value: true,
    message: "Username is required.",
  },
  minLength: {
    value: 3,
    message: "Username must be at least 3 characters.",
  },
  maxLength: {
    value: 25,
    message: "Username must be at most 25 characters.",
  },
  pattern: {
    value: /^[a-zA-Z0-9]+$/,
    message: "Username must contain letters and numbers only.",
  },
};

export const emailValidate = {
  required: {
    value: true,
    message: "Email is required.",
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "This email is invalid.",
  },
};

export const passwordValidate = {
  required: {
    value: true,
    message: "Password is required.",
  },
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters.",
  },
};
