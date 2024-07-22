import React from 'react';

const Card = ({ image, title, description, link, stats }) => {
  return (
    <div className="card-container">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        {stats.map((stat, index) => (
          <p key={index} className="card-stat">{stat}</p>
        ))}
        <a href={link} target="_blank" rel="noopener noreferrer" className="card-link">Ver en OpenSea</a>
      </div>
      <style jsx>{`
        .card-container {
          background-color: #0d1316;
          color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          width: 300px;
          margin: 10px;
          display: flex;
          flex-direction: column;
        }
        .card-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .card-content {
          padding: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .card-title {
          color: #ffffff;
          font-size: 1.5em;
          margin-bottom: 10px;
        }
        .card-description {
          color: #aaaaaa;
          text-align: center;
          margin-bottom: 15px;
        }
        .card-stat {
          color: #aaaaaa;
          margin: 5px 0;
        }
        .card-link {
          color: #ff4500;
          text-decoration: none;
          font-weight: bold;
        }
        .card-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Card;
