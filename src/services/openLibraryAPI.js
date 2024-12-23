import axios from "axios";

export const getBookDetails = async (query) => {
  const response = await axios.get(
    `https://openlibrary.org/search.json?q=${query}`
  );
  const data = response.data;

  if (!data || data.docs.length === 0) {
    throw new Error("Book not found");
  }

  const lowerCaseQuery = query.toLowerCase();

  // Filter results by title
  let filteredBooks = data.docs.filter((bookData) =>
    bookData.title.toLowerCase().includes(lowerCaseQuery)
  );

  // If no results found by title, filter by author's first name
  if (filteredBooks.length === 0) {
    filteredBooks = data.docs.filter(
      (bookData) =>
        bookData.author_name &&
        bookData.author_name[0].split(" ")[0].toLowerCase() === lowerCaseQuery
    );
  }

  // If no results found by author's first name, filter by author's last name
  if (filteredBooks.length === 0) {
    filteredBooks = data.docs.filter(
      (bookData) =>
        bookData.author_name &&
        bookData.author_name[0].split(" ").slice(-1)[0].toLowerCase() ===
          lowerCaseQuery
    );
  }

  // If no results found by author's last name, filter by keyword
  if (filteredBooks.length === 0) {
    filteredBooks = data.docs.filter(
      (bookData) =>
        bookData.subject &&
        bookData.subject.some((subject) =>
          subject.toLowerCase().includes(lowerCaseQuery)
        )
    );
  }

  return filteredBooks.map((bookData) => ({
    isbn: bookData.isbn ? bookData.isbn[0] : "Unknown ISBN",
    title: bookData.title,
    author: bookData.author_name ? bookData.author_name[0] : "Unknown Author",
    cover: bookData.cover_i
      ? {
          large: `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`,
        }
      : { large: "default-cover-url.jpg" },
  }));
};
