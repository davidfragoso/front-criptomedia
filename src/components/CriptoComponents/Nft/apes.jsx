import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MutantApeYachtClubDetails = () => {
  const [collectionData, setCollectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      const collectionSlug = 'mutant-ape-yacht-club';
      const url = `https://api.opensea.io/api/v2/collections/${collectionSlug}`;
      const options = {
        headers: {
          accept: 'application/json',
          'x-api-key': process.env.REACT_APP_OPENSEA_API_KEY
        }
      };

      try {
        const response = await axios.get(url, options);
        console.log(`Data for ${collectionSlug}:`, response.data);
        setCollectionData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching data from OpenSea API:`, error);
        setLoading(false);
      }
    };

    fetchCollectionDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="collection-details-container">
      {collectionData ? (
        <>
          <h2 className="collection-title">{collectionData.name}</h2>
          <div className="collection-info">
            <img src={collectionData.banner_image_url} alt={collectionData.name} className="collection-banner" />
            <img src={collectionData.image_url} alt={collectionData.name} className="collection-image" />
            <p className="collection-description">{collectionData.description}</p>
            <a href={collectionData.opensea_url} target="_blank" rel="noopener noreferrer" className="collection-link">Ver en OpenSea</a>
            <p className="collection-stats">Total Supply: {collectionData.total_supply}</p>
            <p className="collection-stats">Category: {collectionData.category}</p>
            <p className="collection-stats">Owner: {collectionData.owner}</p>
            <p className="collection-stats">Discord: <a href={collectionData.discord_url} target="_blank" rel="noopener noreferrer">Join Discord</a></p>
            <p className="collection-stats">Twitter: <a href={`https://twitter.com/${collectionData.twitter_username}`} target="_blank" rel="noopener noreferrer">@{collectionData.twitter_username}</a></p>
            <p className="collection-stats">Instagram: <a href={`https://instagram.com/${collectionData.instagram_username}`} target="_blank" rel="noopener noreferrer">@{collectionData.instagram_username}</a></p>
            <p className="collection-stats">Project URL: <a href={collectionData.project_url} target="_blank" rel="noopener noreferrer">Visit Project</a></p>
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
      <style jsx>{`
        .collection-details-container {
          padding: 20px;
          background-color: #0d1316;
          color: #ffffff;
          border-radius: 8px;
        }
        .collection-title {
          color: #ffffff;
          font-size: 2em;
          margin-bottom: 20px;
        }
        .collection-info {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .collection-banner {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .collection-image {
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .collection-description {
          text-align: center;
          color: #aaaaaa;
          margin-bottom: 20px;
        }
        .collection-link {
          color: #ff4500;
          text-decoration: none;
          font-weight: bold;
        }
        .collection-link:hover {
          text-decoration: underline;
        }
        .collection-stats {
          text-align: center;
          color: #aaaaaa;
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default MutantApeYachtClubDetails;
