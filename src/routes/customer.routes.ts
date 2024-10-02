import express from "express";
import {
  createCustomers,
  getCustomerById,
  getCustomers,
} from "../controllers/customers";
const customerRouter = express.Router();

customerRouter.get("/customers", getCustomers);
customerRouter.post("/customers", createCustomers);
customerRouter.get("/customers/:id", getCustomerById);

export default customerRouter;
