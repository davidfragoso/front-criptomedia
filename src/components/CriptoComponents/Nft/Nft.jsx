import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';

const NftCollectionsView = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNftCollections = async () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678'; // Reemplaza con la dirección deseada
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImExODZjODE0LWEzNzAtNDExYS1hMjUyLTQ4OGEwNjdiZWE5ZCIsIm9yZ0lkIjoiNDAwMzczIiwidXNlcklkIjoiNDExMzk1IiwidHlwZUlkIjoiNGI4YmU3ZDYtYjRjMC00ZTVhLTg1OTgtY2M2MDk5Zjc2YzU3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjExNzg5MTQsImV4cCI6NDg3NjkzODkxNH0.D8YG5Awyznsln6HTXW_hp_35mrO0C-XDRDqQco6SSkg';

    try {
      const response = await axios.get(`https://deep-index.moralis.io/api/v2.2/${address}/nft/collections`, {
        params: { chain: 'eth' },
        headers: {
          'X-API-Key': apiKey
        }
      });
      setCollections(response.data.result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching NFT collections:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNftCollections();
  }, []);

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={4}>
        {collections.map((collection) => (
          <Grid item xs={12} sm={6} md={4} key={collection.token_address}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={collection.collection_logo || 'https://via.placeholder.com/140'}
                alt={collection.name || 'NFT Collection Image'}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {collection.name || 'Unnamed Collection'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {collection.description || 'No description available'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NftCollectionsView;
