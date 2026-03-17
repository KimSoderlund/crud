export async function findBook(id) {
    try {
        const response = await fetch(`http://localhost:3000/books/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const book = await response.json();
        return book;
    } catch (error) {
        console.error(error);
    }
}