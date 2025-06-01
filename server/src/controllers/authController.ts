import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import bcrypt from "bcryptjs";

export const loginUser= async (req: Request, res: Response): Promise<any> => {
  console.log('Request:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "Email and password are required." });
  }

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email });

    if (!user) {
      return res.json({ message: "Invalid email or password.", user: null });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = (password == user.password)? true : false;
    if (!isMatch) {
      return res.json({ message: "Invalid email or password.", user: null });
    }

    return res.json({ message: "Login successful", user: user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
