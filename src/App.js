import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

const App = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const handleDeleteBook = (isbn) => {
    setBooks(books.filter(book => book.isbn !== isbn));
  };

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    if (storedBooks) {
      setBooks(storedBooks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    if (books.some(b => b.isbn === book.isbn)) {
      setError('ISBN already exists.');
      return;
    }
    setBooks([...books, { ...book, rating: 0 }]);
    setError('');
  };

  return (
    <div>
      <BookForm addBook={addBook} error={error} />
      <BookList books={books} onDelete={handleDeleteBook} />
    </div>
  );
};

export default App;
