const cells = document.querySelectorAll(".cell");
let dragOrigin;
let rowSize = 3;

cells.forEach(elem => {
    elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
    elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
    elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
    elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
    elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
});
//add event listener for W
document.addEventListener("keydown", function(event) {

    if (event.keyCode === 87) {
        moveUp();
    }// if a is pressed
    else if (event.keyCode === 65) {

    }
    // if s is pressed
    else if (event.keyCode === 83) {

    }
    // if d is pressed
    else if (event.keyCode === 68) {

    }


    });



// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
    //event.dataTransfer.setData("text", event.target.id);
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
    //event.preventDefault(); // This is in order to prevent the browser default handling of the data
    //const draggableElementData = event.dataTransfer.getData("text"); // Get the dragged data. This method will return any data that was set to the same type in the setData() method
    //const droppableElementData = event.target.getAttribute("data-draggable-id");



    let targetId = parseInt(event.target.id);
    let originId = parseInt(dragOrigin.id);

    if (dragOrigin.classList.contains("b-square")) {
        if (targetId === originId + 1 || targetId === originId - 1 ||targetId === originId + rowSize + 1 || targetId === originId - rowSize - 1) {
            event.target.classList.add("b-square");
            event.target.setAttribute("draggable", "true");
            event.target.appendChild(dragOrigin.querySelector("img"));
            dragOrigin.classList.remove("b-square");
            dragOrigin.setAttribute("draggable", "false");

        }
    }
}
function moveUp(){
    let circle= document.getElementsByClassName("char");
    console.log(circle.id) ;


}