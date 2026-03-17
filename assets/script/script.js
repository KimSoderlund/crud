
import { findBook } from './findBook.js';
import { getBooks } from './getBooks.js';
import './addBookOverlay.js';





const printBookButton = document.getElementById('printBook');
printBookButton.addEventListener('click', () => {
getBooks();
});