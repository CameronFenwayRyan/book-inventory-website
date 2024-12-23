import React from 'react';

const BookGroup = ({ group, onClick, onDelete }) => {
  return (
    <div className="book-group" onClick={() => onClick(group.name)}>
      <h3 className="group-title">{group.name}</h3>
      <p>{group.books.length} books</p>
      <button
        className="delete-group-button"
        onClick={(e) => {
          e.stopPropagation(); // Stop the event from bubbling up to the parent div
          onDelete(group.name);
        }}
        >
            Delete Group
        </button>
    </div>
  );
};

export default BookGroup;