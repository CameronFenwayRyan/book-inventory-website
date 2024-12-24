import React, { useState } from "react";
import SearchCard from "./SearchCard";
import { getBookDetails } from "../services/openLibraryAPI";
import "../index.css"; // Import the CSS file

const BookForm = ({ addBook, error, groups, onBookClick }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const resultsPerPage = 15; // 5 columns * 3 rows

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) {
      alert("Please enter a search query.");
      return;
    }
    setLoading(true);
    try {
      const books = await getBookDetails(query);
      setSearchResults(books);
      setQuery("");
      setCurrentPage(1); // Reset to first page on new search
    } catch (err) {
      alert("Failed to fetch book data.");
    } finally {
      setLoading(false);
    }
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
      {loading ? (
        <div className="loading-icon">Loading...</div>
      ) : (
        <>
          <div className="search-results">
            {currentResults.map((book, index) => (
              <SearchCard
                key={`${book.isbn}-${index}`}
                book={book}
                groups={groups}
                onAddToGroup={addBook}
                onClick={() => onBookClick(book)}
              />
            ))}
          </div>
          <div className="pagination">{renderPageNumbers()}</div>
        </>
      )}
    </div>
  );
};

export default BookForm;
