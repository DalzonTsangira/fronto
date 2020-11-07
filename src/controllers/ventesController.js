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

exports.createVente=async (req,res)=>{
  const {monnaie,productId,phone,qty,name}=req.body
  try {
      const product=await db.ventes.create({
        data:{
          monnaie,
          products:{
            connect:{
              id:productId
            }
          },
          total:qty ,
          users:{
            create:{
              full_name:name,
              phone
            }
          }
        }
      });
      return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({error});
  }
}