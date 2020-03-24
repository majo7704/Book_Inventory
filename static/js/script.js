// Local Storage set up

document.addEventListener("DOMContentLoaded", function() {
  const nameForm = document.getElementById("nameForm");
  nameForm.addEventListener("submit", e => {
    e.preventDefault();
    const newName = nameForm.username.value.trim();

    if (newName !== "") {
      const getName = document.getElementById("user");
      getName.innerText = `Welcome ${newName}`.toUpperCase();
      localStorage.setItem("username", newName);
      //Clear field
      nameForm.reset();
    } else {
      const getName = document.getElementById("user");
      getName.innerText = `Welcome Stranger`.toUpperCase();
      localStorage.setItem("username", "Stranger");
    }
  });
});
function getNameFromLocalStorage() {
  const getName = document.getElementById("user");
  let username = localStorage.getItem("username");
  if (username) {
    getName.innerText = `Welcome ${username}`.toUpperCase();
  }
}
getNameFromLocalStorage();
