let optionsCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let pencilToolCont = document.querySelector(".pencil-tool");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".pen");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");

let pencilFlag = false;
let eraserFlag = false;
let optionFlag = true;
optionsCont.addEventListener("click", (e) => {
  optionFlag = !optionFlag;
  if (optionFlag) {
    openTools();
  } else {
    closeTools();
  }
});
function openTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-times");
  iconElem.classList.add("fa-bars");
  toolsCont.style.display = "flex";
}
function closeTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-times");
  toolsCont.style.display = "none";
  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}

pencil.addEventListener("click", (e) => {
  pencilFlag = !pencilFlag;
  if (pencilFlag) {
    pencilToolCont.style.display = "block";
  } else {
    pencilToolCont.style.display = "none";
  }
});
eraser.addEventListener("click", (e) => {
  eraserFlag = !eraserFlag;
  if (eraserFlag) {
    eraserToolCont.style.display = "flex";
  } else {
    eraserToolCont.style.display = "none";
  }
});

upload.addEventListener("click", () => {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);
    let stickyContainer = document.createElement("div");
    stickyContainer.setAttribute("class", "sticky-cont");
    stickyContainer.innerHTML = `
  <div class="header-cont">
  <div class="minimize"><i class="fas fa-window-minimize"></i></div>
  <div class="remove"><i class="fas fa-times-circle"></i></div>
</div>
<div class="note-cont">
   <img class="imgc" src="${url}"/>
</div>
  `;
    document.body.appendChild(stickyContainer);
    let minimize = stickyContainer.querySelector(".minimize");
    let remove = stickyContainer.querySelector(".remove");
    noteActions(minimize, remove, stickyContainer);
    stickyContainer.onmousedown = function (event) {
      dragAndDrop(stickyContainer, event);
    };

    stickyContainer.ondragstart = function () {
      return false;
    };
  });
});

sticky.addEventListener("click", (e) => {
  let stickyContainer = document.createElement("div");
  stickyContainer.setAttribute("class", "sticky-cont");
  stickyContainer.innerHTML = `
  <div class="header-cont">
  <div class="minimize"><i class="fas fa-window-minimize"></i></div>
  <div class="remove"><i class="fas fa-times-circle"></i></div>
</div>
<div class="note-cont">
    <textarea ></textarea>
</div>
  `;
  document.body.appendChild(stickyContainer);
  let minimize = stickyContainer.querySelector(".minimize");
  let remove = stickyContainer.querySelector(".remove");
  noteActions(minimize, remove, stickyContainer);
  stickyContainer.onmousedown = function (event) {
    dragAndDrop(stickyContainer, event);
  };

  stickyContainer.ondragstart = function () {
    return false;
  };
});
function noteActions(minimize, remove, stickyContainer) {
  remove.addEventListener("click", (e) => {
    stickyContainer.remove();
  });
  minimize.addEventListener("click", (e) => {
    let noteCont = stickyContainer.querySelector(".note-cont");
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if (display === "none") noteCont.style.display = "block";
    else noteCont.style.display = "none";
  });
}
function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}
