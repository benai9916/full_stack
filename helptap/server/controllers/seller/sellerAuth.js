const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
// local
const { success, error } = require("../../utils/apiResponse");
const { sellerExistError } = require("./sellerUtils");
const prisma = new PrismaClient();

const signUp = async (req, res) => {
  try {
    const { email, sellerName } = req.body;
    if (!email || !sellerName)
      return res
        .status(400)
        .json(error("please enter all fields", res.statusCode));
    const seller = await prisma.seller.findFirst({
      where: { email: email },
    });
    if (seller) {
      return res
        .status(400)
        .json(error("Seller already  exists", res.statusCode));
    } else {
      const addSeller = await prisma.seller.create({
        data: {
          sellerName: sellerName,
          email: email,
        },
      });
      // log user in
      const token = jwt.sign(
        { sellerId: addSeller.id, email: addSeller.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.cookie("token", token, {httpOnly: true, secure: true,
        sameSite: "none"}).json(success("Successfully registered", res.statusCode, addSeller));
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

    const seller = await prisma.seller.findFirst({
      where: { email: email },
    });
    if (!seller) {
      sellerExistError(req, res);
    } else {
      // log user in
      const token = jwt.sign(
        { sellerId: seller.id, email: seller.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.cookie("token", token, {httpOnly: true, secure: true,
        sameSite: "none"}).json(success("Successfully logged in.", res.statusCode, seller));
    }
  } catch (err) {
    res
      .status(500)
      .json(success("Something went wrong, please try again.", res.statusCode));
  }
};

module.exports = {
  signUp,
  login,
};
