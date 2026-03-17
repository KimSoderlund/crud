
import { addBook } from './addBook.js';
import { deleteBook } from './deleteBook.js';
import { findBook } from './findBook.js';
import { getBooks } from './getBooks.js';





const addBookButton = document.getElementById('addBook');
addBookButton.addEventListener('click', () => {
addBook('Yuval Noah Harari', 'Sapiens: En kort historik över mänskligheten', 2011);
});

const printBookButton = document.getElementById('printBook');
printBookButton.addEventListener('click', () => {
getBooks();
});

const updateBookButton = document.getElementById('updateBook');
updateBookButton.addEventListener('click', async () => {
    const book = await findBook('1');
    console.log(book);
});
