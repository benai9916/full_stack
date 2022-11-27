const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
// local
const { isSellerExists } = require("./sellerUtils");
const { success, error } = require("../../utils/apiResponse");
const { sellerExistError } = require("./sellerUtils");
const prisma = new PrismaClient();

const createShop = async (req, res) => {
  const sellerId = req.params.sellerId;
  const { shopName } = req.body;
  try {
    if (!sellerId || !shopName)
      return res
        .status(400)
        .json(error("please enter valid shopname", res.statusCode));
    const seller = await isSellerExists(prisma, sellerId);
    const shopExists = await prisma.shop.findMany({
      where: { sellerId: Number(sellerId), shopName: shopName },
    });
    if (shopExists.length > 0)
      return res
        .status(400)
        .json(
          error(`Shop with name ${shopName} already exists`, res.statusCode)
        );

    if (seller) {
      const shop = await prisma.shop.create({
        data: {
          shopName: shopName,
          seller: {
            connect: {
              id: Number(sellerId),
            },
          },
        },
      });
      return res.status(200).json(success("Success", res.statusCode, shop));
    } else {
      sellerExistError(req, res);
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(success("Something went wrong, please try again.", res.statusCode));
  }
};

const addBook = async (req, res) => {
  const sellerId = req.params.sellerId;
  const { shopId, bookName, stockCount, image } = req.body;
  try {
    if (!bookName || !stockCount || !shopId)
      return res
        .status(400)
        .json(error("please enter valid book details", res.statusCode));

    const seller = await isSellerExists(prisma, sellerId);
    const shop = await prisma.shop.findFirst({
      where: { sellerId: Number(sellerId) },
    });
    if (!shop || shop.id !== shopId)
      return res.status(400).json(error("Invalid shop detail", res.statusCode));
    if (seller) {
      const bookDeatil = await prisma.books.create({
        data: {
          bookName: bookName,
          stockCount: stockCount,
          image: image,
          seller: {
            connect: { id: Number(sellerId) },
          },
          shop: {
            connect: { id: Number(shopId) },
          },
        },
      });
      return res
        .status(200)
        .json(success("Success", res.statusCode, bookDeatil));
    } else {
      sellerExistError(req, res);
    }
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json(error("Something went wrong, please try again.", res.statusCode));
  }
};

const getBook = async (req, res) => {
  const sellerId = req.params.sellerId;
  try {
    const seller = await isSellerExists(prisma, sellerId);
    if (seller) {
      let books = await prisma.books.findMany({
        where: { sellerId: Number(sellerId) },
      });
      return res.status(200).json(success("Success", res.statusCode, books));
    } else {
      sellerExistError(req, res);
    }
  } catch (err) {
    res
      .status(500)
      .json(error("Something went wrong, please try again.", res.statusCode));
  }
};

const getOrderDetail = async (req, res) => {
  const sellerId = req.params.sellerId;
  try {
    const seller = await isSellerExists(prisma, sellerId);
    if (seller) {
      let orderDetails = await prisma.order.findMany({
        where: { sellerId: Number(sellerId) },
        include: {
          buyer: {
            select: {
              buyerName: true
            }
          },
          books: {
            select:{
              bookName: true
            }
          }
        }
      });
      return res
        .status(200)
        .json(success("Success", res.statusCode, orderDetails));
    } else {
      sellerExistError(req, res);
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(error("Something went wrong, please try again.", res.statusCode));
  }
};

const getSeller = async (req, res) => {
  const sellerId = req.params.sellerId;
  if (!sellerId)
    return res
      .status(400)
      .json(error(`Could not find seller with id ${sellerId}`, res.statusCode));
  try {
    const seller = await isSellerExists(prisma, sellerId);
    if (seller) {
      const sellerDeatil = await prisma.seller.findFirst({
        where: { id: Number(sellerId) },
        include: {
          shop: {
            select: {
              id: true,
              shopName: true,
            },
          },
        },
      });
      return res
        .status(200)
        .json(success("Success", res.statusCode, sellerDeatil));
    } else {
      sellerExistError(req, res);
    }
  } catch (err) {
    res
      .status(500)
      .json(error("Something went wrong, please try again.", res.statusCode));
  }
};

module.exports = {
  createShop,
  addBook,
  getBook,
  getOrderDetail,
  getSeller,
};
