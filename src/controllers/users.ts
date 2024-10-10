import { db } from "@/db/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response): Promise<any> {
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    phone,
    dob,
    gender,
    image,
    role,
  } = req.body;

  try {
    // check if the User already exists (email, username, phone)
    const existingUserByEmail = await db.user.findFirst({
      where: {
        OR: [{ email }, { username }, { phone }],
      },
    });
    if (existingUserByEmail) {
      return res.status(409).json({ error: "User already exists", data: null });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create the user
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        dob,
        role,
        gender,
        image: image
          ? image
          : "https://cdn-icons-png.flaticon.com/512/21/21104.png",
      },
    });
    // modify the returned User
    const { password: savedPassword, ...others } = newUser;
    res.status(201).json({
      data: others,
      error: null,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers(req: Request, res: Response): Promise<any> {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    const filteredUsers = users.map((user) => {
      const { password, ...others } = user;
      return others;
    });
    res.status(200).json({
      data: filteredUsers,
      error: null,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found", data: null });
    }
    const { password, ...others } = user;
    res.status(200).json({
      data: others,
      error: null,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserById(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.params;
  const { email, username, firstName, lastName, phone, dob, gender, image } =
    req.body;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found", data: null });
    }
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        email,
        username,
        firstName,
        lastName,
        phone,
        dob,
        gender,
        image,
      },
    });
    const { password, ...others } = updatedUser;
    res.status(200).json({
      data: others,
      error: null,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserPasswordById(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found", data: null });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
    const { password: savedPassword, ...others } = updatedUser;
    res.status(200).json({
      data: others,
      error: null,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUserById(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found", data: null });
    }
    await db.user.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      error: null,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function getAttendants(req: Request, res: Response): Promise<any> {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        role: "ATTENDENT",
      },
    });
    const filteredUsers = users.map((user) => {
      const { password, ...others } = user;
      return others;
    });
    res.status(200).json({
      data: filteredUsers,
      error: null,
    });
  } catch (error) {
    console.log(error);
  }
}
