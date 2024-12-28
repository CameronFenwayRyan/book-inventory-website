import React, { useState, useEffect } from "react";

const BookGroup = ({
  groups,
  onBookClick,
  onDelete,
  addGroup,
  deleteGroup,
}) => {
  const [activeGroup, setActiveGroup] = useState(groups[0].name);
  const [selectedBook, setSelectedBook] = useState(null);
  const [comment, setComment] = useState("");
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    if (
      groups.length > 0 &&
      !groups.find((group) => group.name === activeGroup)
    ) {
      setActiveGroup(groups[0].name);
    }
  }, [groups, activeGroup]);

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

  const handleAddGroup = () => {
    if (newGroupName.trim() !== "") {
      addGroup(newGroupName);
      setNewGroupName("");
    }
  };

  const handleDeleteGroup = (groupName) => {
    deleteGroup(groupName);
    if (activeGroup === groupName) {
      setActiveGroup(groups[0]?.name || "");
    }
  };

  const activeGroupBooks =
    groups.find((group) => group.name === activeGroup)?.books || [];

  return (
    <div className="book-group-container">
      <div className="add-group">
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="New Group Name"
        />
        <button onClick={handleAddGroup}>Add Group</button>
      </div>
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
                Remove Book
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
              placeholder="Leave a review..."
            />
            <button onClick={handleSaveComment}>Save Comment</button>
          </div>
        )}
        <div className="delete-group"></div>
      </div>
      <button
        onClick={() => {
          const confirmDelete = window.confirm(
            `Are you sure you want to delete the group "${activeGroup}"?`
          );
          if (confirmDelete) {
            handleDeleteGroup(activeGroup);
          }
        }}
      >
        Delete Group
      </button>
    </div>
  );
};

export default BookGroup;
