const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

exports.createProduct = async (req, res) => {
 
  const { detail, imageUrl, monnaie, name, price } = req.body;
  try {
    const product = await db.products.create({
      data: {
        detail,
        imageUrl,
        monnaie,
        name,
        price,
      },
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.getProduct= async(req,res)=>{
    const {id} =req.params;
    try {
        const product= await db.products.findOne({where:{id:id}});
        return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json(error.message);
    }
}

exports.deleteProduct= async(req,res)=>{
  const {id} =req.params;
  try {
       await db.products.delete({where:{id:Number(id)}});
      return res.status(204);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
exports.updateProduct=async(req,res)=>{
    const {id} =req.params;
    try {
        const product= await db.products.update({data:req.body,where:{id:id}});
        return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json(error.message);
    }
}

exports.getProducts=async(req,res)=>{

    try {
        const products = await db.products.findMany();
        return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json(error.message);
    }
}


exports.upload = async(req,res)=>{
  try {
     
      if(!req.files){
          return res.status(500).send({message:"no file uploaded"});
      }else{
          let avatar =req.files.avatar;
          avatar.mv('./uploads/'+avatar.name);

          res.status(500).send({message:"no file uploaded",data:{
              name:avatar.name,
              mimetype:avatar.mimetype,
              size:avatar.size
          }})
      }
  } catch (error) {
      return res.status(500).send({message:`${req.file} ... ${error}`});
  }
}



