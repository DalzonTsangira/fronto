const express = require("express");
const cors= require("cors")
const fs=require('fs')
const usersController = require("./controllers/usersController");
const ordersController = require("./controllers/commandController");
const ventesController = require("./controllers/ventesController");
const stockController = require("./controllers/stockController");
const productController = require("./controllers/productController");
const fileUpload=require("express-fileupload");

const app = express();

const pf=__dirname.split("\\").join("/");
console.log(pf);
app.use(express.static(pf+'/uploads/img'))

app.use(fileUpload({
    createParentPath:true
}));


app.use(cors());
app.use(express.json())
app.get("/images", (req,res)=>{
   

  const directoryPath=pf+"/uploads/";
  
  fs.readdir(directoryPath,function(err,files){
      if(err){
        return  res.status(500).send({message:`impossible de lire fichiers`});
      }

      let fileInfos=[];

  files.forEach(file => {
      fileInfos.push({
          name:file,
          url:"http://127.0.0.1:4040/images/"+file
      });
  });

  res.status(200).send(fileInfos);
      
  })

  

})

app.get("/images/:name",(req,res)=>{
  const fileName=req.params.name;
  const directoryPath=pf+"/uploads/";

  res.download(directoryPath+fileName,fileName,(err)=>{
      if(err){
          return  res.status(500).send({message:`impossible de lire fichier ${err}`});
        }
  })

})

app
  .route("/users")
  .get(usersController.getUsers)
  .post(usersController.createUser);

app.route("/users/:id").delete(usersController.deleteUser);
app
  .route("/commands")
  .get(ordersController.getCommand)
  .post(ordersController.createCommand);
app.route("/commands/:id").delete(ordersController.deleteCommand);
app.route("/ventes").get(ventesController.getProductInVente);
app
  .route("/stock")
  .get(stockController.getProductINstock)
  .post(stockController.ajouteProduit);
app.route("/stock/:id").delete(stockController.deleteProductInStock);
app.route("/products")
  .get(productController.getProducts)
  .post(productController.createProduct);
app.route("/products/:id")
  .delete(productController.deleteProduct)
.put(productController.updateProduct)
.get(productController.getProduct);
app.route("/images").post(productController.upload);

app.listen(4040, () => {
  console.log("Serveur en ecoute au 4040 ...");
});
