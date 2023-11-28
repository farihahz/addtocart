document.addEventListener("DOMContentLoaded", function () {
    var storedGroceries = JSON.parse(localStorage.getItem("groceries")) || [];
    var listElement = document.getElementById("groceryList");

    storedGroceries.forEach(function (groceryItem) {
        addGroceryToList(groceryItem);
    });
});

function addGroceryToList(groceryItem) {
    var listElement = document.getElementById("groceryList");
    var listItem = document.createElement("li");
    listItem.textContent = groceryItem.name;

    if (groceryItem.purchased) {
        listItem.classList.add("purchased");
    }

    var toggleButton = document.createElement("button");
    toggleButton.textContent = groceryItem.purchased ? "Unmark" : "Mark";
    toggleButton.onclick = function () {
        groceryItem.purchased = !groceryItem.purchased;
        listItem.classList.toggle("purchased");
        toggleButton.textContent = groceryItem.purchased ? "Unmark" : "Mark";
        updateLocalStorage();
    };

    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
        listElement.removeChild(listItem);
        updateLocalStorage();
    };

    listItem.appendChild(toggleButton);
    listItem.appendChild(removeButton);
    listElement.appendChild(listItem);
}

function addGrocery() {
    var inputElement = document.getElementById("groceryInput");
    var groceryName = inputElement.value.trim();

    if (groceryName !== "") {
        var groceryItem = { name: groceryName, purchased: false };
        addGroceryToList(groceryItem);

        var storedGroceries = JSON.parse(localStorage.getItem("groceries")) || [];
        storedGroceries.push(groceryItem);
        localStorage.setItem("groceries", JSON.stringify(storedGroceries));

        inputElement.value = "";
    }
}

function updateLocalStorage() {
    var groceryItems = [];
    var listElement = document.getElementById("groceryList");

    listElement.childNodes.forEach(function (listItem) {
        var purchased = listItem.classList.contains("purchased");
        groceryItems.push({ name: listItem.textContent, purchased: purchased });
    });

    localStorage.setItem("groceries", JSON.stringify(groceryItems));
}
