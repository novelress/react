import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const TvCard = ({ tv, voteAverage}) => {
  const { id, poster_path, name, first_air_date } = tv;
  const cardStyle = {
    width: '90%',
    marginTop: '10px',
    boxShadow: 'none',
    transition: 'color 0.7s',
    borderRadius: 0,
  };

  const cardHoverStyle = {
    '&:hover': {
      '& .HoverTypography': {
        color: 'red',
      },
    },
  };

  let cardMediaStyle = {
    marginBottom:  "7px",
    height : "300"
  }

  const ratingContainerStyle = {
    display: 'flex',
    justifyContent: 'start',
  };

  return (
    <Link to={`/tvPage/${id}`} style={{ textDecoration: "none" }}>
        <Card sx={{ ...cardStyle, ...cardHoverStyle }}>
          <CardActionArea>
            <CardMedia sx={{ ...cardMediaStyle }}
              component="img"
              image={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={name}
            />
            <CardContent sx={{ padding: "0px" }}>
              <Typography className='HoverTypography' variant="h6" sx={{ 
              fontSize: '15px', 
              marginBottom: "5px", 
              width: "200px", 
              textAlign: 'left',
              '@media (max-width: 992px)': {
                fontSize: '12px',
              },
              '@media (max-width: 768px)': {
                fontSize: '10px',
              },
              '@media (max-width: 480px)': {
                fontSize: '9px',
              },
              }} color="text.primary">
                <strong>{name}</strong>
              </Typography>
              <Typography variant="body2" sx={{ 
              fontSize: '15px', 
              textAlign: 'left',
              '@media (max-width: 992px)': {
                fontSize: '12px',
              },
              '@media (max-width: 768px)': {
                fontSize: '10px',
              },
              '@media (max-width: 480px)': {
                fontSize: '9px',
              },
              }} color="text.secondary">
              {first_air_date.slice(0, 4)}
              </Typography>
              <Typography sx={{ ...ratingContainerStyle }}>
              <Rating name="movie-rating" sx={{ 
                textAlign: 'left',
                '.MuiPaper-root': {
                  marginLeft: 0,
                },
                '.MuiSvgIcon-root': {
                  width: '17px',
                  '@media (max-width: 768px)': {
                    width: '14px',
                  },
                  '@media (max-width: 480px)': {
                    width: '12px',
                  },
                },
              }} value={voteAverage / 2} readOnly />
              </Typography>
              <Typography variant="h6" sx={{
              fontSize: '15px', 
              marginBottom: "5px", 
              width: "200px", 
              textAlign: 'left', 
              fontWeight: 700, 
              color: "red",
              '@media (max-width: 992px)': {
                fontSize: '12px',
              },
              '@media (max-width: 768px)': {
                fontSize: '10px',
              },
              '@media (max-width: 480px)': {
                fontSize: '9px',
              },
              }}>
                Trailer
                </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    </Link>
  );
}

export default TvCard;