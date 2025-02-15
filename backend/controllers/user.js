import { User } from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password,
  });

  if (!user) {
    return res.status(404).render("login", {
      error: "Invalid email or password",
    });
  }

  const sessionToken = uuidv4();
  setUser(sessionToken, user);

  res.cookie("uid", sessionToken);

  return res.redirect("/");
}

export { handleUserSignup, handleUserLogin };
