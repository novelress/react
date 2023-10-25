import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { CardActionArea, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieSearchCard = ({ movie, genres, voteAverage }) => {
  const { id, poster_path, title, genre_ids, release_date } = movie;
  const cardStyle = {
    width: "100%",
    margin: '10px',
    boxShadow: 'none',
    transition: 'color 0.7s',
    borderRadius: 0,
    display: "flex",
    justifyContent: "start",
    height: "130px",
  };

  const cardHoverStyle = {
    '&:hover': {
      '& .HoverTypography': {
        color: 'red',
      },
    },
  };


  const ratingContainerStyle = {
    display: 'flex',
    justifyContent: 'start',
  };

  return (
    <Link to={`/moviePage/${id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ ...cardStyle, ...cardHoverStyle, }}>
          <CardActionArea sx={{ display: "flex", }}>
          <Box sx={{ display: "flex", width: "40%" }}>
            <CardMedia
              sx={{
                marginRight: '0px',
                height: "100%",
                maxWidth: "100px",
                backgroundSize: 'contain',
                transform: "scale(0.8)",
                display: "flex",
                alignItems: "center"
              }}
                component="img"
                image={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={`${title}`}
            />
          </Box>
          <CardContent sx={{ padding: "0px", width: "60%" }}>
            <Typography className='HoverTypography' variant="h6" sx={{ fontSize: '10px', marginBottom: "5px", width: "100%", textAlign: 'left', }} color="text.primary">
              <strong>{title}</strong>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '10px', textAlign: 'left', }} color="text.secondary">
            {release_date.slice(0, 4)}, {genres[genre_ids[0]]}
            </Typography>
            <Typography sx={{ ...ratingContainerStyle }}>
              <Rating name="movie-rating" sx={{ textAlign: 'left', }} value={voteAverage / 2} readOnly />
              <style>
                {`
                  .MuiPaper-root {
                    margin-left: 0;
                  }

                  .MuiSvgIcon-root { 
                    width: 14px;
                  }
                `}
              </style>
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '10px', marginBottom: "5px", width: "80%", textAlign: 'left', fontWeight: 700, color: "red" }}>
              Trailer
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default MovieSearchCard;