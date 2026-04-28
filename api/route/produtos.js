import express from 'express'

import { getProdutos, addProdutos, updateProdutos, deleteProdutos } from '../controllers/produto.js'; //criar depois

const router = express.Router()

router.get('/', getProdutos);

router.post('/', addProdutos);

router.put('/:idprodutos', updateProdutos);

router.delete('/:idprodutos', deleteProdutos);

export default router