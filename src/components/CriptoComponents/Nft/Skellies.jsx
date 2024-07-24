import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; // Importar Slider
import { Button } from '@mui/material'; // Importar Button
import "slick-carousel/slick/slick.css"; // Importar estilos de slick
import "slick-carousel/slick/slick-theme.css";

const TheSkellies = () => {
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionSlug = 'the-skellies'; // Asegúrate de tener el slug correcto

  useEffect(() => {
    const limit = 50;
    const options = {
      headers: {
        accept: 'application/json',
        'x-api-key': process.env.REACT_APP_OPENSEA_API_KEY
      }
    };
    const url = `${process.env.REACT_APP_OPENSEA_API_URL}/${collectionSlug}/nfts?limit=${limit}`;

    const fetchNFTs = async () => {
      try {
        const response = await axios.get(url, options);
        setNftData(response.data.nfts);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching data from OpenSea API:`, error);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 4000
  };

  return (
    <div className="collection-container">
      <h2 className="collection-title">The Skellies</h2>
      <Button
        variant="contained"
        color="secondary"
        href={`https://opensea.io/collection/${collectionSlug}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ backgroundColor: '#FFA500', color: '#ffffff', marginBottom: '20px' }}
      >
        Visita la colección en OpenSea
      </Button>
      <Slider {...settings}>
        {nftData.map(nft => (
          <div key={nft.id} className="nft-card">
            <img src={nft.image_url} alt={nft.name} className="nft-image" />
            <div className="nft-details">
              <h3>{nft.name}</h3>
              <p>{nft.collection.name}</p>
            </div>
          </div>
        ))}
      </Slider>
      <style jsx>{`
        .collection-title {
          color: #ed6c02;
          text-align: center; // Centra el título si es necesario
        }
      `}</style>
    </div>
  );
};

export default TheSkellies;
