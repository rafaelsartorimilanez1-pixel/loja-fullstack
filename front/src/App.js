import GlobalStyle from "./global";
import styled from 'styled-components';
import Form from './components/Form'
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h1``;

// 🔥 URL da sua API no Railway (produção)
const API_URL = 'https://loja-fullstack-production.up.railway.app';

function App() {

  const [products, setProducts] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  // 🔥 Buscar produtos da API
  const getProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/`);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <GlobalStyle />

      <Container>
        <Title>Cadastro de Produtos</Title>

        <Form
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getProducts={getProducts}
        />

        <Grid
          products={products}
          setProducts={setProducts}
          setOnEdit={setOnEdit}
        />
      </Container>

      <ToastContainer
        autoClose={3000}
        position="bottom-left"
        theme="colored"
        pauseOnHover
      />
    </>
  );
}

export default App;