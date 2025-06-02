import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import bcrypt from "bcryptjs";

// Interface to help TypeScript understand req.body shape for registration
interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  avatar_id: number;
}

// ------------------- REGISTER -------------------

export const registerUser = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response
): Promise<any> => {
  const { firstName, lastName, email, password, role, avatar_id } = req.body;
  console.log('backend', req.body)
  if (!firstName || !lastName || !email || !password || !role) {
    console.log('Empty fields')
    return res.status(400).json({ message: "All fields are required.", user: null });
  }

  try {
    console.log('New user backend')
    const userRepo = AppDataSource.getRepository(User);

    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered.", user: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      avatar: { avatarId: avatar_id },
    });

    console.log('new user', newUser);
    const savedUser = await userRepo.save(newUser);
    console.log('saved user', savedUser);
    return res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error", user: null });
  }
};

// ------------------- LOGIN -------------------

export const loginUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log("Request:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "Email and password are required." });
  }

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { email },
      relations: { avatar: true }
    });

    if (!user) {
      return res.json({ message: "Invalid email or password.", user: null });
    }

    let isMatch = false;

    // Check if the stored password is hashed (starts with bcrypt hash prefix)
    if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$") || user.password.startsWith("$2y$")) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Plain text fallback (old users)
      isMatch = password === user.password;
    }


    return res.json({ message: "Login successful", user: user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
