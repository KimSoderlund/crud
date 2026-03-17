async function getBooks() {
    try {
        const response = await fetch('http://localhost:3000/books');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const books = await response.json();
        console.log(books);
    } catch (error) {
        console.error(error);
    }
}


async function findBook(id) {
    try {
        const response = await fetch(`http://localhost:3000/books/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const book = await response.json();
        console.log(book);
    } catch (error) {
        console.error(error);
    }
}


async function addBook(author, title, release_year) { 
    const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            author: author,
            release_year: release_year
        })
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const newBook = await response.json();
    console.log(newBook);
}


async function deleteBook(id) {
    const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    console.log(`Book with id ${id} deleted`);
}


const addBookButton = document.getElementById('addBook');
addBookButton.addEventListener('click', () => {
addBook('Yuval Noah Harari', 'Sapiens: En kort historik över mänskligheten', 2011);
});

const printBookButton = document.getElementById('printBook');
printBookButton.addEventListener('click', () => {
getBooks();
});

const deleteBookButton = document.getElementById('deleteBook');
deleteBookButton.addEventListener('click', () => {
    console.log('Deleting book with id 1');
deleteBook('1');
});
