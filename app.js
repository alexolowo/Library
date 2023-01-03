//Library Array Declaration
let myLibrary = [];

//Book Constructor for storing retrieved data
const Book = function (name, author, pages, read_Or_Not) {
  this.name = name;
  this.pages = pages;
  this.author = author;
  this.read_Or_Not = read_Or_Not;
  //   this.info = () => {
  //     return `${name} by ${author}, ${pages} pages, ${read_Or_Not}`;
  //   };
};

//Function to append new user input to the array
function addBookToLibrary(obj) {
  myLibrary.push(obj);
}

//Selecting the DOM input elements
const add_new = document.getElementById("addbtn");
const hidden_form = document.getElementById("hiddenform");
const submit_btn = document.getElementById("submitbtn");

//Adding event listenenr for clicking add a new book
add_new.addEventListener("click", () => {
  hidden_form.removeAttribute("hidden");
});

//Repurposing the submit button to not submit to a server
submit_btn.addEventListener("click", checkPress, false);

//Defining the checkPress function that creates a new object from user input
function checkPress(event) {
  const newBook = new Book(
    `Book Title: ${document.getElementById("title").value}`,
    `Authored By: ${document.getElementById("author").value}`,
    `${document.getElementById("page").value} Pages`,
    `Read Status: ${document.getElementById("Reading Status").value}`
  );

  addBookToLibrary(newBook);

  console.log(newBook);

  //Selecting card heirarchy
  const cardContainer = document.getElementById("card_container");
  const card = document.createElement("div");
  card.classList.add("card");
  cardContainer.appendChild(card);

  const list = document.createElement("ul");
  card.appendChild(list);

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("hidden", true);
  checkbox.classList.add("delcheck");
  list.appendChild(checkbox);

  for (const i in newBook) {
    const listItem = document.createElement("li");

    listItem.textContent = newBook[i];
    list.appendChild(listItem);
  }
}

document.getElementById("closebtn").addEventListener("click", () => {
  document.getElementById("resetbtn").click();
  hidden_form.setAttribute("hidden", true);
});

// let del_list = document.getElementsByClassName("delcheck");

document.getElementById("delbtn").addEventListener("click", () => {
  let del_list = document.getElementsByClassName("delcheck");
  for (i = 0; i < del_list.length; i++) {
    del_list[i].removeAttribute("hidden");
  }

  document.getElementById("delbtn").setAttribute("hidden", true);
  document.getElementById("hiddendelbtn").removeAttribute("hidden");
});

document.getElementById("hiddendelbtn").addEventListener("click", () => {
  let del_list = document.getElementsByClassName("delcheck");
  console.log(del_list);
  for (i = 0; i < del_list.length; i++) {
    if (del_list[i].checked === true) {
      for (j = 0; j < myLibrary.length; j++) {
        if (myLibrary[j].name == del_list[i].nextElementSibling.textContent) {
          myLibrary.splice(j, j);
        }
      }
      del_list[i].parentElement.parentElement.remove();
    }
  }

  if (myLibrary.length !== del_list.length) {
    document.getElementById("hiddendelbtn").click();
    console.log("clicked");
  } else {
    resetDelScreen();
  }
});

function resetDelScreen() {
  let del_list = document.getElementsByClassName("delcheck");
  for (i = 0; i < del_list.length; i++) {
    del_list[i].setAttribute("hidden", true);
  }
  document.getElementById("hiddendelbtn").setAttribute("hidden", true);
  document.getElementById("delbtn").removeAttribute("hidden");
}
