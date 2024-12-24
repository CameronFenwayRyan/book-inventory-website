import React, { useState, useEffect } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import BookGroup from "./components/BookGroup";
import Tabs from "./components/Tabs";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups"));
    if (storedGroups) {
      setGroups(storedGroups);
    }
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      localStorage.setItem("groups", JSON.stringify(groups));
    }
  }, [groups]);

  const addGroup = (groupName) => {
    if (groups.some((group) => group.name === groupName)) {
      setError("Group name already exists.");
      return;
    }
    setGroups([...groups, { name: groupName, books: [] }]);
    setError("");
  };

  const deleteGroup = (groupName) => {
    setGroups(groups.filter((group) => group.name !== groupName));
    if (currentGroup === groupName) {
      setCurrentGroup(null);
    }
  };

  const addBookToGroup = (book, groupName) => {
    const bookWithId = { ...book, id: uuidv4() }; // Add unique identifier
    setGroups(
      groups.map((group) =>
        group.name === groupName
          ? { ...group, books: [bookWithId, ...group.books] }
          : group
      )
    );
  };

  const handleDeleteBook = (id) => {
    if (currentGroup) {
      setGroups(
        groups.map((group) =>
          group.name === currentGroup
            ? { ...group, books: group.books.filter((book) => book.id !== id) }
            : group
        )
      );
    }
  };

  const handleRatingChange = (isbn, newRating) => {
    if (currentGroup) {
      setGroups(
        groups.map((group) =>
          group.name === currentGroup
            ? {
                ...group,
                books: group.books.map((book) =>
                  book.isbn === isbn ? { ...book, rating: newRating } : book
                ),
              }
            : group
        )
      );
    }
  };

  const handleGroupClick = (groupName) => {
    setCurrentGroup(groupName);
  };

  const handleBackToGroups = () => {
    setCurrentGroup(null);
  };

  const currentGroupData = groups.find((group) => group.name === currentGroup);

  return (
    <div>
      <Tabs>
        <div label="Groups">
          {currentGroup ? (
            <>
              <button onClick={handleBackToGroups}>Back to Groups</button>
              {currentGroupData && (
                <BookList
                  books={currentGroupData.books}
                  onDelete={handleDeleteBook}
                  onRatingChange={handleRatingChange}
                />
              )}
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="New Group Name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addGroup(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <div className="group-list">
                {groups.map((group) => (
                  <BookGroup
                    key={group.name}
                    group={group}
                    onClick={handleGroupClick}
                    onDelete={deleteGroup}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div label="Search">
          <BookForm addBook={addBookToGroup} error={error} groups={groups} />
        </div>
      </Tabs>
    </div>
  );
};

export default App;
