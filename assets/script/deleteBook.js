export async function deleteBook(id) {
    const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    console.log(`Book with id ${id} deleted`);
}