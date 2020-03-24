class Book {
  constructor(title, author, date) {
    this.title = title;
    this.author = author;
    this.date = date;
  }
}
// UI Constructor
class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    //Create tr
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.date}</td>
      <td><a href='#' class="delete">X</a></td>
      `;
    list.appendChild(row);
  }
  showAlert(message, className) {
    //Create div
    const div = document.createElement("div");
    //Add class
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector(".container");
    //Get form
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    //Timeout after 3 sec
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("date").value = "";
  }
}

//Event listener for add book
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("book-form").addEventListener("submit", e => {
    //Get form values
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const date = document.getElementById("date");
    let titleValue = title.value.trim();
    let authorValue = author.value.trim();
    let dateValue = date.value.toString();
    //New instance of UI
    let ui = new UI();
    //Validate
    if (titleValue === "" || authorValue === "" || dateValue === "") {
      //error alert
      ui.showAlert("Please fill in all fields", "error");
    } else {
      // Instantiate book
      let book = new Book(titleValue, authorValue, dateValue);
      //Show success
      ui.showAlert("Book Added!", "success");
      ui.addBookToList(book);

      //Clear fields
      ui.clearFields();
    }
    e.preventDefault();
  });
});
