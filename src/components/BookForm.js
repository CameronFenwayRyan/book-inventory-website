import React, { useState } from "react";
import SearchCard from "./SearchCard";
import axios from "axios";

export const getBookDetails = async (query) => {
  const response = await axios.get(
    `https://openlibrary.org/search.json?q=${query}`
  );
  const data = response.data;

  if (!data || data.docs.length === 0) {
    throw new Error("Book not found");
  }

  return data.docs.map((bookData) => ({
    isbn: bookData.isbn ? bookData.isbn[0] : "Unknown ISBN",
    title: bookData.title,
    author: bookData.author_name ? bookData.author_name[0] : "Unknown Author",
    cover: bookData.cover_i
      ? {
          large: `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`,
        }
      : { large: "default-cover-url.jpg" },
  }));
};

const BookForm = ({ addBook, error, groups }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 15;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) {
      alert("Please enter a search query.");
      return;
    }
    try {
      const books = await getBookDetails(query);
      setSearchResults(books);
      setQuery("");
      setCurrentPage(1); // Reset to first page on new search
    } catch (err) {
      alert("Failed to fetch book data.");
    }
  };

  const handleAddToGroup = (book, groupName) => {
    addBook(book, groupName);
    setSearchResults([]); // Clear search results after adding to group
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(searchResults.length / resultsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <button key={number} onClick={() => handlePageChange(number)}>
        {number}
      </button>
    ));
  };

  return (
    <div>
      <form className="form-entry" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-box"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter ISBN, Title, or Author"
        />
        <button type="submit" className="input-button">
          Search
        </button>
        {error && <p>{error}</p>}
      </form>
      <div className="search-results">
        {currentResults.map((book) => (
          <SearchCard
            key={book.isbn}
            book={book}
            groups={groups}
            onAddToGroup={handleAddToGroup}
          />
        ))}
      </div>
      <div className="pagination">{renderPageNumbers()}</div>
    </div>
  );
};

export default BookForm;
