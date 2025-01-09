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
book-inventory-website/ ├── .gitignore ├── .vscode/ │ └── extensions.json ├── public/ │ ├── index.html │ ├── manifest.json │ └── robots.txt ├── src/ │ ├── components/ │ │ ├── Book.js # Component to display book details │ │ ├── BookDetail.js # Detailed view for a specific book │ │ ├── BookForm.js # Form for adding/editing books │ │ ├── BookGroup.js # Component to manage book groups │ │ ├── BookList.js # List of books in a group │ │ ├── SearchCard.js # Search result card │ │ └── Tabs.js # Tab navigation │ ├── App.css # Global CSS styles │ ├── App.js # Main application component │ ├── App.test.js # Unit tests for the app │ ├── index.css # Base CSS styles │ ├── index.js # Application entry point │ ├── reportWebVitals.js # Performance monitoring │ ├── SearchContext.js # Context API for managing search state │ ├── services/ │ │ └── openLibraryAPI.js # API integration with Open Library │ └── setupTests.js # Test setup configuration ├── package.json # Project dependencies and scripts └── README.md # Project documentation

## Technologies Used
**React***: Frontend framework
**Open Library API**: Book search functionality
**Local Storage**: Persistent data saving
