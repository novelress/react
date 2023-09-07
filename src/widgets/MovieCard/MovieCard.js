import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

 const MovieCard = ({ movie, genres }) => {
  const { poster_path, title, genre_ids, release_date, } = movie;
  return (
    <Card sx={{ maxWidth: 150 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {title} {release_date.slice(0, 4)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Жанр: {genre_ids.map((id) => genres[id]).join(", ")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;