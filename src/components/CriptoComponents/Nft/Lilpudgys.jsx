import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LilPudgys = () => {
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchNFTs = async () => {
      const collectionSlug = 'lilpudgys';
      const limit = 50;
      const options = {
        headers: {
          accept: 'application/json',
          'x-api-key': process.env.REACT_APP_OPENSEA_API_KEY
        }
      };
      const url = `${process.env.REACT_APP_OPENSEA_API_URL}/${collectionSlug}/nfts?limit=${limit}`;

      try {
        const response = await axios.get(url, options);
        console.log(`Data for ${collectionSlug}:`, response.data);
        setNftData(response.data.nfts);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching data from OpenSea API:`, error);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderNFTs = () => {
    return nftData.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage).map(nft => (
      <div key={nft.id} className="nft-card">
        <img src={nft.image_url} alt={nft.name} className="nft-image" />
        <div className="nft-details">
          <h3>{nft.name}</h3>
          <p>{nft.collection.name}</p>
        </div>
      </div>
    ));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="collection-container">
      <h2 className="collection-title">Lil Pudgys</h2>
      <div className="nft-card-container">
        {renderNFTs()}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(nftData.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={page === index ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <style jsx>{`
        .collection-title {
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default LilPudgys;
