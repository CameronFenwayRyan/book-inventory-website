import React, { useState } from 'react';
import SearchCard from './SearchCard';

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

const BookForm = ({ addBook, error, groups }) => {
  const [isbn, setIsbn] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isbn) {
      alert('ISBN cannot be empty.');
      return;
    }
    try {
      const book = await getBookDetails(isbn);
      setSearchResults([book]);
      setIsbn('');
    } catch (err) {
      alert('Failed to fetch book data.');
    }
  };

  const handleAddToGroup = (book, groupName) => {
    addBook(book, groupName);
    setSearchResults([]); // Clear search results after adding to group
  };

  return (
    <div>
      <form className="form-entry" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="input-box"
          value={isbn} 
          onChange={(e) => setIsbn(e.target.value)} 
          placeholder="Enter ISBN"
        />
        <button type="submit" className="input-button">Search</button>
        {error && <p>{error}</p>}
      </form>
      <div className="search-results">
        {searchResults.map(book => (
          <SearchCard key={book.isbn} book={book} groups={groups} onAddToGroup={handleAddToGroup} />
        ))}
      </div>
    </div>
  );
};

export default BookForm;