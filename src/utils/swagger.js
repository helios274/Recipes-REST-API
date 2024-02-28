import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recipes REST API",
      version: "1.0.0",
      description: "Recipes REST API",
    },
    servers: [
      {
        url: process.env.IS_DEVELOPMENT
          ? `http://localhost:${process.env.PORT}/api/v1`
          : `${process.env.PRODUCTION_URL}/api/v1`,
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/utils/validationSchemas.js"],
};

const specs = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { customSiteTitle: "Recipes REST API" })
  );
}

export default swaggerDocs;
