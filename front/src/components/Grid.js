import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';

// =======================
// ESTILIZAÇÃO DA TABELA
// =======================

const Thead = styled.thead``;
const Tbody = styled.tbody``;

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box; /* corrigido (antes estava 0px 0px 5px #ccc errado) */
    box-shadow: 0px 0px 5px #ccc; /* correção do CSS */
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

const Tr = styled.tr``;

const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;
`;

const Td = styled.td`
    padding-top: 15px;
`;

// =======================
// URL BASE DA API
// =======================
// Vem do .env do Vercel (ex: https://sua-api.up.railway.app)
const API = process.env.REACT_APP_API_URL;

// =======================
// COMPONENTE GRID
// =======================
const Grid = ({ products, setProducts, setOnEdit }) => {

    // =======================
    // DELETE DE PRODUTO
    // =======================
    const handlerDelete = async (id) => {
        try {
            // Faz requisição DELETE para a API
            await axios.delete(`${API}/produtos/${id}`);

            // Atualiza o estado removendo o item deletado
            const newArray = products.filter(
                (product) => product.idprodutos !== id
            );

            setProducts(newArray);

            // Mensagem de sucesso
            toast.success("Produto deletado com sucesso");

        } catch (err) {
            // Tratamento de erro
            toast.error(err.response?.data || "Erro ao deletar");
        }
    };

    // =======================
    // RENDERIZAÇÃO DA TABELA
    // =======================
    return (
        <Table>
            {/* CABEÇALHO DA TABELA */}
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Preço</Th>
                    <Th>Estoque</Th>
                    <Th>Ações</Th>
                </Tr>
            </Thead>

            {/* CORPO DA TABELA */}
            <Tbody>
                {/* Loop dos produtos recebidos via props */}
                {products.map((item, index) => (
                    <Tr key={index}>

                        {/* Nome do produto */}
                        <Td width="30%">{item.nome}</Td>

                        {/* Preço do produto */}
                        <Td width="30%">{item.preco}</Td>

                        {/* Estoque */}
                        <Td width="20%">{item.estoque}</Td>

                        {/* Botão de editar */}
                        <Td>
                            <FaEdit
                                onClick={() => setOnEdit(item)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Td>

                        {/* Botão de deletar */}
                        <Td>
                            <FaTrash
                                onClick={() => handlerDelete(item.idprodutos)}
                                style={{ cursor: 'pointer', color: 'red' }}
                            />
                        </Td>

                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;