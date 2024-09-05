var field = document.getElementById("addTODO");
var submit = document.getElementById("sub");
var parent = document.getElementById("container")

var num = 0;
var isEditing = false;
var inEditID = 0;

submit.addEventListener("click", function(sub) {

    if (!isEditing) {
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.id = "checkbox" + num;

        var label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.appendChild(document.createTextNode(field.value));

        var button = document.createElement('button');
        button.id = num;
        button.name = "Edit";
        button.innerHTML = "Edit"


        parent.appendChild(checkbox);
        parent.appendChild(label);
        parent.appendChild(button);

        var linebreak = document.createElement("br");
        parent.appendChild(linebreak);

        buttonEvents(button);

        checkbox.addEventListener("click", function() {
            if (checkbox.checked) {
                label.innerHTML = "<s>" + label.textContent + "</s>";
            } else {
                label.innerHTML = label.textContent.replace(/<\/?s>/g, "");
            }
        });
        num++;
    } else {
        changeLabel(inEditID, field.value);
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
        field.placeholder = 'Edit your List';
        field.value = "";
        inEditID = this.name;
        isEditing = true;

    });
}