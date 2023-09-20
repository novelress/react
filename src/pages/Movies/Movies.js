import React from 'react';
import { useParams } from 'react-router-dom';

const MoviePage = () => {
  const { filmId } = useParams();

  return (
      <p>MoviePage {filmId}</p>
  );
}

export default MoviePage;



