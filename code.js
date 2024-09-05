var field = document.getElementById("addTODO");
var submit = document.getElementById("sub");
var parent = document.getElementById("container"); // ul элемент

var num = 0;
var isEditing = false;
var inEditID = 0;
var key = "";
const re = new RegExp("[0-9]+");

submit.addEventListener("click", function(sub) {

    if (field.value != "") {
        if (!isEditing) {
            // Создаем новый элемент списка li
            var li = document.createElement('li');
            li.id = "li" + num;

            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "name";
            checkbox.id = "checkbox" + num;

            var label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.appendChild(document.createTextNode(field.value));

            var button = document.createElement('button');
            button.id = "butt";
            button.name = num;
            button.innerHTML = "Edit";

            var delButton = document.createElement('button');
            delButton.id = "butt";
            delButton.name = "dell" + num;
            delButton.innerHTML = "Remove";


            li.appendChild(checkbox);
            li.appendChild(label);
            li.appendChild(button);
            li.appendChild(delButton);


            parent.appendChild(li);

            buttonEvents(button);
            delButtonEvent(delButton, li);


            checkbox.addEventListener("click", function() {
                if (checkbox.checked) {
                    label.innerHTML = "<s>" + label.textContent + "</s>";
                } else {
                    label.innerHTML = label.textContent.replace(/<\/?s>/g, "");
                }
                console.log(get_num(this.id));
            });
            num++;
            field.value = "";
        } else {
            changeLabel(inEditID, field.value);
        }
    }
});

function changeLabel(Id, newText) {
    var label = document.querySelector('label[for="' + 'checkbox' + Id + '"]');
    if (label) {
        label.textContent = newText;
    }
    isEditing = false;
}

function buttonEvents(button) {
    button.addEventListener("click", function() {
        field.placeholder = 'Edit your List please!';
        field.value = "";
        inEditID = this.name;
        isEditing = true;
    });
}

function delButtonEvent(delbutton, li) {
    delbutton.addEventListener("click", function() {
        parent.removeChild(li);
    });
}