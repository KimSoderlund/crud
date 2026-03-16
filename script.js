fetch('books.json')
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);
});