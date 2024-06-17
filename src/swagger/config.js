import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

import { requests, responses } from "./schemas/index.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recipes REST API",
      version: "1.0.0",
      description: "REST API for food recipes sharing website",
      contact: {
        name: "Adithya Prasad",
        url: "https://github.com/helios274",
      },
    },
    components: {
      requests,
      responses,
    },
    servers: [
      {
        url:
          process.env.NODE_ENV !== "production"
            ? `http://localhost:${process.env.PORT}/api/v1`
            : `${process.env.PRODUCTION_URL}/api/v1`,
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/utils/validation/schemas.js"],
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
