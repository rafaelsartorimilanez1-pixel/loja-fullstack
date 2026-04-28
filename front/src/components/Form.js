import React, { useEffect, useRef } from 'react';
import InputArea from './InputsArea';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import axios from 'axios';

// 🔥 URL da API (Railway)
// IMPORTANTE: precisa terminar com /produtos porque seu backend usa isso
const API = 'https://loja-fullstack-production.up.railway.app/produtos';

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: #FFF;
    height: 42px;
`;

const Form = ({ onEdit, setOnEdit, getProducts }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const product = ref.current;

            product.nome.value = onEdit.nome;
            product.preco.value = onEdit.preco;
            product.estoque.value = onEdit.estoque;
            product.fone.value = onEdit.fone;
        }
    }, [onEdit]);

    const handlerSubmit = async (event) => {
        event.preventDefault();

        const product = ref.current;

        if (
            !product.nome.value ||
            !product.preco.value ||
            !product.estoque.value ||
            !product.fone.value
        ) {
            return toast.warn('Preencha todos os campos');
        }

        try {
            // 🔥 UPDATE
            if (onEdit) {
                await axios.put(`${API}/${onEdit.idprodutos}`, {
                    nome: product.nome.value,
                    preco: product.preco.value,
                    estoque: product.estoque.value,
                    fone: product.fone.value
                });

                toast.success('Produto atualizado com sucesso');
            } 
            // 🔥 CREATE
            else {
                await axios.post(API, {
                    nome: product.nome.value,
                    preco: product.preco.value,
                    estoque: product.estoque.value,
                    fone: product.fone.value
                });

                toast.success('Produto cadastrado com sucesso');
            }

            product.nome.value = '';
            product.preco.value = '';
            product.estoque.value = '';
            product.fone.value = '';

            setOnEdit(null);
            getProducts();

        } catch (err) {
            toast.error(err.response?.data || "Erro ao processar requisição");
        }
    };

    return (
        <FormContainer ref={ref} onSubmit={handlerSubmit}>
            <InputArea label='Nome' type='text' name='nome' />
            <InputArea label='Preço' type='text' name='preco' />
            <InputArea label='Estoque' type='text' name='estoque' />
            <InputArea label='Fone' type='text' name='fone' />

            <Button type="submit">Enviar</Button>
        </FormContainer>
    );
};

export default Form;