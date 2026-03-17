import { deleteBook } from './deleteBook.js';

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

            bookElement.appendChild(deleteButton);
            document.body.appendChild(bookElement);
        });
    } catch (error) {
        console.error(error);
    }
}