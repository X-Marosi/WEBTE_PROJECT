
let cells;
let dragOrigin;
let rowSize;
let circle;
let target;
let target2;
let currentMap = 0;
let section = document.getElementsByTagName("section")[0];
let div1;
let rowChecker=0;
let b;
let levelReady;

fetch("./data.json")
    .then(res => res.json())
    .then((data) =>{
        b = document.createElement('button');
        b.innerHTML="Start";
        b.id="button"
        b.onclick = function() { loadMap(); }
        document.body.appendChild(b)


        function loadMap(){
            levelReady=0;
            b=document.getElementById("button")
            b.style.visibility="hidden";
            section.visibility="visible";
            rowSize = data[currentMap].width;
            rowChecker = 0;
            section.innerHTML=""
            section.classList.add("grid-"+rowSize);

            for (let x=0;x<data[currentMap].height;x++){
                for (let y=1;y<data[currentMap].width+1;y++){
                    div1=document.createElement("div");
                    div1.setAttribute("id",y+(x*data[currentMap].height)+rowChecker);
                    if (data[currentMap].char === y+(x*data[currentMap].height)+rowChecker){
                        div1.classList.add("char", "cell");
                        let image= document.createElement("img");
                        image.setAttribute("src","images/char.png");
                        image.setAttribute("alt","");
                        image.setAttribute("class","image");
                        image.setAttribute("class","image");
                        div1.addEventListener('touchstart', touchStart);
                        div1.addEventListener('touchend', touchEnd );
                        div1.appendChild(image);
                    }
                    else if (data[currentMap].boxes.includes(y+(x*data[currentMap].height))){
                        div1.classList.add("b-square");
                        div1.classList.add("cell");
                        let image= document.createElement("img");
                        div1.setAttribute("draggable","true");
                        image.setAttribute("src","images/box.png");
                        image.setAttribute("alt","");
                        image.setAttribute("class","image");
                        image.setAttribute("class","image");
                        div1.addEventListener('touchstart', touchStart)
                        div1.addEventListener('touchend', touchEnd )
                        div1.appendChild(image);
                    }
                    else if ( data[currentMap].walls.includes(y+(x*data[currentMap].height))){
                        div1.classList.add("r-square");
                        div1.classList.add("cell");
                        let image= document.createElement("img");
                        image.setAttribute("src","images/wall.png");
                        image.setAttribute("alt","");
                        image.setAttribute("class","image")
                        image.setAttribute("class","image")
                        div1.appendChild(image);
                    }
                    else{
                        div1.setAttribute("class","cell");
                    }
                    section.appendChild(div1);

                    if( data[currentMap].goal === y+(x*data[currentMap].height)+rowChecker){

                        div1.classList.add("flag");
                        div1.classList.add("cell");
                    }
                }
                rowChecker++;

            }
            var shakeEvent = new Shake({threshold: 10});
            shakeEvent.start();
            window.addEventListener('shake', function(){
                loadMap();
            }, false);
            if(!("ondevicemotion" in window)){alert("Not Supported");}
            function touchEnd(event){
                    var changedTouch = event.changedTouches[0];
                    var elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
                    let targetId = parseInt(elem.id);
                    let originId = parseInt(dragOrigin.id);

                    if (dragOrigin.classList.contains("b-square")) {
                        if (targetId === originId + 1 || targetId === originId - 1 ||targetId === originId + rowSize + 1 || targetId === originId - rowSize - 1) {
                            if(!elem.classList.contains("char") && !elem.classList.contains("b-square") && !elem.classList.contains("r-square")) {
                                elem.classList.add("b-square");
                                elem.setAttribute("draggable", "true");
                                elem.appendChild(dragOrigin.querySelector("img"));
                                elem.addEventListener('touchstart', touchStart);
                                elem.addEventListener('touchend', touchEnd );
                                dragOrigin.classList.remove("b-square");
                                dragOrigin.setAttribute("draggable", "false");
                            }

                        }
                    }
                else if (dragOrigin.classList.contains("char")) {
                    if (targetId === originId + 1 || targetId === originId - 1 ||targetId === originId + rowSize + 1 || targetId === originId - rowSize - 1) {
                        if(!elem.classList.contains("char") && !elem.classList.contains("b-square") && !elem.classList.contains("r-square")) {
                            elem.classList.add("char");
                            elem.appendChild(dragOrigin.querySelector("img"));
                            elem.addEventListener('touchstart', touchStart);
                            elem.addEventListener('touchend', touchEnd );
                            dragOrigin.classList.remove("char");
                            dragOrigin.setAttribute("draggable", "false");
                        }

                    }
                        if (elem && elem.classList.contains("flag") && !elem.classList.contains("b-square") && levelReady === 0){
                            console.log("here");
                            levelReady=1;
                            b.style.visibility="visible";
                            b.innerHTML="Next Level";
                            currentMap++;
                            console.log("EZ ");
                            /* allDragboxes= document.getElementsByClassName("b-square");
                             forLong=allDragboxes.length;
                             for (let i = 0; i < forLong; i++) {
                                 boxTarget= document.getElementById(allDragboxes[0].id);
                                 boxTarget.setAttribute("class","dropped");
                             }*/
                        }
                }
                }
            function touchStart(event){
                if (levelReady==0){
                    dragOrigin = event.target;}
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
        function dragStart(event) {
            if (levelReady === 0){
                dragOrigin = event.target;}

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
                        event.target.addEventListener('touchstart', touchStart);
                        event.target.addEventListener('touchend', touchEnd );
                        dragOrigin.setAttribute("draggable", "false");
                    }

                }
            }
        }

        document.addEventListener("keydown", function(event) {

            if (event.keyCode === 87 && levelReady === 0) {
                moveUp();
            }// if A is pressed
            else if (event.keyCode === 65 && levelReady === 0) {
                moveLeft();
            }
            // if s is pressed
            else if (event.keyCode === 83 && levelReady === 0) {
                moveDown();
            }
            // if d is pressed
            else if (event.keyCode === 68 && levelReady === 0) {
                moveRight();
            }

            if (target && target.classList.contains("flag") && !target.classList.contains("b-square") && levelReady === 0){
                levelReady=1;
                b.style.visibility="visible";
                b.innerHTML="Next Level";
                currentMap++;
                console.log("EZ ");
               /* allDragboxes= document.getElementsByClassName("b-square");
                forLong=allDragboxes.length;
                for (let i = 0; i < forLong; i++) {
                    boxTarget= document.getElementById(allDragboxes[0].id);
                    boxTarget.setAttribute("class","dropped");
                }*/
            }

        });
    });


// Drag and Drop Functions

//Events fired on the drag target



function moveRight(){
    circle= document.getElementsByClassName("char");
    target= document.getElementById(parseInt(circle[0].id)+1);
    target2= document.getElementById(circle[0].id);
    if(target){
        if(!target.classList.contains("b-square") && !target.classList.contains("r-square")) {
            classChanger();
        }
    }
}

function moveLeft(){
    circle= document.getElementsByClassName("char");
    target = document.getElementById(parseInt(circle[0].id)-1);
    target2= document.getElementById(circle[0].id);
    if(target){
        if(!target.classList.contains("b-square") && !target.classList.contains("r-square")) {
            classChanger();
        }
    }
}

function moveUp(){
    circle= document.getElementsByClassName("char");
    target = document.getElementById(parseInt(circle[0].id)-rowSize-1);
    target2= document.getElementById(circle[0].id);
    if(target){
        if(!target.classList.contains("b-square") && !target.classList.contains("r-square")) {
            classChanger();
        }
    }
}

function moveDown(){
    circle= document.getElementsByClassName("char");
    target = document.getElementById(parseInt(circle[0].id)+rowSize+1);
    target2= document.getElementById(circle[0].id);
    if(target){
        if(!target.classList.contains("b-square") && !target.classList.contains("r-square")) {
            classChanger();
        }
    }
}
function classChanger(){
    let image= document.createElement("img");
    circle[0].classList.remove("char");
    target2.removeChild(target2.childNodes[0]);
    image.setAttribute("src","images/char.png");
    image.setAttribute("alt","");
    image.setAttribute("class","image")
    image.setAttribute("class","image")
    target.classList.add("char");
    target.appendChild(image)
}
