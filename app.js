// Book Class: Represente a book

    class Book{ // we created a class Book to put in it objects
        constructor(title, author, isbn) { 
            this.title = title;
            this.author = author;
            this.isbn = isbn;
        }
    }

// UI Class: Handle UI Tasks

    class UI {
        static displayBooks() {

            const books = Store.getBooks();
            books.forEach((book) => UI.addBookToList(book));
        }

        static addBookToList(book){
            const list = document.querySelector('#book-list');

            const row = document.createElement('tr');
            
            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `;

            list.appendChild(row);
        }

        static deleteBook(el){
            if(el.classList.contains('delete')){
                el.parentElement.parentElement.remove();
            }
        }

        static showAlert(message, className){
            
            const div = document.createElement('div');
            const messageNode = document.createTextNode(message);

            // div class
            div.className=`alert alert-${className}`;
            
            //display message
            div.appendChild(messageNode);
            
            //position
            const container = document.querySelector('.container');
            const form = document.querySelector('#book-form');
            
            container.insertBefore(div, form);

            // Disapear in 2sec
            setTimeout(()=> document.querySelector('.alert').remove(), 2000);
        }

        static clearFields(){
            document.querySelector('#title').value='';
            document.querySelector('#author').value='';
            document.querySelector('#isbn').value='';
        }
    }

// Store Class: Handles Sotrage

    class Store{
        static getBooks(){
            let books;
            if(localStorage.getItem('books') === null){
                books = [];
            }

            else{
                books = JSON.parse(localStorage.getItem('books'));
                //JSOM.parse transform string to array
            }
            return books;
        }

        static addBook(book){
            // get books from local storage
            const books = Store.getBooks();
            // put new value of book
            books.push(book);
            // reset to local storage
            localStorage.setItem('books', JSON.stringify(books));
        }

        static removeBook(isbn){
            const books = Store.getBooks();
            
            books.forEach((book, index) => {
                if(book.isbn === isbn) {
                    books.splice(index, 1);
                }
            });

            localStorage.setItem('books', JSON.stringify(books));
        }
    }

// Event: Display Books

    document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book
    var bookform = document.querySelector('#book-form');

    bookform.addEventListener('submit', (e) => {
        //Prevent actual - la tdal l result sbete
        e.preventDefault();

        // Get form values
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;

        //Validate
        if(title ==='' || author ==='' || isbn ===''){
            UI.showAlert('Please fill in all fields','danger');
        }

        else{ 

        //Instatiate book
        const book =  new Book(title, author, isbn);

        //add book to UI
        UI.addBookToList(book);

        // Add book to store

        Store.addBook(book);

        // show success message
        UI.showAlert('Book added','success'); 

        // Clear Fields
        UI.clearFields(); // to clear the field after submitting
        }
        
    });

// Event: Remove a Book

    document.querySelector('#book-list').addEventListener('click', (e) => {

    // remove book frome UI
    UI.deleteBook(e.target);

    // remove book from storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // show book removed message
    UI.showAlert('Book removed','success');
    }
    );





