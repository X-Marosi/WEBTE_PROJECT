let cells;
let dragOrigin;
let rowSize = 3;
let circle;
let target;
let currentmap=0; // for json
let section = document.getElementsByTagName("section")[0];
let div1;
let rowchecker=0;
//.

/*document.getElementById("section").insertAdjacentHTML("afterbegin",
        `<div class="char cell" id="1">  </div>
            <div class="b-square cell" draggable="true" id="2"><img src="images/box.jpg" alt="" class="image"></div>
            <div class="cell" id="3"></div>
            <div class="r-square cell" id="5"></div>
            <div class="r-square cell dropped" id="6"></div>
            <div class="cell" draggable="true" id="7"></div>
            <div class="cell" id="9"></div>
            <div class="b-square cell" draggable="true" id="10"><img src="images/box.jpg" alt="" class="image"></div>
            <div class="flag cell" id="11"></div> `);*/
fetch("./data.json")
    .then(res => res.json())
    .then((data) =>{
        loadmap();
        function loadmap(){
            rowchecker=0;
            section.innerHTML=""
            for (let x=0;x<data[currentmap].height;x++){
                for (let y=1;y<data[currentmap].width+1;y++){
                    div1=document.createElement("div");
                    div1.setAttribute("id",y+(x*data[currentmap].height)+rowchecker);
                    if (x==0 && y==1){
                        div1.classList.add("char");
                        div1.classList.add("cell");
                    }
                    else if (data[currentmap].boxes.includes(y+(x*data[currentmap].height))){
                        div1.classList.add("b-square");
                        div1.classList.add("cell");
                        let image= document.createElement("img");
                        div1.setAttribute("draggable","true");
                        image.setAttribute("src","images/box.jpg");
                        image.setAttribute("alt","");
                        image.setAttribute("class","image")
                        image.setAttribute("class","image")
                        div1.appendChild(image);
                    }
                    else if ( data[currentmap].walls.includes(y+(x*data[currentmap].height))){
                        div1.classList.add("r-square");
                        div1.classList.add("cell");
                    }
                    else if( y==data[currentmap].width && x==data[currentmap].height-1){
                        div1.classList.add("flag");
                        div1.classList.add("cell");
                    }
                    else{
                        div1.setAttribute("class","cell");
                    }
                    section.appendChild(div1);
                }
                rowchecker++;

            }
            cells = document.querySelectorAll(".cell");
            cells.forEach(elem => {
                elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
                elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
                elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
                elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
                elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
            });

        }
        document.addEventListener("keydown", function(event) {

            if (event.keyCode === 87) {
                moveUp();
            }// if A is pressed
            else if (event.keyCode === 65) {
                moveLeft();
            }
            // if s is pressed
            else if (event.keyCode === 83) {
                moveDown();
            }
            // if d is pressed
            else if (event.keyCode === 68) {
                moveRight();
            }

            if (target && target.classList.contains("flag")){
                currentmap++;
                loadmap();
                console.log("EZ ");
                target.classList.remove("flag");
            }

        });
    });



//add event listener for W




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
    console.log("here");
    if (dragOrigin.classList.contains("b-square")) {
        if (targetId === originId + 1 || targetId === originId - 1 ||targetId === originId + rowSize + 1 || targetId === originId - rowSize - 1) {
            if(!event.target.classList.contains("char") && !event.target.classList.contains("b-square") && !event.target.classList.contains("r-square")) {
                event.target.classList.add("b-square");
                event.target.setAttribute("draggable", "true");
                event.target.appendChild(dragOrigin.querySelector("img"));
                dragOrigin.classList.remove("b-square");
                dragOrigin.setAttribute("draggable", "false");
            }
        }
    }
}
function moveRight(){
    circle= document.getElementsByClassName("char");
    target= document.getElementById(parseInt(circle[0].id)+1);
    if(target){
        if(!target.classList.contains("b-square") && !target.classList.contains("r-square")) {
            circle[0].classList.remove("char");
            target.classList.add("char");
        }
    }
}
function moveLeft(){
    circle= document.getElementsByClassName("char");
    target = document.getElementById(parseInt(circle[0].id)-1);
    if(target){
        if(!target.classList.contains("b-square") && !target.classList.contains("r-square")) {
            circle[0].classList.remove("char");
            target.classList.add("char");
        }
    }
}
function moveUp(){
    circle= document.getElementsByClassName("char");
    target = document.getElementById(parseInt(circle[0].id)-rowSize-1);
    if(target){
        if(!target.classList.contains("b-square") && !target.classList.contains("r-square")) {
            circle[0].classList.remove("char");
            target.classList.add("char");
        }
    }
}

function moveDown(){
    circle= document.getElementsByClassName("char");
    target = document.getElementById(parseInt(circle[0].id)+rowSize+1);
    if(target){
        if(!target.classList.contains("b-square") && !target.classList.contains("r-square")) {
            circle[0].classList.remove("char");
            target.classList.add("char");
        }
    }
}
