// Importa a conexão com o banco de dados
import { db } from '../db.js';

// Função responsável por buscar todos os produtos do banco
export const getProdutos = (_, res) => {
    // Query SQL para selecionar todos os registros da tabela produtos
    const q = 'SELECT * FROM produtos';

    // Executa a query no banco
    db.query(q, (err, data) => {

        // Se der erro, retorna o erro em formato JSON
        if (err) {
            return res.json(err);
        }

        // Se der certo, retorna os dados com status 200 (OK)
        return res.status(200).json(data);
    });
}

// Função para adicionar um novo produto no banco
export const addProdutos = (request, response) => {

    // Query SQL para inserir um novo produto
    const q = "INSERT INTO produtos (`nome`, `preco`, `estoque`, `fone`) VALUES (?)";

    // Valores que vêm do corpo da requisição (frontend ou Postman)
    const values = [
        request.body.nome,
        request.body.preco,
        request.body.estoque,
        request.body.fone
    ];

    // Executa a inserção no banco passando os valores
    db.query(q, [values], (error) => {

        // Se houver erro, retorna ele
        if (error) return response.json(error);

        // Se tudo ocorrer bem, retorna mensagem de sucesso
        return response.status(200).json("Produto cadastrado com sucesso");
    });
}

// Função para atualizar um produto existente
export const updateProdutos = (request, response) => {

    // Query SQL para atualizar os dados de um produto pelo ID
    const q = "UPDATE produtos SET `nome` = ?, `preco` = ?, `estoque` = ?, `fone` = ? WHERE `idprodutos` = ?";

    // Novos valores enviados pelo usuário
    const values = [
        request.body.nome,
        request.body.preco,
        request.body.estoque,
        request.body.fone
    ];

    // Executa a atualização no banco passando os valores e o ID do produto
    db.query(q, [...values, request.params.idprodutos], (error) => {

        // Se der erro, retorna ele
        if (error) return response.json(error);

        // Mensagem de sucesso
        return response.status(200).json("Produto atualizado com sucesso");
    });
}

// Função para deletar um produto pelo ID
export const deleteProdutos = (request, response) => {

    // Query SQL para deletar um produto específico
    const q = "DELETE FROM produtos WHERE `idprodutos` = ?";

    // Executa a deleção passando o ID vindo da URL
    db.query(q, [request.params.idprodutos], (error) => {

        // Se der erro, retorna ele
        if (error) return response.json(error);

        // Mensagem de sucesso
        return response.status(200).json("Produto deletado com sucesso");
    });
};