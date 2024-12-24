import React, { useState } from "react";

const BookDetail = ({ book, onBack }) => {
  const [comment, setComment] = useState(book.comment || "");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSaveComment = () => {
    // Save the comment to the book object or send it to the server
    book.comment = comment;
    onBack(); // Go back to the previous tab
  };

  return (
    <div className="book-detail">
      <button onClick={onBack}>Back</button>
      <div className="book-info">
        <img src={book.cover.large} alt={book.title} />
        <h3>{book.title}</h3>
        <p>{book.author}</p>
      </div>
      <div className="book-comment">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
        />
        <button onClick={handleSaveComment}>Save Comment</button>
      </div>
    </div>
  );
};

export default BookDetail;
