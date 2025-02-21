// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//  UI  constructor
function Ui() {
    Ui.prototype.addBookToList = function (book) {
        const list = document.querySelector("#book-list");
        const tRow = document.createElement("tr");
        tRow.innerHTML = ` <td>${book.title}</td>
             <td>${book.author}</td>
             <td>${book.isbn}</td>
             <td><span class="btn btn-danger">X</span></td>`;
        list.appendChild(tRow);
    }
    Ui.prototype.clearFields = function () {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }
    Ui.prototype.clearAll = function () {
        document.querySelectorAll("#book-list tr").forEach(element => {
            element.remove();
        });;
    }
    Ui.prototype.removeFields = function (e) {

        e.target.parentElement.parentElement.remove();

    }

    Ui.prototype.showAlert = function (msg, type) {
        this.clearAlert();
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;
        alert.innerText = msg;
        document.querySelector(".own-alert").appendChild(alert);
        setTimeout(function () {
            if(document.querySelector(".alert")){
            document.querySelector(".alert").remove();
            }
        },2000);
    }
    Ui.prototype.clearAlert = function () {
        const currAlert = document.querySelector(".alert");
        if (currAlert) {
            currAlert.remove();
        }
    }
}
function Storage() {
    Storage.prototype.ready = function () {
        let bookTitle = JSON.parse(localStorage.getItem("bookTitle")) || [];
        let bookauthor = JSON.parse(localStorage.getItem("bookauthor")) || [];
        let bookIsbn = JSON.parse(localStorage.getItem("bookIsbn")) || [];

        for (let i = 0; i < bookTitle.length; i++) {
            const book = new Book(bookTitle[i], bookauthor[i], bookIsbn[i]);
            const ui = new Ui();
            ui.addBookToList(book);
        }
    }
    Storage.prototype.set = function (book) {
        let bookTitle, bookauthor, bookIsbn;
        if (localStorage.getItem("bookTitle") === null && localStorage.getItem("bookauthor") === null && localStorage.getItem("bookIsbn") === null) {
            bookTitle = [];
            bookauthor = [];
            bookIsbn = [];
            bookTitle.push(book.title);
            bookauthor.push(book.author);
            bookIsbn.push(book.isbn);
            localStorage.setItem("bookTitle", JSON.stringify(bookTitle));
            localStorage.setItem("bookauthor", JSON.stringify(bookauthor));
            localStorage.setItem("bookIsbn", JSON.stringify(bookIsbn));
        }
        else {
            bookTitle = JSON.parse(localStorage.getItem("bookTitle"));
            bookauthor = JSON.parse(localStorage.getItem("bookauthor"));
            bookIsbn = JSON.parse(localStorage.getItem("bookIsbn"));
            bookTitle.push(book.title);
            bookauthor.push(book.author);
            bookIsbn.push(book.isbn);
            localStorage.setItem("bookTitle", JSON.stringify(bookTitle));
            localStorage.setItem("bookauthor", JSON.stringify(bookauthor));
            localStorage.setItem("bookIsbn", JSON.stringify(bookIsbn));

        }
    }

    Storage.prototype.deleteItem = function (item) {
        bookTitle = JSON.parse(localStorage.getItem("bookTitle"));
        bookauthor = JSON.parse(localStorage.getItem("bookauthor"));
        let bookIsbn = JSON.parse(localStorage.getItem("bookIsbn"));
        let index = bookIsbn.indexOf(`${item}`);
        if (index != -1) {
            bookTitle.splice(index, 1);
            bookauthor.splice(index, 1);
            bookIsbn.splice(index, 1);
            localStorage.setItem("bookTitle", JSON.stringify(bookTitle));
            localStorage.setItem("bookauthor", JSON.stringify(bookauthor));
            localStorage.setItem("bookIsbn", JSON.stringify(bookIsbn));
        }
    }
    Storage.prototype.clearAll = function () {
        localStorage.clear();
    }
    Storage.prototype.checkStorage=function(isbn){
        let bookIsbn = JSON.parse(localStorage.getItem("bookIsbn"));
        if(bookIsbn != null){
            return bookIsbn.includes(`${isbn}`);
        }
        else{
           return false;
        }
    }
}
// Add event Listener
document.addEventListener("DOMContentLoaded", () => {
    const storage = new Storage();
    storage.ready();
});
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    const storage = new Storage();
    const ui= new Ui();
    const isbnCheck =storage.checkStorage(isbn);
    if(!isbnCheck){
        // Validate
        if (title === "" || author === "" || isbn === "") {
            ui.showAlert("Please fill all the fields", "danger");
        }
        else {
            const book = new Book(title, author, isbn);
            ui.addBookToList(book);
            storage.set(book);
            ui.showAlert("Book Added", "success");
            ui.clearFields();


        }
    }
    else{
    ui.clearFields();
    ui.showAlert("isbn already exists", "danger");

    }


});

document.querySelector("#clear").addEventListener("click", () => {
    const ui = new Ui();
    const storage = new Storage();
    ui.clearAll();
    ui.showAlert("All cleared", "success");
    storage.clearAll();

})


document.querySelector("#book-list").addEventListener("click", (e) => {
    if (e.target.nodeName === "SPAN") {
        const ui = new Ui();
        const storage = new Storage();
        ui.removeFields(e);
        ui.showAlert("Field Removed", "success");
        storage.deleteItem(e.target.parentElement.parentElement.children[2].innerText);
    }
})













// function createui(title, author, isbn){
//     const tableBody= document.querySelector("#book-list");
//        const tRow= document.createElement("tr");
//        const tData1 = document.createElement("td");
//        tData1.innerText= title;
//        const tData2 = document.createElement("td");
//        tData2.innerText= author;
//        const tData3 = document.createElement("td");
//        tData3.innerText= isbn;
//        const tData4 = document.createElement("td");
//        tData4.innerHTML=`<span class="btn btn-danger">X</span>`;
//        tRow.appendChild(tData1);
//        tRow.appendChild(tData2);
//        tRow.appendChild(tData3);
//        tRow.appendChild(tData4);
//        tableBody.appendChild(tRow);
// }