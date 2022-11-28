const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
// local
const { success, error } = require("../../utils/apiResponse");
const prisma = new PrismaClient();

const signUp = async (req, res) => {
  try {
    const { email, buyerName } = req.body;
    if (!email || !buyerName)
      return res
        .status(400)
        .json(error("please enter all fields", res.statusCode));
    const buyer = await prisma.buyer.findFirst({
      where: { email: email },
    });
    if (buyer) {
      return res.status(400).json(error("User already exists", res.statusCode));
    } else {
      const addBuyer = await prisma.buyer.create({
        data: {
          buyerName: buyerName,
          email: email,
        },
      });
      // log user in
      const token = jwt.sign(
        { buyerId: addBuyer.id, email: addBuyer.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json(success("Successfully registered", res.statusCode, addBuyer));
    }
  } catch (err) {
    res
      .status(500)
      .json(success("Something went wrong, please try again.", res.statusCode));
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json(error("please enter email id", res.statusCode));
    const buyer = await prisma.buyer.findFirst({
      where: { email: email },
    });
    if (!buyer) {
      return res
        .status(400)
        .json(error("User does not exists", res.statusCode));
    } else {
      // log user in
      const token = jwt.sign(
        { buyerId: buyer.id, email: buyer.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json(success("Successfully logged in", res.statusCode, buyer));
    }
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json(success("Something went wrong, please try again.", res.statusCode));
  }
};

const logout = (req, res) => {
  try {
    res
      .clearCookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
      })
      .json(success("Successfully logged out", res.statusCode));
  } catch (err) {
    res
      .status(500)
      .json(success("Something went wrong, please try again.", res.statusCode));
  }
};

module.exports = {
  signUp,
  login,
  logout,
};
