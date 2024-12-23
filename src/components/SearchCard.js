import React, { useState } from 'react';

const SearchCard = ({ book, groups, onAddToGroup }) => {
  const [selectedGroup, setSelectedGroup] = useState('');

  const handleAddToGroup = () => {
    if (selectedGroup) {
      onAddToGroup(book, selectedGroup);
      setSelectedGroup(''); // Reset the selected group
    }
  };

  return (
    <div className="search-card">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">Author: {book.author}</p>
      <img className="book-cover" src={book.cover ? book.cover.large : ''} alt={book.title} />
      <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
        <option value="">Select Group</option>
        {groups.map(group => (
          <option key={group.name} value={group.name}>{group.name}</option>
        ))}
      </select>
      <button onClick={handleAddToGroup}>Add to Group</button>
    </div>
  );
};

export default SearchCard;