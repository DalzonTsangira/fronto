const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

exports.ajouteProduit = async (req, res) => {
  const { detail, imageUrl, monnaie, name, price, quantity } = req.body;
  try {
    const stock = await db.stocks.create({
      data: {
        products: {
          create: {
            
            imageUrl,
            monnaie,
            name,
            price,
            detail,
          },
        },
        quantity,
      },
    });
    return res.status(201).send(stock);
  } catch (error) {
    return res.status(500).send({msg: error.message });
  }
};

exports.getProductINstock = async (req, res) => {
  try {
    const stockProducts = await db.stocks.findMany({ include: { products:true } });
    return res.status(200).send(stockProducts);
  } catch (error) {
    return res.status(500).send({ msg:error.message });
  }
};

exports.deleteProductInStock = async (req, res) => {
  const { id } = req.body;
  try {
    await db.stocks.delete({ where: { id } });
    return res.status(204);
  } catch (error) {
    return res.status(500).send({ error });
  }
};
