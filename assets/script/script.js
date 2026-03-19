
import { findBook } from './findBook.js';
import { getBooks } from './getBooks.js';
import './addBookOverlay.js';





await getBooks();

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', async () => {
	const id = searchInput.value.trim();

	if (!id) {
		await getBooks();
		return;
	}

	await findBook(id);
});
