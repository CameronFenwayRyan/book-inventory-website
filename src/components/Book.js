import React, { useState } from 'react';

const Book = ({ book, onDelete }) => {
  const [rating, setRating] = useState(book.rating || 1);

  const handleRatingChange = (newRating) => {
    console.log(`Star clicked: ${newRating}`);
    setRating(newRating);
    book.rating = newRating;
  };

  const handleDelete = () => {
    console.log(`Deleting book with ISBN: ${book.isbn}`);
    if (typeof onDelete === 'function') {
      onDelete(book.isbn);
    }
  };

  return (
    <div>
      <h3>Title: {book.title}</h3>
      <p>Author: {book.author}</p>
      <img src={book.cover ? book.cover.large : ''} alt={book.title} />
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'star filled' : 'star'}
            onClick={() => handleRatingChange(star)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Book;