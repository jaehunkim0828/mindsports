import express from "express";
import cors from "cors";
import sq from "./models/index.js";
import rootRouter from "./route/index.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
app.use(express.static("public"));

app.use("/", rootRouter);

app.listen(5000, () => console.log("bock server running at 5000 port"));

sq.sync({ force: false });
