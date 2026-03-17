import { deleteBook } from './deleteBook.js';
import { updateBook } from './updateBook.js';

export async function getBooks() {
    try {
        const response = await fetch('http://localhost:3000/books');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const books = await response.json();
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.textContent = `${book.title} by ${book.author} (${book.release_year})`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                await deleteBook(book.id);
                bookElement.remove();

            });
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener('click', () => {
                const changeBookOverlay = document.createElement('div');
                changeBookOverlay.id = 'changeBookOverlay';
                
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
                                const newBook = await updateBook(book.id, author, title, releaseYear);
                                console.log('Book updated:', newBook);
                                document.body.removeChild(changeBookOverlay);
                            } catch (error) {
                                console.error('Error updating book:', error);
                            }
                        }
                    });

                    const cancelButton = document.createElement('button');
                    cancelButton.textContent = 'Cancel';
                    cancelButton.addEventListener('click', () => {
                        document.body.removeChild(changeBookOverlay);
                    });

                    changeBookOverlay.appendChild(submitButton);
                    changeBookOverlay.appendChild(cancelButton);

                changeBookOverlay.appendChild(bookTitleInput);
                changeBookOverlay.appendChild(bookAuthorInput);
                changeBookOverlay.appendChild(bookReleaseYearInput);
                document.body.appendChild(changeBookOverlay);
                // await updateBook(book.id, 'korvbagaren', 'äkorv', 30000);
            });

            bookElement.appendChild(deleteButton);
            bookElement.appendChild(updateButton);
            document.body.appendChild(bookElement);
        });
    } catch (error) {
        console.error(error);
    }
}