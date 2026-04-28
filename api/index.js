import express, { urlencoded } from 'express'
import cors from 'cors'

import  produtosRoute from './route/produtos.js'

const app = express();

const port = process.env.PORT || 3000;

app.use(urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

app.use('/produtos', produtosRoute)

app.listen(port, () => {
  console.log("Servidor rodando na porta", port);
});
