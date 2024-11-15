import { config } from "dotenv";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { ErrorHandlingMiddleware, router, sequelize } from "./src/index.js";

config();

const app = express();
const PORT = process.env.PORT;

const specs = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "School API",
            version: "1.0.0",
            description: "API for school",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ["./src/routes/lessons/*.js"],
});

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, { explorer: true })
);
app.use("/", router);
app.use(ErrorHandlingMiddleware);
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
