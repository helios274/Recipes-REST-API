import { CreateUserRequest, LoginUserRequest } from "./auth.js";
import {
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "./user.js";
import { CreateTagResponse, GetTagResponse, GetTagsResponse } from "./tag.js";
import {
  CreateRecipeRequest,
  CreateRecipeResponse,
  GetRecipeResponse,
  GetRecipesResponse,
  UpdateRecipeRequest,
} from "./recipe.js";

const SuccessResponse = {
  description: "Success response",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
};
const ValidationErrorResponse = {
  description: "Validation error",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          title: {
            type: "string",
            default: "Validation Failed",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
};
const UnauthorizedErrorResponse = {
  description: "Unauthorized Access",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          title: {
            type: "string",
            default: "Unauthorized Access",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
};
const ForbiddenErrorResponse = {
  description: "Forbidden Error",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          title: {
            type: "string",
            default: "Forbidden",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
};
const NotFoundErrorResponse = {
  description: "Not found error",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          title: {
            type: "string",
            default: "Not Found",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
};
const InternalErrorResponse = {
  description: "Internal server error",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          title: {
            type: "string",
            default: "Internal server error",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
};

const requests = {
  CreateUserRequest,
  LoginUserRequest,
  UpdateProfileRequest,
  CreateRecipeRequest,
  UpdateRecipeRequest,
};

const responses = {
  GetProfileResponse,
  UpdateProfileResponse,
  CreateTagResponse,
  GetTagResponse,
  GetTagsResponse,
  CreateRecipeResponse,
  GetRecipeResponse,
  GetRecipesResponse,
  SuccessResponse,
  ValidationErrorResponse,
  UnauthorizedErrorResponse,
  ForbiddenErrorResponse,
  NotFoundErrorResponse,
  InternalErrorResponse,
};

export { requests, responses };
