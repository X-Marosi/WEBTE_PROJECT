const cells = document.querySelectorAll(".cell");
let dragOrigin;

cells.forEach(elem => {
    elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
    elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
    elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
    elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
    elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
});



// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
    //save the element from which the drag started into a variable
    dragOrigin = event.target;
}

//Events fired on the drop target

function dragEnter(event) {
    if(!event.target.classList.contains("dropped")) {
        event.target.classList.add("droppable-hover");
    }
}

function dragOver(event) {
    if(!event.target.classList.contains("dropped")) {
        event.preventDefault();
    }
}

function dragLeave(event) {
    if(!event.target.classList.contains("dropped")) {
        event.target.classList.remove("droppable-hover");
    }
}

function drop(event) {
    event.preventDefault(); // This is in order to prevent the browser default handling of the data
    const draggableElementData = event.dataTransfer.getData("text"); // Get the dragged data. This method will return any data that was set to the same type in the setData() method
    const droppableElementData = event.target.getAttribute("data-draggable-id");


    //cant drag into itself
    if(event.target !== dragOrigin) {
        event.target.insertAdjacentHTML("afterbegin", `<div class="b-square cell" draggable="true"></div>`);
        dragOrigin.insertAdjacentHTML("afterbegin", `<div class="cell" draggable="false"></div>`);
    }


}