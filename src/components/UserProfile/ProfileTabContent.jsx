import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const baseStyles = {
  container: {
    backgroundColor: 'rgba(39, 51, 62, 0.5)',
    borderRadius: '10px',
    color: '#ffffff',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '600px',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '10px 10px 0 10px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  username: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  time: {
    fontSize: '0.8rem',
    color: '#888888',
  },
  content: {
    marginBottom: '10px',
  },
  text: {
    fontSize: '1.2rem',
    color: '#d1d1d1',
    padding: '0 10px 0 10px',
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
  },
  smallImagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: '1 1 40%',
  },
  smallImage: {
    width: '100%',
    height: 'calc(50% - 5px)',
    borderRadius: '10px',
    objectFit: 'cover',
    maxWidth: '100%',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '10px',
    borderTop: '1px solid #27333E',
    padding: '10px',
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff',
    cursor: 'pointer',
  },
  iconText: {
    marginLeft: '5px',
    fontSize: '0.8rem',
  },
};

const ProfileContent = () => {
  const posts = [
    {
      username: 'Agapito',
      time: 'Hace 3 horas',
      content: '¡No te pierdas la historia de "CryptoGenius", el programador chino que se convirtió en multimillonario gracias a las criptomonedas! Con una modesta inversión inicial y una visión audaz, "CryptoGenius" ha pasado de ser un desarrollador desconocido a una figura clave en el mundo de las finanzas digitales. Descubre cómo transformó 10,000 yuanes en una impresionante fortuna, navegando por los altibajos del mercado de criptomonedas para finalmente ver su cartera valorada en más de 1,000 millones de dólares. Su historia no solo es inspiradora, sino que también destaca el potencial transformador de las criptomonedas en el panorama financiero global. ¿Qué lecciones podemos aprender de su éxito? ¡Déjanos tus comentarios y comparte esta historia con tus amigos para inspirar a más personas!',
      images: ['https://www.criptonoticias.com/wp-content/uploads/2023/02/kiyosaki-bitcoin-precio-1140x570.jpg'],
      initialLikes: 150,
      comments: 20,
      shares: 5,
    },
    {
      username: 'Agapito',
      time: 'Hace 7 horas',
      content: '¡Atención, amantes de las criptomonedas! Elon Musk, el visionario CEO de SpaceX y Tesla, ha vuelto a hacer olas en el mundo digital con sus comentarios sobre Dogecoin. En una reciente entrevista, Musk elogió la comunidad de Dogecoin por su entusiasmo y creatividad, destacando el potencial de esta moneda digital como una fuerza disruptiva en el mercado. "Dogecoin tiene el potencial de ser la moneda del pueblo", dijo Musk. "Es rápido, barato y, sobre todo, divertido. Me encanta la energía y el espíritu de la comunidad Doge". Desde su tweet inicial en 2021, Musk ha sido un defensor vocal de Dogecoin, lo que ha contribuido a impulsar su popularidad y valorización en el mercado. ¿Qué opinas sobre el futuro de Dogecoin? ¿Crees que esta criptomoneda podría cambiar el juego en las finanzas digitales? Únete a la conversación y comparte tus pensamientos sobre la visión de Musk y el potencial de Dogecoin con tus amigos. ¡Juntos podemos explorar el futuro de las criptomonedas!',
      images: ['https://phantom-expansion.unidadeditorial.es/7d27966af2f92cea1c445c3bb59646ad/resize/414/f/jpg/assets/multimedia/imagenes/2023/04/04/16806035737213.jpg'],
      initialLikes: 275,
      comments: 36,
      shares: 7,
    },
    {
      username: 'Agapito',
      time: 'Hace 15 horas',
      content: '¡Última hora! Se reportan tensiones crecientes entre naciones debido al control de las criptomonedas. En un giro sorprendente, se ha desatado una disputa internacional por el dominio de las monedas digitales más populares del mercado. Las tensiones comenzaron después de que una nación estratégicamente importante anunciara su intención de lanzar su propia criptomoneda respaldada por recursos naturales, desafiando el orden económico establecido. Esto ha provocado una reacción en cadena con otras naciones buscando proteger sus intereses y asegurar su participación en el futuro de las finanzas digitales. Los expertos advierten sobre las implicaciones globales de esta nueva "guerra de criptomonedas", que podría redefinir las relaciones económicas y geopolíticas en los próximos años. ¿Cómo crees que este conflicto podría influir en el mercado global y en el futuro de las criptomonedas?',
      images: ['https://nmidigital.com/wp-content/uploads/2023/10/Criptomonedas-guerra.jpg'],
      initialLikes: 150,
      comments: 20,
      shares: 5,
    },
  ];

  return (
    <Box display="flex" justifyContent="center" alignItems="center" >
      <Grid container spacing={3} justifyContent="center">
        {posts.map((post, index) => (
          <Grid item xs={12} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={baseStyles.container}>
              <div style={baseStyles.header}>
                <img
                  src="../images/yop.jfif"
                  alt="User avatar"
                  style={baseStyles.avatar}
                />
                <div style={baseStyles.userInfo}>
                  <span style={baseStyles.username}>{post.username}</span>
                  <span style={baseStyles.time}>{post.time}</span>
                </div>
              </div>
              <div style={baseStyles.content}>
                <p style={baseStyles.text}>{post.content}</p>
              </div>
              <div style={baseStyles.imagesContainer}>
                <img
                  src={post.images[0]}
                  alt="Wallpaper"
                  style={{ ...baseStyles.smallImage, width: '100%', borderRadius: '10px' }}
                />
              </div>
              <div style={baseStyles.footer}>
                <div style={baseStyles.iconButton}>
                  <FavoriteIcon style={{ color: post.liked ? 'red' : 'white' }} />
                  <span style={baseStyles.iconText}>{post.initialLikes}</span>
                </div>
                <div style={baseStyles.iconButton}>
                  <ChatBubbleIcon />
                  <span style={baseStyles.iconText}>{post.comments}</span>
                </div>
                <div style={baseStyles.iconButton}>
                  <ShareIcon />
                  <span style={baseStyles.iconText}>Compartir</span>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfileContent;
