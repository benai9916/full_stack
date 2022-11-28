const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
// local
const { success, error } = require("../../utils/apiResponse");
const e = require("express");
const prisma = new PrismaClient();

const getAllSellers = async (req, res) => {
  try {
    const sellers = await prisma.seller.findMany({});
    if (sellers) {
      return res.status(200).json(success("Success", res.statusCode, sellers));
    } else {
      return res
        .status(400)
        .json(error("Not able to find any seller", res.statusCode));
    }
  } catch (err) {
    res
      .status(500)
      .json(success("Something went wrong, please try again.", res.statusCode));
  }
};

const getSellersById = async (req, res) => {
  const sellerId = req.params.sellerId;
  try {
    const seller = await prisma.seller.findFirst({
      where: { id: Number(sellerId) },
      select: {
        sellerName: true,
        shop: true,
      },
    });
    if (seller) {
      return res.status(200).json(success("Success", res.statusCode, seller));
    } else {
      return res
        .status(400)
        .json(error("Not able to find any seller", res.statusCode));
    }
  } catch (err) {
    res
      .status(500)
      .json(success("Something went wrong, please try again.", res.statusCode));
  }
};

const getBookBySellerId = async (req, res) => {
  const sellerId = req.params.sellerId;
  try {
    const seller = await prisma.seller.findFirst({
      where: { id: Number(sellerId) },
      select: {
        sellerName: true,
        books: true,
      },
    });
    if (seller) {
      return res.status(200).json(success("Success", res.statusCode, seller));
    } else {
      return res
        .status(400)
        .json(error("Not able to find any seller", res.statusCode));
    }
  } catch (err) {
    res
      .status(500)
      .json(success("Something went wrong, please try again.", res.statusCode));
  }
};

const placeOrder = async (req, res) => {
  const buyerId = req.params.buyerId;
  const { data } = req.body;
  let bookDeatil;
  try {
    for (let o of data) {
      const { id, quantity, sellerId } = o;
      const order = await prisma.order.create({
        data: {
          seller: {
            connect: { id: Number(sellerId) },
          },
          buyer: {
            connect: { id: Number(buyerId) },
          },
          books: {
            connect: { id: Number(id) },
          },
        },
      });
      if (order) {
        bookDeatil = await prisma.books.update({
          where: { id: Number(id) },
          data: {
            stockCount: { decrement: quantity || 1 },
          },
        });
      }
    }
    if (bookDeatil) {
      return res.status(200).json(success("Success", res.statusCode));
    } else {
      return res
        .status(500)
        .json(
          success("Something went wrong, please try again.", res.statusCode)
        );
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(success("Something went wrong, please try again.", res.statusCode));
  }
};

const getOrder = async (req, res) => {
  const buyerId = req.params.buyerId;
  try {
    const order = await prisma.buyer.findMany({
      where: { id: Number(buyerId) },
      select: {
        order: {
          select: {
            id:true,
            books: {
              select: {
                bookName: true,
              },
            },
            seller: {
              select: {
                sellerName: true,
              },
            },
          },
        },
      },
    });
    if (order) {
      return res.status(200).json(success("Success", res.statusCode, order));
    } else {
      return res
        .status(500)
        .json(
          success("Something went wrong, please try again.", res.statusCode)
        );
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(success("Something went wrong, please try again.", res.statusCode));
  }
};

const getBuyer = async (req, res) => {
  const buyerId = req.params.buyerId;
  if (!buyerId)
    return res
      .status(400)
      .json(error(`Could not find user with id ${sellerId}`, res.statusCode));
  try {
    const buyer = await prisma.buyer.findFirst({
      where: { id: Number(buyerId) },
    });
    if (buyer) {
      const buyerDeatil = await prisma.buyer.findFirst({
        where: { id: Number(buyerId) },
        include: {
          order: true,
        },
      });
      return res
        .status(200)
        .json(success("Success", res.statusCode, buyerDeatil));
    } else {
      return res
        .status(200)
        .json(error("User does not exists", res.statusCode));
    }
  } catch (err) {
    res
      .status(500)
      .json(success("Something went wrong, please try again.", res.statusCode));
  }
};

module.exports = {
  getAllSellers,
  getBuyer,
  getSellersById,
  getBookBySellerId,
  placeOrder,
  getOrder,
};
