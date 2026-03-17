import { addBook } from './addBook.js';

const addBookButton = document.getElementById('addBook');
addBookButton.addEventListener('click', () => {
    console.log('Add Book button clicked');

    const addBookOverlay = document.createElement('div');
    addBookOverlay.id = 'addBookOverlay';
    
    const bookTitleInput = document.createElement('input');
    bookTitleInput.placeholder = 'Book Title';
    bookTitleInput.required = true;

    const bookAuthorInput = document.createElement('input');
    bookAuthorInput.placeholder = 'Book Author';
    bookAuthorInput.required = true;

    const bookReleaseYearInput = document.createElement('input');
    bookReleaseYearInput.placeholder = 'Release Year';
    bookReleaseYearInput.type = 'number';
    bookReleaseYearInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', async () => {
        const title = bookTitleInput.value;
        const author = bookAuthorInput.value;
        const releaseYear = bookReleaseYearInput.value;
        if (!title || !author || !releaseYear) {
            return;
        } else {
            try {
                const newBook = await addBook(author, title, releaseYear);
                console.log('New book added:', newBook);
                document.body.removeChild(addBookOverlay);
            } catch (error) {
                console.error('Error adding book:', error);
            }
        }
    });

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        document.body.removeChild(addBookOverlay);
    });

    addBookOverlay.appendChild(bookTitleInput);
    addBookOverlay.appendChild(bookAuthorInput);
    addBookOverlay.appendChild(bookReleaseYearInput);
    addBookOverlay.appendChild(submitButton);
    addBookOverlay.appendChild(cancelButton);
    document.body.appendChild(addBookOverlay);
});