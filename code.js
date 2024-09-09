var field = document.getElementById("addTODO");
var submit = document.getElementById("sub");
var parent = document.getElementById("container"); // ul элемент
var save = document.getElementById("save");
var load = document.getElementById("load");

var num = 0;
var isEditing = false;
var inEditID = 0;
var key = "";
const re = new RegExp("[0-9]+");
var task = [];

submit.addEventListener("click", function(sub) {

    if (field.value != "") {
        if (!isEditing) {

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

            var inf = {
                txt: field.value,
                isFinished: false
            };

            checkbox.addEventListener("click", function() {
                if (checkbox.checked) {
                    label.innerHTML = "<s>" + label.textContent + "</s>";
                    inf.isFinished = true;

                } else {
                    label.innerHTML = label.textContent.replace(/<\/?s>/g, "");
                }
            });

            task.push(inf);

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
const downloadJSON = (obj, name) => {
    const dataUri = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    const anchorElement = document.createElement('a');
    anchorElement.href = dataUri;
    anchorElement.download = `${name}.json`;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
}
save.addEventListener('click', function() {

    console.log(task);
    downloadJSON(task, 'tasks');

});

load.addEventListener('click', function() {
    var inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'application/json';
    inputFile.addEventListener('change', function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            var loadedTasks = JSON.parse(event.target.result);
            task = loadedTasks;
            num = task.length;
            parent.innerHTML = '';
            task.forEach((taskItem, index) => {
                loadTask(taskItem, index);
            });
        };
        reader.readAsText(file);
    });
    inputFile.click();
});

function loadTask(taskItem, id) {
    var li = document.createElement('li');
    li.id = "li" + id;

    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.id = "checkbox" + id;
    checkbox.checked = taskItem.isFinished;

    var label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.innerHTML = taskItem.isFinished ? "<s>" + taskItem.txt + "</s>" : taskItem.txt;

    var button = document.createElement('button');
    button.id = "butt";
    button.name = id;
    button.innerHTML = "Edit";

    var delButton = document.createElement('button');
    delButton.id = "butt";
    delButton.name = "dell" + id;
    delButton.innerHTML = "Remove";

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(button);
    li.appendChild(delButton);

    parent.appendChild(li);

    buttonEvents(button);
    delButtonEvent(delButton, li);

    checkbox.addEventListener("click", function() {
        taskItem.isFinished = checkbox.checked;
        label.innerHTML = taskItem.isFinished ? "<s>" + taskItem.txt + "</s>" : taskItem.txt;
    });
}