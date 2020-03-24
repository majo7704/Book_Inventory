class Book {
  constructor(title, author, date) {
    this.title = title;
    this.author = author;
    this.date = date;
  }
}
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

function removeABook(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
  }
}

//Search functionality
const list = document.querySelector("#book-list");
const ui = new UI();
const filterBooks = term => {
  Array.from(list.children)
    .filter(book => !book.textContent.toLowerCase().includes(term))
    .forEach(book => book.classList.add("filtered"));

  Array.from(list.children)
    .filter(book => book.textContent.toLowerCase().includes(term))
    .forEach(book => book.classList.remove("filtered"));
};
//Event listener for search
const search = document.querySelector("#search");
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterBooks(term);
});

//Event listener for delete
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("book-list").addEventListener("click", function(e) {
    const ui = new UI();
    //Delete book
    ui.deleteBook(e.target);
    //Show message
    ui.showAlert("Book Temporarily Removed", "success");

    e.preventDefault();
  });
});
