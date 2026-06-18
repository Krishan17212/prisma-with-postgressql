import bcrypt from "bcrypt";
import { prisma } from "../config/db.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: `All fields ["Email", "Name", "Password"] are required`,
      });
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({
        message: `User with email ${email} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({
      message: "User registered successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: `All fields ["Email", "Password"] are required`,
      });
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      return res.status(404).json({
        message: `User with email ${email} not found`,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "User logged out successfully",
  });
};

export { register, login, logout };
