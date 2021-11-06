import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(morgan("dev"));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
  })
);
app.use("/api", routes);

app.listen(3002, () => {
  console.log("Servidor corriendo en puerto 3002");
});
