export async function updateBook(id, author, title, release_year) {
    const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'PUT',
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
    return await response.json();
}