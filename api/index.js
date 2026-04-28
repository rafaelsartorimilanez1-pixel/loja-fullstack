import express, { urlencoded } from 'express'
import cors from 'cors'

import  produtosRoute from './route/produtos.js'

const app = express();
const port =process.env.DATABASE_URL || process.env.PORT   ;

app.use(urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

app.use('/', produtosRoute)

app.listen(port)