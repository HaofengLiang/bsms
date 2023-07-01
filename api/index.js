import "./config.js";
import Express from "express";
import helmet from "helmet";
import cors from "cors";
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

const corsOptions = {
  origin: ["http://localhost:3000", "https://localhost:3000"],
};

let app = new Express();
app.use(helmet());
app.use(cors(corsOptions));
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
