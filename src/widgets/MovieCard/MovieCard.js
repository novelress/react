import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { CardActionArea } from '@mui/material';

const MovieCard = ({ movie, genres, voteAverage }) => {
  const { poster_path, title, genre_ids, release_date, vote_average } = movie;
  const cardStyle = {
    width: 150,
    margin: '10px',
    boxShadow: 'none',
    transition: 'color 0.7s',
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
    <Card sx={{ ...cardStyle, ...cardHoverStyle }}>
      <CardActionArea>
        <CardMedia sx={{ marginBottom: "10px" }}
          component="img"
          height="200"
          image={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <CardContent sx={{ padding: "0px" }}>
          <Typography className='HoverTypography' variant="h6" sx={{ fontSize: '10px', marginBottom: "5px", width: "150px", textAlign: 'left', }} color="text.primary">
            <strong>{title}</strong>
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '10px', textAlign: 'left', }} color="text.secondary">
          {release_date.slice(0, 4)}, {genres[genre_ids[0]]}
          </Typography>
          <Typography sx={{ ...ratingContainerStyle }}>
            <Rating name="movie-rating" sx={{ textAlign: 'left', }} value={voteAverage / 2} readOnly />
            <style>
              {`
                .MuiSvgIcon-root {
                  width: 17px;
                }
              `}
            </style>
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '10px', marginBottom: "5px", width: "150px", textAlign: 'left', fontWeight: 700, color: "Gray" }}>
            FOR FREE
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;