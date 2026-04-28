import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {FaTrash, FaEdit} from "react-icons/fa";
import { toast } from 'react-toastify';

const Thead = styled.thead``
const Tbody = styled.tbody``

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-widht: 800px;
    margin: 20px auto;
    word-break: break-all;
`

const Tr = styled.tr``

const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom:5px; 
`
const Td = styled.td`
    padding-top: 15px;
`

const Grid = ({ products, setProducts, setOnEdit }) => {

    const handlerDelete = async (id) => {
        await axios.delete('http://localhost:4000/' + id)
        .then( ({data}) => {
            const newArray = products.filter( (product) => product.id !== id )

            setProducts(newArray)
            toast.success(data)
        } )
        .catch((err) => toast.error(err.response?.data || "Erro"))
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Preço</Th>
                    <Th>Estoque</Th>
                </Tr>
            </Thead>

            <Tbody>
                { products.map((item, index) => (
                    <Tr key={index}>
                        <Td width="30%"> {item.nome}</Td>
                        <Td width="30%"> {item.preco}</Td>
                        <Td width="20%"> {item.estoque}</Td>

                        <Td>
                        <FaEdit onClick={() => setOnEdit(item)} />
                        </Td>

                        <Td>
                        <FaTrash onClick={ (e) => handlerDelete(item.idprodutos) }/>
                        </Td>
                    </Tr>
                ))}

            </Tbody>
        </Table>
    );
};

export default Grid;