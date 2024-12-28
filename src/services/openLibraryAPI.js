import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const getBookDetails = async (query) => {
  const response = await axios.get(
    `https://openlibrary.org/search.json?q=${query}`
  );
  const data = response.data;

  if (!data || data.docs.length === 0) {
    throw new Error("Book not found");
  }

  const lowerCaseQuery = query.toLowerCase();

  // Filter by title
  let filteredBooks = data.docs.filter((bookData) =>
    bookData.title?.toLowerCase().includes(lowerCaseQuery)
  );

  // Filter by author name and add to filteredBooks
  const authorMatches = data.docs.filter((bookData) =>
    bookData.author_name?.some((author) =>
      author.toLowerCase().includes(lowerCaseQuery)
    )
  );
  filteredBooks = filteredBooks.concat(authorMatches);

  // Filter by subject and add to filteredBooks
  const subjectMatches = data.docs.filter((bookData) =>
    bookData.subject?.some((subject) =>
      subject.toLowerCase().includes(lowerCaseQuery)
    )
  );
  filteredBooks = filteredBooks.concat(subjectMatches);

  // If no matches, filter by ISBN
  const ibsnMatches = data.docs.filter((bookData) =>
    bookData.isbn?.some((isbn) => isbn === lowerCaseQuery)
  );
  filteredBooks = filteredBooks.concat(ibsnMatches);

  return filteredBooks.map((bookData) => ({
    id: uuidv4(),
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
