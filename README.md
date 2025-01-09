# Book Inventory Website  

The **Book Inventory Website** is a React-based application designed to help users manage their personal book collections. With features like book search, organization into groups, and the ability to add reviews, it offers a convenient way to keep track of books and enhance the reading experience.  

## Features  
- **Search Books:**  
  Search for books by title, author, subject, or ISBN code using the [Open Library API](https://openlibrary.org/developers/api).  

- **Add to Groups:**  
  Organize books into different groups for better categorization.  

- **Manage Groups:**  
  Create, delete, and manage book groups seamlessly.  

- **Reviews:**  
  Add and save reviews for each book in your collection.  

- **Local Saves:**  
  Book groups and reviews are saved locally, ensuring a smooth and persistent user experience.  

## Project Structure 
book-inventory-website/
├── .gitignore
├── .vscode/
│   └── extensions.json
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Book.js
│   │   ├── BookDetail.js
│   │   ├── BookForm.js
│   │   ├── BookGroup.js
│   │   ├── BookList.js
│   │   ├── SearchCard.js
│   │   └── Tabs.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   ├── SearchContext.js
│   ├── services/
│   │   └── openLibraryAPI.js
│   └── setupTests.js
├── package.json
└── README.md

## Technologies Used
- **React**: Frontend framework
- **Open Library API**: Book search functionality
- **Local Storage**: Persistent data saving
