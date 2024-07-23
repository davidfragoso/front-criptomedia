import React, { Suspense } from 'react';
import { FaFire } from 'react-icons/fa';
import { CircularProgress } from '@mui/material';

// Importaciones dinámicas con delay simulado
const ProofMoonbirds = React.lazy(() => new Promise(resolve => {
  setTimeout(() => resolve(import('./moonbirds')), 2000);
}));
const LilPudgys = React.lazy(() => new Promise(resolve => {
  setTimeout(() => resolve(import('./Lilpudgys')), 2000);
}));
const TheSkellies = React.lazy(() => new Promise(resolve => {
  setTimeout(() => resolve(import('./Skellies')), 2000);
}));


const NftCollections = () => {
  return (
    <div className="popular-collections-container">
      <h1 className="title">
        <FaFire className="fire-icon" /> Colecciones Populares
      </h1>
      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress style={{ color: '#FFA500' }} /> {/* Spinner de carga naranja */}
        </div>
      }>
        <div className="nft-section-container"> {/* Contenedor adicional para las tarjetas */}
          <ProofMoonbirds/>
          <LilPudgys/>
          <TheSkellies/>
        </div>
      </Suspense>

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
        .nft-section-container {
          background-color: #0d1316;
          border-radius: 8px;
          margin-top: 50px;
        }
        .nft-card-container {

        }
        .nft-card {
          background-color: #1d252d;
          color: #ffffff;
          padding: 10px;
          border-radius: 8px;
          width: 100px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .nft-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .nft-details {
          margin-top: 5px;
        }
        .nft-details h3 {
          margin: 0;
          font-size: 1em;
        }
        .nft-details p {
          margin: 2px 0 0;
          color: #aaaaaa;
          font-size: 0.8em;
        }
      `}</style>
    </div>
  );
};

export default NftCollections;
