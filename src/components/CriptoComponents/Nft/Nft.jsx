import React from 'react';
import { FaFire } from 'react-icons/fa';
import ProofMoonbirds from './moonbirds';
import LilPudgys from './Lilpudgys';
import MutantApeYachtClubDetails from './apes';
import PersonaDetails from './persona';

const NftCollections = () => {
  return (
    <div className="popular-collections-container">
      <h1 className="title">
        <FaFire className="fire-icon" /> Colecciones Populares
      </h1>
      <ProofMoonbirds/>
      <LilPudgys/>
      <MutantApeYachtClubDetails/>
      <PersonaDetails/>
      <style jsx>{`
        .popular-collections-container {
          padding: 20px;
        }
        .title {
          display: flex;
          align-items: center;
          font-size: 2em;
          color: #ffffff;
        }
        .fire-icon {
          margin-right: 10px;
          color: #ff4500;
        }
        .collection-container {
          margin-top: 30px;
        }
        .nft-card-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          gap: 2px;
        }
        .nft-card {
          background-color: #1d252d;
          color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          width: 200px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .nft-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .nft-details {
          margin-top: 10px;
        }
        .nft-details h3 {
          margin: 0;
          font-size: 1.2em;
        }
        .nft-details p {
          margin: 5px 0 0;
          color: #aaaaaa;
        }
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .pagination button {
          background-color: #1c242d;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          margin: 0 5px;
          cursor: pointer;
          border-radius: 5px;
        }
        .pagination button.active {
          background-color: #ff4500;
        }
        .pagination button:hover {
          background-color: #ff4500;
        }
      `}</style>
    </div>
  );
};

export default NftCollections;
