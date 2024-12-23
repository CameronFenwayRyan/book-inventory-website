import React, { useState, useContext } from "react";

const getBookDetails = async (isbn) => {
  const response = await fetch(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
  );
  const data = await response.json();
  const bookData = data[`ISBN:${isbn}`];

  if (!bookData) {
    throw new Error("Book not found");
  }

  return {
    isbn,
    title: bookData.title,
    author: bookData.authors ? bookData.authors[0].name : "Unknown Author",
    cover: bookData.cover
      ? { large: bookData.cover.large }
      : { large: "default-cover-url.jpg" },
  };
};
