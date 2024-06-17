export const CreateUserRequest = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        required: ["email", "password", "first_name", "last_name"],
        properties: {
          email: {
            type: "string",
            default: "alice@mail.com",
          },
          password: {
            type: "string",
            default: "Alice@123",
          },
          first_name: {
            type: "string",
            default: "Alice",
          },
          last_name: {
            type: "string",
            default: "James",
          },
          bio: {
            type: "string",
            default: "I am a professional chef.",
          },
        },
      },
    },
  },
};

export const LoginUserRequest = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            default: "alice@mail.com",
          },
          password: {
            type: "string",
            default: "Alice@123",
          },
        },
      },
    },
  },
};
