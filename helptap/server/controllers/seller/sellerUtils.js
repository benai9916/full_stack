const { success, error } = require("../../utils/apiResponse");

const isSellerExists = async (prisma, sellerId) => {
  return await prisma.seller.findFirst({
    where: { id: Number(sellerId) },
    include: {
      shop: true,
    },
  });
};

const sellerExistError = (req, res) => {
  return res.status(400).json(error("Seller does not exists", res.statusCode));
};

module.exports = {
  isSellerExists,
  sellerExistError,
};
