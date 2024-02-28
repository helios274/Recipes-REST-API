/**
 * @swagger
 * components:
 *   schemas:
 *     createUserInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - first_name
 *         - last_name
 *       properties:
 *         email:
 *           type: string
 *           default: example@mail.com
 *         password:
 *           type: string
 *           default: Password@43535
 *         first_name:
 *           type: string
 *           default: Random
 *         last_name:
 *           type: string
 *           default: User
 *         bio:
 *           type: string
 *           default: I'm a random user
 *     createUserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *     loginUserInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: example@mail.com
 *         password:
 *           type: string
 *           default: Password@43535
 */
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

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTagResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         tag:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             slug:
 *               type: string
 *     GetTagsResponse:
 *       type: object
 *       properties:
 *         tags:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *         totalTags:
 *           type: integer
 *         limit:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         page:
 *           type: integer
 *         pagingCounter:
 *           type: integer
 *         hasPrevPage:
 *           type: boolean
 *         hasNextPage:
 *           type: boolean
 *         prevPage:
 *           type: integer
 *           nullable: true
 *         nextPage:
 *           type: integer
 *           nullable: true
 *     GetSingleTagResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         slug:
 *           type: string
 */

export const tagValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Tag name is required",
    },
    isString: {
      errorMessage: "Tag name must be a string",
    },
    trim: true,
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
      errorMessage: "Value of limit must be a positive int",
    },
  },
  page: {
    optional: true,
    isInt: {
      errorMessage: "Value of page must be a positive int",
    },
  },
};

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateRecipeBody:
 *       type: object
 *       required:
 *         - title
 *         - method
 *         - tags
 *       properties:
 *         title:
 *           type: string
 *           default: Classic Chocolate Chip Cookies
 *         description:
 *           type: string
 *           default: Homemade cookies with gooey chocolate chips
 *         method:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 default:
 *                   - "1 cup unsalted butter, softened"
 *                   - "3/4 cup granulated sugar"
 *                   - "3/4 cup packed brown sugar"
 *                   - "1 teaspoon vanilla extract"
 *                   - "2 large eggs"
 *                   - "2 1/4 cups all-purpose flour"
 *                   - "1 teaspoon baking soda"
 *                   - "1/2 teaspoon salt"
 *                   - "2 cups semisweet chocolate chips"
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *                 default:
 *                   - "Preheat oven to 375°F (190°C)."
 *                   - "In a large bowl, cream together butter, granulated sugar, brown sugar, and vanilla extract until smooth."
 *                   - "Beat in eggs, one at a time, until well blended."
 *                   - "Combine flour, baking soda, and salt; gradually add to the creamed mixture and mix well."
 *                   - "Stir in chocolate chips."
 *                   - "Drop by rounded tablespoonfuls onto ungreased baking sheets."
 *                   - "Bake for 8 to 10 minutes or until golden brown."
 *                   - "Cool on wire racks."
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           default:
 *             - 65c49460da684f154afdb132
 *     CreateRecipeResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         recipe:
 *           type: object
 *           properties:
 *             user:
 *               type: string
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             method:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: string
 *                   steps:
 *                     type: array
 *                     items:
 *                       type: string
 *                   _id:
 *                     type: string
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *             _id:
 *               type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 *             slug:
 *               type: string
 *             __v:
 *               type: integer
 *     GetRecipesResponse:
 *       type: object
 *       properties:
 *         recipes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               user:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: object
 *                     properties:
 *                       first:
 *                         type: string
 *                       last:
 *                         type: string
 *                   _id:
 *                     type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               method:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: string
 *                     steps:
 *                       type: array
 *                       items:
 *                         type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               slug:
 *                 type: string
 *         totalRecipes:
 *           type: integer
 *         limit:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         page:
 *           type: integer
 *         pagingCounter:
 *           type: integer
 *         hasPrevPage:
 *           type: boolean
 *         hasNextPage:
 *           type: boolean
 *         prevPage:
 *           type: integer
 *           nullable: true
 *         nextPage:
 *           type: integer
 *           nullable: true
 *     GetSingleRecipeResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             name:
 *               type: object
 *               properties:
 *                 first:
 *                   type: string
 *                 last:
 *                   type: string
 *             _id:
 *               type: string
 *             date_joined:
 *               type: string
 *               format: date-time
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         method:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *               _id:
 *                 type: string
 *         tags:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         slug:
 *           type: string
 *         __v:
 *           type: integer
 *     UpdateRecipeBody:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           default: Classic Chocolate Chip Cookies
 *         description:
 *           type: string
 *           default: Homemade cookies with gooey chocolate chips
 *         method:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 default:
 *                   - "1 cup unsalted butter, softened"
 *                   - "3/4 cup granulated sugar"
 *                   - "3/4 cup packed brown sugar"
 *                   - "1 teaspoon vanilla extract"
 *                   - "2 large eggs"
 *                   - "2 1/4 cups all-purpose flour"
 *                   - "1 teaspoon baking soda"
 *                   - "1/2 teaspoon salt"
 *                   - "2 cups semisweet chocolate chips"
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *                 default:
 *                   - "Preheat oven to 375°F (190°C)."
 *                   - "In a large bowl, cream together butter, granulated sugar, brown sugar, and vanilla extract until smooth."
 *                   - "Beat in eggs, one at a time, until well blended."
 *                   - "Combine flour, baking soda, and salt; gradually add to the creamed mixture and mix well."
 *                   - "Stir in chocolate chips."
 *                   - "Drop by rounded tablespoonfuls onto ungreased baking sheets."
 *                   - "Bake for 8 to 10 minutes or until golden brown."
 *                   - "Cool on wire racks."
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           default:
 *             - 65c49460da684f154afdb132
 */

export const recipeValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "Title is required",
    },
    isString: {
      errorMessage: "Title must be a string",
    },
    trim: true,
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
    isString: {
      errorMessage: "Description must be a string",
    },
    trim: true,
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

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserBody:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           default: Random
 *         last_name:
 *           type: string
 *           default: User
 *         bio:
 *           type: string
 *           default: I'm a random user
 *     GetProfileResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: object
 *           properties:
 *             first:
 *               type: string
 *             last:
 *               type: string
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *         is_admin:
 *           type: boolean
 *         is_staff:
 *           type: boolean
 *         is_active:
 *           type: boolean
 *         last_login:
 *           type: string
 *           format: date-time
 *         date_joined:
 *           type: string
 *           format: date-time
 *         bio:
 *           type: string
 *     UpdateProfileResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             name:
 *               type: object
 *               properties:
 *                 first:
 *                   type: string
 *                 last:
 *                   type: string
 *             _id:
 *               type: string
 *             email:
 *               type: string
 *             is_admin:
 *               type: boolean
 *             is_staff:
 *               type: boolean
 *             is_active:
 *               type: boolean
 *             last_login:
 *               type: string
 *               format: date-time
 *             date_joined:
 *               type: string
 *               format: date-time
 *             bio:
 *               type: string
 */

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

/**
 * @swagger
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *     400ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         title:
 *           type: string
 *           example: Validation Error
 *         message:
 *           type: string
 *     401ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         title:
 *           type: string
 *           example: Unauthorized Access
 *         message:
 *           type: string
 *     403ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         title:
 *           type: string
 *           example: Unauthenticated Access
 *         message:
 *           type: string
 *     404ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         title:
 *           type: string
 *           example: Not Found Error
 *         message:
 *           type: string
 *     500ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         title:
 *           type: string
 *           example: Internal error
 *         message:
 *           type: string
 */
