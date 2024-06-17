import { prisma } from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register new user
const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUSer = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    if (newUSer) {
      const { password, ...account } = newUSer;
      return res
        .status(201)
        .json({ sucess: "Account created succesfully", account });
    }
    return res.status(500).json({ error: "something went wrong" });
  } catch (error) {
    console.log(error);
    if (error.code === "P2002")
      return res.status(300).json({ error: "email already exist" });
  }
};

//Auth user
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const { password, ...account } = user;
        const authToken = jwt.sign(account, process.env.JWT_AUTH_SECRET, {
          expiresIn: "30m",
        });
        return res.status(200).json({
          success: "Login approved",
          account,
          authToken: authToken,
        });
      } else {
        res.status(500).json({ eror: "invalid credentials" });
      }
    } else {
      res.status(400).json({ error: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profile_image: true,
        isAdmin: true,
      },
    });
    if (users) return res.status(200).json(users);
    return res.status(400).json({ error: "Internal Server Error" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, authUser, getAllUsers };
