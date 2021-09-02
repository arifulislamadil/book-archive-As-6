const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';

    //handle clear and show result
    if (searchText == '') {
        document.getElementById('display error-message').innerText = `Insert a valid book name`;
        const bookDetails = document.getElementById('book-details').innerText = '';
        document.getElementById('book-found').innerText = "";
    } else {
        //clear error message
        document.getElementById('display error-message').innerText = '';
        //clear books result found
        document.getElementById('book-found').innerText = "";
        //fetch url 
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
    }

}

const displaySearchResult = (books) => {
    // const book = books; //get array in the book variable
    //show book result found
    document.getElementById('book-found').innerText = `${books.length} Books Found`;
    //display book details tag
    const bookDetails = document.getElementById('book-details');
    bookDetails.innerText = ""; //clear past result
    if (books.length === 0) {
        document.getElementById('book-found').innerText = `invalid key word`;
    } else {
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            //show book details in the card
            div.innerHTML = `
                <div class="card h-100">
                    <img class="img-fluid h-100" style="height:100px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="...">
                    <div class="card-body">
                        <p class="card-title my-0"><span class='fw-bold'>Book Name:</span> ${book.title}</p>
                        <p class="card-txt my-0">Writer:<a href="#" class="card-text">${book.author_name}</a> </p>
                        <p class="card-text my-0">Publisher: ${book.publisher}</p>
                        <p class = "card-text my-0">First Publish Year: ${book.first_publish_year}</p>
                    </div>
               </div >`;
            bookDetails.appendChild(div);
        })

    }


}