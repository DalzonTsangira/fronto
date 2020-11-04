const  { PrismaClient } = require("@prisma/client") ;
const db = new PrismaClient();

exports.createCommand = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const order = db.orders.create({
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
        status: "send",
        order_items: {
          create: {
            products: {
              connect: {
                id: productId,
              },
            },
            quantity,
          },
        },
      },
    });

    return res.status(201).send(order);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.getCommand= async(req,res)=>{
    try {
        const commands=await db.orders.findMany({include:{order_items:true,users:true}});
        return res.status(200).send(commands);
    } catch (error) {
      return res.status(500).send({ error });
    }
}

exports.deleteCommand= async(req,res)=>{
    try {
        const{id}=req.params;
        await db.orders.delete({where:{id}})
        return res.status(204);
    } catch (error) {
      return res.status(500).send({error});
    }
}
