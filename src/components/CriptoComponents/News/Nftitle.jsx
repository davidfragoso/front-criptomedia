/** NFTTitle.jsx */
import React from 'react';
import { FaFire } from 'react-icons/fa';
import styled from '@emotion/styled';

const Title = styled.h1`
  display: flex;
  align-items: center;
  color: #ffffff;  /* Ajusta el color según tu esquema de diseño */
  font-size: 2em;
`;

const FireIcon = styled(FaFire)`
padding: 2%;
  color: #ff4500;  /* Color para el ícono, ajusta según necesites */
`;

const NFTTitle = () => {
  return (
    <Title>
      <FireIcon /> Top Noticias NFT
    </Title>
  );
};

export default NFTTitle;
