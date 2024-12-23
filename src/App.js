import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

const App = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const handleDeleteBook = (isbn) => {
    setBooks(books.filter(book => book.isbn !== isbn));
  };

  const handleRatingChange = (isbn, newRating) => {
    setBooks(books.map(book => 
      book.isbn === isbn ? { ...book, rating: newRating } : book
    ));
  };

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    if (storedBooks) {
      setBooks(storedBooks);
    }
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem('books', JSON.stringify(books));
    }
  }, [books]);

  const addBook = (book) => {
    if (books.some(b => b.isbn === book.isbn)) {
      setError('ISBN already exists.');
      return;
    }
    setBooks([{ ...book, rating: 0 }, ...books, ]);
    setError('');
  };

  return (
    <div>
      <BookForm addBook={addBook} error={error} />
      <BookList books={books} onDelete={handleDeleteBook} onRatingChange={handleRatingChange} />
    </div>
  );
};

export default App;
