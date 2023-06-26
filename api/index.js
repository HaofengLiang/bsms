import "./config.js";
import Express from "express";
import helmet from "helmet";
import CognitoExpress from "cognito-express";
import db from "./persistence/index.js";
import authMiddleware from "./utils/authMiddleware.js";
import businessController from "./routes/business/businessController.js";

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
  await db.sync();
  console.log("All models were synchronized successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
  db.close();
  process.exit(1);
}

const cognitoExpress = new CognitoExpress({
  region: process.env.COGNITO_REGION,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "id", //Possible Values: access | id
  // tokenExpiration: 3600000,
});

let app = new Express();
app.use(helmet());
app.use(authMiddleware);
app.use(Express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/business", businessController.save);

const port = process.env.PORT || 4000;
const server = app.listen(port);
console.log(`Running a API server at http://localhost:${port}`);

function cleanup() {
  server.close(function () {
    db.close();
    console.log("Closed out remaining connections.");
    process.exit();
  });

  setTimeout(function () {
    console.error("Could not close connections in time, forcing shut down");
    process.exit(1);
  }, 30 * 1000);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
