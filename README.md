Book Inventory Website
This project is a React-based book inventory management website. It enables users to search for books by title, author, subject, or ISBN code, organize them into groups, write reviews, and efficiently manage their personal book collections.

Features
Search Books: Search for books by title, author, subject, or IBSN code using the Open Library API.
Add to Groups: Add books to different groups for better organization.
Manage Groups: Create, delete, and manage book groups.
Reviews: Add and save reviews for each book.
Local Saves: Book groups and reviews save locally to improve user experience.

Project Structure
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
