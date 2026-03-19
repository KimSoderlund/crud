import { deleteBook } from './deleteBook.js';
import { updateBook } from './updateBook.js';

export async function getBooks() {
    const bookList = document.getElementById('bookList');
    const overlayContainer = document.getElementById('overlayContainer');
    bookList.innerHTML = '';
    try {
        const response = await fetch('http://localhost:3000/books');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const books = await response.json();
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book-card';

            const bookTitle = document.createElement('div');
            bookTitle.className = 'book-title';
            bookTitle.textContent = `${book.title} (${book.release_year}), ${book.author}`;

            const bookArt = document.createElement('div');
            bookArt.className = 'book-art';
            bookArt.textContent = `Art#:${book.id}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                await deleteBook(book.id);
                bookElement.remove();

            });
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener('click', () => {
                overlayContainer.innerHTML = '';
                const changeBookOverlay = document.createElement('div');
                changeBookOverlay.id = 'changeBookOverlay';
                changeBookOverlay.className = 'overlay';
                
                const bookTitleInput = document.createElement('input');
                bookTitleInput.value = book.title;
                bookTitleInput.required = true;

                const bookAuthorInput = document.createElement('input');
                bookAuthorInput.value = book.author;
                bookAuthorInput.required = true;

                const bookReleaseYearInput = document.createElement('input');
                bookReleaseYearInput.value = book.release_year;
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
                                const updatedBook = await updateBook(book.id, author, title, releaseYear);
                                bookTitle.textContent = `${updatedBook.title} (${updatedBook.release_year}), ${updatedBook.author}`;
                                bookArt.textContent = `Art#:${updatedBook.id}`;
                                overlayContainer.removeChild(changeBookOverlay);
                            } catch (error) {
                                console.error('Error updating book:', error);
                            }
                        }
                    });

                    const cancelButton = document.createElement('button');
                    cancelButton.textContent = 'Cancel';
                    cancelButton.addEventListener('click', () => {
                        overlayContainer.removeChild(changeBookOverlay);
                    });

                changeBookOverlay.appendChild(bookTitleInput);
                changeBookOverlay.appendChild(bookAuthorInput);
                changeBookOverlay.appendChild(bookReleaseYearInput);
                changeBookOverlay.appendChild(submitButton);
                changeBookOverlay.appendChild(cancelButton);
                overlayContainer.appendChild(changeBookOverlay);
            });

            const bookActions = document.createElement('div');
            bookActions.className = 'book-actions';
            bookActions.appendChild(deleteButton);
            bookActions.appendChild(updateButton);

            bookElement.appendChild(bookTitle);
            bookElement.appendChild(bookArt);
            bookElement.appendChild(bookActions);
            bookList.appendChild(bookElement);
        });
    } catch (error) {
        console.error(error);
    }

}