import React from 'react';
import { useParams } from 'react-router-dom';

const MoviePage = () => {
    const { id, title } = useParams();
  
    return (
      <div>
        <p>MoviePage</p>
        <p>ID: {id}</p>
        <p>Title: {title}</p>
      </div>
    );
  }

export default MoviePage;