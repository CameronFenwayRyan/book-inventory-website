import React from 'react';
import Book from './Book';

const BookList = ({ books, onDelete, onRatingChange }) => {
  return (
    <div className="book-list">
      {books.map(book => (
        <Book key={book.id} book={book} onDelete={onDelete} onRatingChange={onRatingChange} />
      ))}
    </div>
  );
};

export default BookList;