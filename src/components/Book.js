import React, { useState } from 'react';

const Book = ({ book, onDelete }) => {
  const [rating, setRating] = useState(book.rating || 0);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    book.rating = e.target.value;
  };

  const handleDelete = () => {
    console.log(`Deleting book with ISBN: ${book.isbn}`);
    if (typeof onDelete === 'function') {
      onDelete(book.isbn);
    }
  };

  return (
    <div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <img src={book.cover ? book.cover.large : ''} alt={book.title} />
      <select value={rating} onChange={handleRatingChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Book;