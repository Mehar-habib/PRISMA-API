import express from "express";
import customerRouter from "./routes/customer.routes";
import userRouter from "./routes/users.routes";
import shopRouter from "./routes/shop.routes";

require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.use("/api/v1", customerRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", shopRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
