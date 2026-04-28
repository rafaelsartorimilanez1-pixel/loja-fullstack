import express from "express";
import {
  getProdutos,
  addProdutos,
  updateProdutos,
  deleteProdutos
} from "../controllers/produto.js";

const router = express.Router();

router.get("/produtos", getProdutos);
router.post("/produtos", addProdutos);
router.put("/produtos/:idprodutos", updateProdutos);
router.delete("/produtos/:idprodutos", deleteProdutos);

export default router;