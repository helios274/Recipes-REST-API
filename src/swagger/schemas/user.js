export const UpdateProfileRequest = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          first_name: {
            type: "string",
            default: "Random",
          },
          last_name: {
            type: "string",
            default: "User",
          },
          bio: {
            type: "string",
            default: "I'm a random user",
          },
        },
      },
    },
  },
};

export const GetProfileResponse = {
  description: "Response containing the profile information",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          name: {
            type: "object",
            properties: {
              first: {
                type: "string",
                default: "John",
              },
              last: {
                type: "string",
                default: "Doe",
              },
            },
          },
          _id: {
            type: "string",
            default: "60d21b4667d0d8992e610c85",
          },
          email: {
            type: "string",
            default: "john.doe@example.com",
          },
          is_admin: {
            type: "boolean",
            default: false,
          },
          is_staff: {
            type: "boolean",
            default: false,
          },
          is_active: {
            type: "boolean",
            default: true,
          },
          last_login: {
            type: "string",
            format: "date-time",
            default: "2024-06-16T18:36:53.365Z",
          },
          date_joined: {
            type: "string",
            format: "date-time",
            default: "2024-06-16T18:36:53.365Z",
          },
          bio: {
            type: "string",
            default: "I'm a random user",
          },
        },
      },
    },
  },
};

export const UpdateProfileResponse = {
  description: "Response containing the updated profile",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            default: true,
          },
          message: {
            type: "string",
            default: "Profile updated successfully",
          },
          data: {
            type: "object",
            properties: {
              name: {
                type: "object",
                properties: {
                  first: {
                    type: "string",
                    default: "John",
                  },
                  last: {
                    type: "string",
                    default: "Doe",
                  },
                },
              },
              _id: {
                type: "string",
                default: "60d21b4667d0d8992e610c85",
              },
              email: {
                type: "string",
                default: "john.doe@example.com",
              },
              is_admin: {
                type: "boolean",
                default: false,
              },
              is_staff: {
                type: "boolean",
                default: false,
              },
              is_active: {
                type: "boolean",
                default: true,
              },
              last_login: {
                type: "string",
                format: "date-time",
                default: "2024-06-16T18:36:53.365Z",
              },
              date_joined: {
                type: "string",
                format: "date-time",
                default: "2024-06-16T18:36:53.365Z",
              },
              bio: {
                type: "string",
                default: "I'm a random user",
              },
            },
          },
        },
      },
    },
  },
};
