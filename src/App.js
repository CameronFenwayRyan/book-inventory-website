import React, { useState, useEffect } from "react";
import Tabs from "./components/Tabs";
import BookForm from "./components/BookForm";
import BookGroup from "./components/BookGroup";
import { SearchProvider } from "./SearchContext";

const App = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [selectedBook, setSelectedBook] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Load groups from local storage or API
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(storedGroups);
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setActiveTab("bookDetail");
  };

  const handleDeleteBook = (bookId, groupName) => {
    const updatedGroups = groups.map((group) =>
      group.name === groupName
        ? { ...group, books: group.books.filter((book) => book.id !== bookId) }
        : group
    );
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  const addBookToGroup = (book, groupName) => {
    const updatedGroups = groups.map((group) =>
      group.name === groupName
        ? { ...group, books: [...group.books, book] }
        : group
    );
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  return (
    <SearchProvider>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
        <div label="Search" tabKey="search">
          <BookForm
            onBookClick={handleBookClick}
            addBook={addBookToGroup}
            groups={groups}
          />
        </div>
        <div label="Groups" tabKey="groups">
          <BookGroup
            onBookClick={handleBookClick}
            groups={groups}
            onDelete={handleDeleteBook}
          />
        </div>
      </Tabs>
    </SearchProvider>
  );
};

export default App;
