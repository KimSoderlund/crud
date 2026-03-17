
import { addBook } from './addBook.js';
import { findBook } from './findBook.js';
import { getBooks } from './getBooks.js';
import './addBookOverlay.js';





const printBookButton = document.getElementById('printBook');
printBookButton.addEventListener('click', () => {
getBooks();
});

const updateBookButton = document.getElementById('updateBook');
updateBookButton.addEventListener('click', async () => {
    const book = await findBook('1');
    console.log(book);
});
