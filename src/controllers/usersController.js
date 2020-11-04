const  { PrismaClient } = require("@prisma/client") ;
const db = new PrismaClient();

exports.createUser = async (req, res) => {
 
  const { avatar, full_name, password, phone, role } = req.body;
  try {
    const user = await db.users.create({
      data: {
        avatar:avatar||"default",
        full_name,
        password,
        phone,
        role,
      },
    });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({error});
  }
};
exports.getUsers= async(req,res)=>{
    try {
    const users = await db.users.findMany({include:{orders:true}});
    return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send({error});
    }
}

exports. deleteUser= async (req, res) => {
    const {id}=req.params;
    try {
       await db.users.delete({where:{id}}); 
    return res.status(204);
    } catch (error) {
      return res.status(500).send({error});
    }
}
