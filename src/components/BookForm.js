import React, { useState } from 'react';

const getBookDetails = async (isbn) => {
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
    const data = await response.json();
    const bookData = data[`ISBN:${isbn}`];

    if (!bookData) {
        throw new Error('Book not found');
    }

    return {
        isbn,
        title: bookData.title,
        author: bookData.authors ? bookData.authors[0].name : 'Unknown Author',
        cover: bookData.cover ? { large: bookData.cover.large } : { large: 'default-cover-url.jpg' }
    };
  };

const BookForm = ({ addBook, error }) => {
  const [isbn, setIsbn] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isbn) {
      alert('ISBN cannot be empty.');
      return;
    }
    try {
      const book = await getBookDetails(isbn);
      addBook(book);
      setIsbn('');
    } catch (err) {
      alert('Failed to fetch book data.');
    }
  };

  return (
    <form className="form-entry" onSubmit={handleSubmit}>
      <input 
        className="input-box"
        type="text" 
        value={isbn} 
        onChange={(e) => setIsbn(e.target.value)} 
        placeholder="Enter ISBN"
      />
      <button type="submit" className="input-button">Add Book</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default BookForm;