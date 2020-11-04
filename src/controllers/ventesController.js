const  { PrismaClient } = require("@prisma/client") ;
const db = new PrismaClient();

exports.getProductInVente=async (req,res)=>{
    try {
        const products=await db.ventes.findMany({include:{products:true,users:true}});
        return res.status(200).send(products);
    } catch (error) {
      return res.status(500).send({error});
    }
}