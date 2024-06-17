export const CreateRecipeRequest = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        required: ["title", "method", "tags"],
        properties: {
          title: {
            type: "string",
            default: "Classic Chocolate Chip Cookies",
          },
          description: {
            type: "string",
            default: "Homemade cookies with gooey chocolate chips",
          },
          method: {
            type: "array",
            items: {
              type: "object",
              properties: {
                ingredients: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  default: [
                    "1 cup unsalted butter, softened",
                    "3/4 cup granulated sugar",
                    "3/4 cup packed brown sugar",
                    "1 teaspoon vanilla extract",
                    "2 large eggs",
                    "2 1/4 cups all-purpose flour",
                    "1 teaspoon baking soda",
                    "1/2 teaspoon salt",
                    "2 cups semisweet chocolate chips",
                  ],
                },
                steps: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  default: [
                    "Preheat oven to 375°F (190°C).",
                    "In a large bowl, cream together butter, granulated sugar, brown sugar, and vanilla extract until smooth.",
                    "Beat in eggs, one at a time, until well blended.",
                    "Combine flour, baking soda, and salt; gradually add to the creamed mixture and mix well.",
                    "Stir in chocolate chips.",
                    "Drop by rounded tablespoonfuls onto ungreased baking sheets.",
                    "Bake for 8 to 10 minutes or until golden brown.",
                    "Cool on wire racks.",
                  ],
                },
              },
            },
          },
          tags: {
            type: "array",
            items: {
              type: "string",
            },
            default: ["65c49460da684f154afdb132", "65c49460da684f154afdb135"],
          },
        },
      },
    },
  },
};

export const CreateRecipeResponse = {
  description: "Response containing the new recipe",
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
            default: "Recipe created successfully",
          },
          recipe: {
            type: "object",
            properties: {
              user: {
                type: "string",
                default: "60d21b4667d0d8992e610c85",
              },
              title: {
                type: "string",
                default: "Classic Chocolate Chip Cookies",
              },
              description: {
                type: "string",
                default: "Homemade cookies with gooey chocolate chips",
              },
              method: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    ingredients: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      default: [
                        "1 cup unsalted butter, softened",
                        "3/4 cup granulated sugar",
                        "3/4 cup packed brown sugar",
                        "1 teaspoon vanilla extract",
                        "2 large eggs",
                        "2 1/4 cups all-purpose flour",
                        "1 teaspoon baking soda",
                        "1/2 teaspoon salt",
                        "2 cups semisweet chocolate chips",
                      ],
                    },
                    steps: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      default: [
                        "Preheat oven to 375°F (190°C).",
                        "In a large bowl, cream together butter, granulated sugar, brown sugar, and vanilla extract until smooth.",
                        "Beat in eggs, one at a time, until well blended.",
                        "Combine flour, baking soda, and salt; gradually add to the creamed mixture and mix well.",
                        "Stir in chocolate chips.",
                        "Drop by rounded tablespoonfuls onto ungreased baking sheets.",
                        "Bake for 8 to 10 minutes or until golden brown.",
                        "Cool on wire racks.",
                      ],
                    },
                    _id: {
                      type: "string",
                      default: "60d21b4667d0d8992e610c85",
                    },
                  },
                },
              },
              tags: {
                type: "array",
                items: {
                  type: "string",
                },
                default: [
                  "65c49460da684f154afdb132",
                  "65c49460da684f154afdb135",
                ],
              },
              _id: {
                type: "string",
                default: "60d21b4667d0d8992e610c85",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                default: "2024-06-16T18:36:53.365Z",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                default: "2024-06-16T18:36:53.365Z",
              },
              slug: {
                type: "string",
                default: "classic-chocolate-chip-cookies",
              },
              __v: {
                type: "integer",
                default: 0,
              },
            },
          },
        },
      },
    },
  },
};

export const GetRecipesResponse = {
  description: "Response containing paginated recipes",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          recipes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                  default: "60d21b4667d0d8992e610c85",
                },
                user: {
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
                  },
                },
                title: {
                  type: "string",
                  default: "Classic Chocolate Chip Cookies",
                },
                description: {
                  type: "string",
                  default: "Homemade cookies with gooey chocolate chips",
                },
                method: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      ingredients: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        default: [
                          "1 cup unsalted butter, softened",
                          "3/4 cup granulated sugar",
                          "3/4 cup packed brown sugar",
                          "1 teaspoon vanilla extract",
                          "2 large eggs",
                          "2 1/4 cups all-purpose flour",
                          "1 teaspoon baking soda",
                          "1/2 teaspoon salt",
                          "2 cups semisweet chocolate chips",
                        ],
                      },
                      steps: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        default: [
                          "Preheat oven to 375°F (190°C).",
                          "In a large bowl, cream together butter, granulated sugar, brown sugar, and vanilla extract until smooth.",
                          "Beat in eggs, one at a time, until well blended.",
                          "Combine flour, baking soda, and salt; gradually add to the creamed mixture and mix well.",
                          "Stir in chocolate chips.",
                          "Drop by rounded tablespoonfuls onto ungreased baking sheets.",
                          "Bake for 8 to 10 minutes or until golden brown.",
                          "Cool on wire racks.",
                        ],
                      },
                    },
                  },
                },
                tags: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        default: "65c49460da684f154afdb132",
                      },
                      name: {
                        type: "string",
                        default: "Dessert",
                      },
                    },
                  },
                },
                createdAt: {
                  type: "string",
                  format: "date-time",
                  default: "2024-06-16T18:36:53.365Z",
                },
                slug: {
                  type: "string",
                  default: "classic-chocolate-chip-cookies",
                },
              },
            },
          },
          totalRecipes: {
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

export const GetRecipeResponse = {
  description: "Response containing the requested recipe",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            default: "60d21b4667d0d8992e610c85",
          },
          user: {
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
              date_joined: {
                type: "string",
                format: "date-time",
                default: "2024-06-16T18:36:53.365Z",
              },
            },
          },
          title: {
            type: "string",
            default: "Classic Chocolate Chip Cookies",
          },
          description: {
            type: "string",
            default: "Homemade cookies with gooey chocolate chips",
          },
          method: {
            type: "array",
            items: {
              type: "object",
              properties: {
                ingredients: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  default: [
                    "1 cup unsalted butter, softened",
                    "3/4 cup granulated sugar",
                    "3/4 cup packed brown sugar",
                    "1 teaspoon vanilla extract",
                    "2 large eggs",
                    "2 1/4 cups all-purpose flour",
                    "1 teaspoon baking soda",
                    "1/2 teaspoon salt",
                    "2 cups semisweet chocolate chips",
                  ],
                },
                steps: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  default: [
                    "Preheat oven to 375°F (190°C).",
                    "In a large bowl, cream together butter, granulated sugar, brown sugar, and vanilla extract until smooth.",
                    "Beat in eggs, one at a time, until well blended.",
                    "Combine flour, baking soda, and salt; gradually add to the creamed mixture and mix well.",
                    "Stir in chocolate chips.",
                    "Drop by rounded tablespoonfuls onto ungreased baking sheets.",
                    "Bake for 8 to 10 minutes or until golden brown.",
                    "Cool on wire racks.",
                  ],
                },
                _id: {
                  type: "string",
                  default: "60d21b4667d0d8992e610c85",
                },
              },
            },
          },
          tags: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                  default: "65c49460da684f154afdb132",
                },
                name: {
                  type: "string",
                  default: "Dessert",
                },
                slug: {
                  type: "string",
                  default: "dessert",
                },
              },
            },
          },
          createdAt: {
            type: "string",
            format: "date-time",
            default: "2024-06-16T18:36:53.365Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            default: "2024-06-16T18:36:53.365Z",
          },
          slug: {
            type: "string",
            default: "classic-chocolate-chip-cookies",
          },
          __v: {
            type: "integer",
            default: 0,
          },
        },
      },
    },
  },
};

export const UpdateRecipeRequest = {
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          title: {
            type: "string",
            default: "South Indian Lemon Rice",
          },
          description: {
            type: "string",
            default:
              "Lemon rice is one of the most common dishes from South India, where it also goes by the name chitranna. There are a few variations to making this dish and this is just one of them.",
          },
          method: {
            type: "array",
            items: {
              type: "object",
              properties: {
                ingredients: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  default: [
                    "1 teaspoon coriander seeds",
                    "2 tablespoons vegetable oil, canola, sunflower, or sesame cooking oil",
                    "1 teaspoon mustard seeds",
                    "3 to 4 curry leaves",
                    "2 medium green chiles, slit lengthwise",
                    "1 (1-inch) piece ginger, grated",
                    "1/2 cup roasted unsalted peanuts",
                    "1 teaspoon turmeric powder",
                    "Juice of 2 medium lemons",
                    "2 cups cooked basmati rice, or leftover rice",
                    "Salt, to taste",
                  ],
                },
                steps: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  default: [
                    "Gather the ingredients.",
                    "In a large, dry skillet or saucepan, gently toast the coriander seeds over medium-low heat until fragrant, about 1 minute. Coarsely grind the seeds into a powder. Set aside.",
                    "Heat the oil in the same pan on medium heat until it shimmers. Add the mustard seeds, curry leaves, and green chiles. Fry the mixture until the splattering stops.",
                    "Add the ginger and peanuts. Fry the mixture until fragrant, about 1 minute more.",
                    "Stir in the turmeric powder and turn off the burner.",
                    "Add the lemon juice and mix well.",
                    "Add the rice, toasted coriander powder, and salt to taste. Mix thoroughly. Serve and enjoy.",
                  ],
                },
              },
            },
          },
          tags: {
            type: "array",
            items: {
              type: "string",
            },
            default: ["65c49460da684f154afdb132", "65c49460da684f154afdb135"],
          },
        },
      },
    },
  },
};
