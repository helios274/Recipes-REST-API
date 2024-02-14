export const userValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Not a valid email",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    isLength: {
      options: {
        min: 6,
        max: 32,
      },
      errorMessage: "Password must be 4 to 12 characters long",
    },
    matches: {
      options:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      errorMessage:
        "Password must contain at least 1 lowercase, 1 uppercase, 1 digit, and 1 special character",
    },
  },
  first_name: {
    notEmpty: {
      errorMessage: "First name is required",
    },
    isString: {
      errorMessage: "First name must be a string",
    },
    isLength: {
      options: {
        min: 2,
        max: 50,
      },
      errorMessage:
        "First name should be min: 2 characters and max: 50 characters",
    },
    trim: true,
    escape: true,
  },
  last_name: {
    notEmpty: {
      errorMessage: "Last name is required",
    },
    isString: {
      errorMessage: "Last name must be a string",
    },
    isLength: {
      options: {
        min: 2,
        max: 50,
      },
      errorMessage:
        "Last name should be min: 2 characters and max: 50 characters",
    },
    trim: true,
    escape: true,
  },
  bio: {
    optional: true,
    isString: {
      errorMessage: "Bio must be a string",
    },
    isLength: {
      options: {
        max: 255,
      },
      errorMessage: "Bio should not have more than 255 characters",
    },
    trim: true,
    escape: true,
  },
};

export const tagValidationSchema = {
  name: {
    trim: true,
    notEmpty: {
      errorMessage: "Tag name is required",
    },
    isString: {
      errorMessage: "Tag name must be a string",
    },
    isLength: {
      options: {
        min: 2,
        max: 50,
      },
      errorMessage:
        "Tag name should be min: 2 characters and max: 50 characters",
    },
    escape: true,
  },
};

export const queryValidationSchema = {
  field: {
    in: "query",
  },
  search: {
    optional: true,
    isString: {
      errorMessage: "Search value must be a string",
    },
  },
  limit: {
    optional: true,
    isInt: {
      errorMessage: "limit value must be a positive int",
    },
  },
  page: {
    optional: true,
    isInt: {
      errorMessage: "page value must be a positive int",
    },
  },
};

export const recipeValidationSchema = {
  title: {
    trim: true,
    notEmpty: {
      errorMessage: "Title is required",
    },
    isString: {
      errorMessage: "Title must be a string",
    },
    isLength: {
      options: {
        min: 6,
        max: 150,
      },
      errorMessage: "Title should be min: 6 characters and max: 150 characters",
    },
    escape: true,
  },
  description: {
    trim: true,
    isString: {
      errorMessage: "Description must be a string",
    },
    escape: true,
  },
  method: {
    notEmpty: {
      errorMessage: "Method should not be empty",
    },
    isArray: {
      options: {
        min: 1,
      },
      errorMessage: "Method should not be an empty array",
    },
  },
  "method.*.name": {
    optional: true,
    isString: true,
  },
  "method.*.ingredients": {
    isArray: {
      options: {
        min: 1,
      },
      errorMessage: "Ingredients should not be an empty array",
    },
  },
  "method.*.ingredients.*": {
    isString: true,
    notEmpty: {
      errorMessage: "ingredients should not be an empty string",
    },
  },
  "method.*.steps": {
    isArray: {
      options: {
        min: 1,
      },
      errorMessage: "Steps should not be an empty array",
    },
  },
  "method.*.steps.*": {
    isString: true,
    notEmpty: {
      errorMessage: "step should not be an empty string",
    },
  },
  tags: {
    notEmpty: {
      errorMessage: "tags field should be an array of at least one tag ID.",
    },
    isArray: {
      options: {
        min: 1,
      },
      errorMessage: "tags field should be an array of at least one tag ID.",
    },
  },
  "tags.*": {
    isString: {
      errorMessage: "Tag ID must be a string",
    },
    notEmpty: {
      errorMessage: "Tag IDs should not be an empty string",
    },
  },
};

export const profileValidationSchema = {
  first_name: {
    optional: true,
    isString: {
      errorMessage: "First name must be a string",
    },
    isLength: {
      options: {
        min: 2,
        max: 50,
      },
      errorMessage:
        "First name should be min: 2 characters and max: 50 characters",
    },
    trim: true,
    escape: true,
  },
  last_name: {
    optional: true,
    isString: {
      errorMessage: "Last name must be a string",
    },
    isLength: {
      options: {
        min: 2,
        max: 50,
      },
      errorMessage:
        "Last name should be min: 2 characters and max: 50 characters",
    },
    trim: true,
    escape: true,
  },
  bio: {
    optional: true,
    isString: {
      errorMessage: "Bio must be a string",
    },
    isLength: {
      options: {
        max: 255,
      },
      errorMessage: "Bio should not have more than 255 characters",
    },
    trim: true,
    escape: true,
  },
};
