import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Book.css'; 

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          'https://openlibrary.org/search.json?q=*&limit=100'
        );
        const booksData = response.data.docs;
        setBooks(booksData);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">📚 Book List</h1>
      {isLoading && !isError && <p className="info">Loading...</p>}
      {!isLoading && isError && (
        <p className="error">Error: Could not fetch books</p>
      )}
      {!isLoading && !isError && (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.key} className="book-card">
              <h2>{book.title || 'Untitled'}</h2>
              <p><strong>Year:</strong> {book.publish_year?.[0] || 'N/A'}</p>
              <p><strong>ISBN:</strong> {book.isbn?.[0] || 'N/A'}</p>
              <p><strong>Pages:</strong> {book.number_of_pages_median || 'N/A'}</p>
              <p><strong>Author:</strong> {book.author_name?.join(', ') || 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
