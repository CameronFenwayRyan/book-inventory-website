import React, { useState } from "react";

const SearchCard = ({ book, groups, onAddToGroup, onClick }) => {
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleAddToGroup = () => {
    if (selectedGroup) {
      onAddToGroup(book, selectedGroup);
      setSelectedGroup(""); // Reset the selected group
    }
  };

  const defaultCover = "/default-cover.jpg"; // Replace with the actual path to your default cover image

  return (
    <div className="search-card" onClick={onClick}>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">Author: {book.author}</p>
      <img
        className="book-cover"
        src={book.cover ? book.cover.large : defaultCover}
        alt={book.title}
      />
      <select
        className="search-results"
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
        onClick={(e) => e.stopPropagation()} // Prevent card click event
      >
        <option value="">Select Group</option>
        {groups.map((group) => (
          <option key={group.name} value={group.name}>
            {group.name}
          </option>
        ))}
      </select>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click event
          handleAddToGroup();
        }}
      >
        Add to Group
      </button>
    </div>
  );
};

export default SearchCard;
