import React, { useState } from "react";

const BookGroup = ({ groups, onBookClick, onDelete }) => {
  const [activeGroup, setActiveGroup] = useState(groups[0].name);
  const [selectedBook, setSelectedBook] = useState(null);
  const [comment, setComment] = useState("");

  const handleGroupChange = (groupName) => {
    setActiveGroup(groupName);
    setSelectedBook(null); // Reset selected book when changing groups
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setComment(book.comment || "");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSaveComment = () => {
    // Save the comment to the book object or send it to the server
    if (selectedBook) {
      selectedBook.comment = comment;
      setSelectedBook({ ...selectedBook });
    }
  };

  const activeGroupBooks =
    groups.find((group) => group.name === activeGroup)?.books || [];

  return (
    <div className="book-group-container">
      <div className="group-menu">
        {groups.map((group) => (
          <button
            key={group.name}
            className={activeGroup === group.name ? "active" : ""}
            onClick={() => handleGroupChange(group.name)}
          >
            {group.name}
          </button>
        ))}
      </div>
      <div className="group-content">
        <div className="group-books">
          {activeGroupBooks.map((book) => (
            <div
              className="group-book"
              key={book.id}
              onClick={() => handleBookClick(book)}
            >
              <img src={book.cover.large} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <button
                className="delete-group-button"
                onClick={(e) => {
                  e.stopPropagation(); // Stop the event from bubbling up to the parent div
                  onDelete(book.id, activeGroup);
                }}
              >
                Delete Group
              </button>
            </div>
          ))}
        </div>
        {selectedBook && (
          <div className="book-comment-section">
            <h3>{selectedBook.title}</h3>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
            />
            <button onClick={handleSaveComment}>Save Comment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookGroup;
