import { createShop, getShopAttendants, getShops } from "@/controllers/shops";
import express from "express";

const shopRouter = express.Router();

shopRouter.post("/shops", createShop);
shopRouter.get("/shops", getShops);
shopRouter.get("/attendants/shops/:shopId", getShopAttendants);

export default shopRouter;
