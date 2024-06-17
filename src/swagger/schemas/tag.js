export const CreateTagResponse = {
  description: "Response containing the new tag",
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
            default: "Tag created successfully",
          },
          tag: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                default: "60d21b4667d0d8992e610c85",
              },
              name: {
                type: "string",
                default: "Sample Tag",
              },
              slug: {
                type: "string",
                default: "sample-tag",
              },
            },
          },
        },
      },
    },
  },
};

export const GetTagsResponse = {
  description: "Response containing all tags with pagination",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          tags: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                  default: "60d21b4667d0d8992e610c85",
                },
                name: {
                  type: "string",
                  default: "Sample Tag",
                },
                slug: {
                  type: "string",
                  default: "sample-tag",
                },
              },
            },
          },
          totalTags: {
            type: "integer",
            default: 1,
          },
          limit: {
            type: "integer",
            default: 10,
          },
          totalPages: {
            type: "integer",
            default: 1,
          },
          page: {
            type: "integer",
            default: 1,
          },
          pagingCounter: {
            type: "integer",
            default: 1,
          },
          hasPrevPage: {
            type: "boolean",
            default: false,
          },
          hasNextPage: {
            type: "boolean",
            default: false,
          },
          prevPage: {
            type: "integer",
            nullable: true,
            default: null,
          },
          nextPage: {
            type: "integer",
            nullable: true,
            default: null,
          },
        },
      },
    },
  },
};

export const GetTagResponse = {
  description: "Response containing the requested tag",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            default: "60d21b4667d0d8992e610c85",
          },
          name: {
            type: "string",
            default: "Sample Tag",
          },
          slug: {
            type: "string",
            default: "sample-tag",
          },
        },
      },
    },
  },
};
