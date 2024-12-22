import axios from 'axios';

export const getBookDetails = async (isbn) => {
  try {
    const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
    return response.data[`ISBN:${isbn}`];
  } catch (error) {
    throw new Error('Error fetching book data from Open Library');
  }
};