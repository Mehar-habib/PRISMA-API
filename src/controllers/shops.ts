import { db } from "@/db/db";
import { Request, Response } from "express";

export async function createShop(req: Request, res: Response): Promise<any> {
  try {
    //   Get the data
    const { name, slug, location, adminId, attendantIds } = req.body;
    // check if the shop already exists
    const existingsShop = await db.shop.findUnique({
      where: {
        slug,
      },
    });
    if (existingsShop) {
      return res.status(409).json({
        error: "Shop already exists",
        data: null,
      });
    }
    // create the shop
    const newShop = await db.shop.create({
      data: {
        name,
        slug,
        location,
        adminId,
        attendantIds,
      },
    });
    // return the shop
    return res.status(201).json({
      data: newShop,
      error: null,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getShops(req: Request, res: Response): Promise<any> {
  try {
    const shops = await db.shop.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      data: shops,
      error: null,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getShopAttendants(
  req: Request,
  res: Response
): Promise<any> {
  const { shopId } = req.params;
  const existingShop = await db.shop.findUnique({
    where: {
      id: shopId,
    },
  });
  if (!existingShop) {
    return res.status(404).json({
      error: "Shop not found",
      data: null,
    });
  }
  const attendantIds = await db.user.findMany({
    where: {
      id: {
        in: existingShop.attendantIds,
      },
    },
  });
  return res.status(200).json({
    data: attendantIds,
    error: null,
  });
}
